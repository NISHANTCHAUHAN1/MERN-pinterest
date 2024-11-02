import { Pin } from "../models/pinModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

// create pin
// export const createPin = TryCatch(async (req, res) => {
//   const { title, pin } = req.body;

//   const file = req.file;
//   const fileUrl = getDataUrl(file);

//   const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

//   await Pin.create({ 
//     title,
//     pin,
//     image: {
//       id: cloud.public_id,
//       url: cloud.secure_url,
//     },
//     owner: req.user._id,
//   });

//   res.json({message: "Pin Created"});
// });


// export const createPin = TryCatch(async (req, res) => {
//   const { title, pin } = req.body;

//   const file = req.file;
//   const fileUrl = getDataUrl(file);

//   // Specify the desired width and height in the upload options
//   const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
//     width: 300,
//     height: 290,
//     crop: "fill", // Crops the image to fit within the specified width and height
//   });

//   await Pin.create({
//     title,
//     pin,
//     image: {
//       id: cloud.public_id,
//       url: cloud.secure_url,
//     },
//     owner: req.user._id,
//   });

//   res.json({ message: "Pin Created" });
// });

export const createPin = TryCatch(async (req, res) => {
  const { title, pin } = req.body;

  const file = req.file;
  const fileUrl = getDataUrl(file);

  // Specify the desired width and let Cloudinary adjust the height proportionally
  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
    width: 300,       // Set the width to 500px (or any desired width for uniformity)
    crop: "scale",    // Scales the image while maintaining the aspect ratio
  });

  await Pin.create({
    title,
    pin,
    image: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
    owner: req.user._id,
  });

  res.json({ message: "Pin Created" });
});



// getallpin
export const getAllPins = TryCatch(async(req, res) => {
    const pins = await Pin.find().sort({ createdAt: -1});
    res.json(pins);
});

// get single pin
export const getSinglePin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id).populate("owner", "-password");
    res.json(pin);
});

// comment 
export const commentOnPin = TryCatch(async(req, res) => {
    const pin = await Pin.findById(req.params.id);
    if(!pin) return res.status(400).json({message: "No Pin with this id"})

    pin.comments.push({
        user: req.user._id,
        name: req.user.name,
        comment: req.body.comment,
    });

    await pin.save();
    res.json({message: "Comment Added"});
})

// delete commit
export const deleteComment = TryCatch(async(req, res) => {
  const pin = await Pin.findById(req.params.id);
  if(!pin) return res.status(400).json({message: "No Pin with this id"});

  if(!req.query.commentId) 
    return res.status(400).json({message: "Please give comment id"});

  const commentIndex = pin.comments.findIndex((item) => item._id.toString() === req.query.commentId.toString());

  if(commentIndex === -1) {
    return res.status(400).json({message: "Comment not found"});
  }

  const comment = pin.comments[commentIndex];
  if(comment.user.toString() === req.user._id.toString()) {
    pin.comments.splice(commentIndex, 1);

    await pin.save();
    res.json({message: "Comment Deleted"});
  }
  else{
    return res.status(403).json({message: "You are not owner of this comment"});
  }
})

//  deltepin
export const deletePin = TryCatch(async(req,res) => {
  const pin = await Pin.findById(req.params.id);
  if(!pin) return res.status(400).json({message: "No Pin with this id"})

    if(pin.owner.toString() !== req.user._id.toString()) 
      return res.status(403).json({message: "Unauthorized"});

    await cloudinary.v2.uploader.destroy(pin.image.id);

    await pin.deleteOne();
    res.json({message: "Pin Delete Successfully"})
})

// updatepin
export const updatePin = TryCatch(async(req,res) => {
  const pin = await Pin.findById(req.params.id);
  if(!pin) return res.status(400).json({message: "No Pin with this id"});

  if(pin.owner.toString() !== req.user._id.toString()) 
    return res.status(403).json({message: "Unauthorized"});

  pin.title = req.body.title;
  pin.pin = req.body.pin;

  await pin.save();
  res.json({message: "Pin Updated"});
})