const axios = require("axios");
const { User } = require("../models/userModel"); //  import user model
require("dotenv").config();

exports.generateSummary = async (req, res) => {
  try {
    const userId = req.userId; //  from authMiddleware

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    //Check today's date
    const today = new Date().toDateString();

    //Reset count if new day
    if (
      !user.lastSummaryDate ||
      user.lastSummaryDate.toDateString() !== today
    ) {
      user.aiSummaryCount = 0;
    }
    // Limit check (5 per day)
    if (user.aiSummaryCount >= 5) {
      return res.status(403).json({
        message: "Daily limit reached (5 summaries per day)",
      });
    }

    const { skills, experience, education } = req.body;

    const prompt = `
Write ONE professional resume summary.

Rules:
- Only 3 to 4 lines
- letters limit: 500
- No multiple options
- No explanations
- No headings
- No bullet points
- No extra text
- ATS friendly and strong

Details:

Skills: ${skills || "No skills"}
Experience: ${experience || "No experience"}
Education: ${education || "No education"}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-120b:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
    let summary =
      response?.data?.choices?.[0]?.message?.content?.trim() ||
      "Failed to generate summary";
    summary = summary.split("\n\n")[0];
    //  Update usage
    user.aiSummaryCount += 1;
    user.lastSummaryDate = new Date();
    await user.save();

    res.status(200).json({
      summary,
      remaining: 5 - user.aiSummaryCount,
    });
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate summary" });
  }
};
