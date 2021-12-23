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
      throw new Error(res.message);
    });
};

export const verifyQRCode = (qrCode: string) => {
  return axios
    .post("/verify", { qrCode })
    .then((res) => res.data)
    .catch((res) => {
      throw new Error(res.message);
    });
};
