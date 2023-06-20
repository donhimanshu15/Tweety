import { handleError } from "../error.js";
import User from "../models/User.js";
import uploadImage from "../uploadImage.js";

export const uploadSingleImage = async (req, res, next) => {
  try {
    const result = await uploadImage(req.body.image);
    console.log(result.url, req.body);
    if (result) {
      const image = await User.findOneAndUpdate(
        { _id: req.body.id },
        {
          profileProfile: result.url,
        }
      );
      console.log(image);
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const uploadMutiImage = (req, res, next) => {
  uploadImage
    .uploadMultipleImages(req.body.images)
    .then((urls) => res.send(urls))
    .catch((err) => res.status(500).send(err));
};
