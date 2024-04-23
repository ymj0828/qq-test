import { instance } from "@/lib/axios";

export const getRecipientsList = async () => {
  const res = await instance.get("recipients/");
  return res.data;
};

export const postRecipientsList = async (value) => {
  const res = await instance.post("recipients/", value);
  return res.data;
};

export const postRecipientsImageUrl = async (formData) => {
  const res = await instance.post(
    "https://api.imgbb.com/1/upload?key=76c9edc5314add556ab072dbb9120f8b",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return res.data;
};
