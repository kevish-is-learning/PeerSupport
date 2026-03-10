import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const uploadApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

uploadApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Upload failed";

    if (error.response?.status === 401) {
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    if (error.response?.status !== 401) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

/**
 * Upload avatar/profile picture
 */
export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await uploadApi.post("/users/avatar", formData);
  return response.data;
};

/**
 * Delete avatar/profile picture
 */
export const deleteAvatar = async () => {
  const response = await uploadApi.delete("/users/avatar");
  return response.data;
};

/**
 * Upload resume (for mentor)
 */
export const uploadMentorResume = async (file: File, name: string) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("name", name);

  const response = await uploadApi.post("/mentor/resumes/upload", formData);
  return response.data;
};

/**
 * Upload resume (for mentee)
 */
export const uploadMenteeResume = async (file: File, name: string) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("name", name);

  const response = await uploadApi.post("/mentee/resumes/upload", formData);
  return response.data;
};

/**
 * Get mentor resumes
 */
export const getMentorResumes = async () => {
  const response = await axios.get(`${API_BASE_URL}/mentor/resumes`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Get mentee resumes
 */
export const getMenteeResumes = async () => {
  const response = await axios.get(`${API_BASE_URL}/mentee/resumes`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Delete mentor resume
 */
export const deleteMentorResume = async (resumeId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/mentor/resumes/${resumeId}`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Delete mentee resume
 */
export const deleteMenteeResume = async (resumeId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/mentee/resumes/${resumeId}`, {
    withCredentials: true,
  });
  return response.data;
};

export default uploadApi;
