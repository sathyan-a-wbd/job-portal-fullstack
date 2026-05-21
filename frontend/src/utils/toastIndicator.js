import { toast } from "react-hot-toast";

export const showError = (err) => {
  const message =
    typeof err === "string" ? err : (
      err?.response?.data?.message || err?.message || "Something went wrong"
    );

  toast.error(message);
};

export const showSuccess = (data) => {
  const message = typeof data === "string" ? data : data?.message || "Success";

  toast.success(message);
};
