const Applications = require("../models/Applications");
const Application = require("../models/Applications");
const Job = require("../models/jobModel");
const { User, Jobseeker, Employer } = require("../models/userModel");

// POST /api/jobs/:jobId/apply
const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applicantId = req.userId;

    // Only job seekers can apply
    if (req.userRole === "employer") {
      return res
        .status(403)
        .json({ message: "Employers cannot apply to jobs" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: applicantId,
    });
    if (alreadyApplied) {
      return res.status(400).json({
        appliedStatus: "true",
        message: "You already applied to this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: applicantId,
    });
    console.log(application);
    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/applications/my
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.userId })
      .populate("job", "title companyName location salary resume")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.userId;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (!job.createdBy || job.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view applicants",
      });
    }

    const applications = await Application.find({ job: jobId }).populate(
      "applicant",
      "fname mail",
    );

    const validApplications = applications.filter((app) => app.applicant);

    const userIds = validApplications.map((app) => app.applicant._id);

    const jobseekers = await Jobseeker.find({
      userId: { $in: userIds },
    });

    const merged = validApplications.map((app) => {
      const js = jobseekers.find(
        (j) => j.userId.toString() === app.applicant._id.toString(),
      );

      return {
        ...app.toObject(),
        applicant: {
          ...app.applicant.toObject(),
          location: js?.location || "",
          experience:
            !js || js.experience.length === 0 ? "Fresher" : "Experienced",
        },
      };
    });

    res.status(200).json({
      success: true,
      count: merged.length,
      merged,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//get /api/applicants/:userId

const getEachApp = async (req, res) => {
  try {
    if (req.userRole !== "employer") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { userId } = req.params;
    const user = await User.findOne({ _id: userId })
      .select("fname mail mobile -_id")
      .lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const fulldetails = await Jobseeker.findOne({ userId })
      .select("availabilty educations experience location resume skills")
      .lean();
    const profile = {
      ...user,
      ...(fulldetails || {}),
    };
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
  }
};

// PATCH /api/applications/:id/status  → employer updates status
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Only employers allowed
    if (req.userRole !== "employer") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const validStatuses = ["pending", "reviewed", "shortlisted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Status updated", application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  applyToJob,
  getMyApplications,
  getApplicants,
  getEachApp,
  updateApplicationStatus,
};
