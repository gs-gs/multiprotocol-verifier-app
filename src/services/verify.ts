import axios from "../utils/axios";

export const verifyFile = (file: File) => {
  const formData = new FormData();

  formData.append("certificate", file, file.name);
  return axios
    .post("/verify/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
    .catch((res) => {
      console.log("**", res);
      throw new Error(res.message);
    });
};
