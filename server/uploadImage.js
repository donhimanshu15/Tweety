import { v2 as cloudinary } from "cloudinary";

// const cloud_name = "dm4qmq5de" || process.env.CLOUD_NAME;
// const api_key = "648821142879562" || process.env.API_KEY;
// const api_secret = "NQz5LiPn-H4ibSuOnRzSGz8jth4" || process.env.API_SECRET;

// cloudinary.config({
//   cloud_name,
//   api_key,
//   api_secret,
// });

// const opts = {
//   overwrite: true,
//   invalidate: true,
//   resource_type: "auto",
// };

const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        resolve(result.secure_url);
      } else {
        console.log(error.message);
        reject({ message: error.message });
      }
    });
  });
};

export default async (image) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  console.log(process.env.API_SECRET, process.env.API_KEY);
  try {
    const result = await cloudinary.uploader.upload(image);
    return result;
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};

export const uploadMultipleImages = (images) => {
  return new Promise((resolve, reject) => {
    const uploads = images.map((base) => uploadImage(base));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};
