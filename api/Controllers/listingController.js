import asyncHandler from "express-async-handler";
import { listingModel } from "../Models/listingModel.js";
export const createListing = async (req, res, next) => {
  try {
    if (!req.user) {
      res.json({
        succeess: false,
        message: "User is not authorized",
      });
    }
    console.log(req.body);
    const listing = await listingModel.create({
      ...req.body,
      userRef: req.user.id,
    });
    res.status(201).json(listing);
  } catch (error) {
    console.log(error.message);
    res.json({
      succeess: false,
      message: error.message,
    });
  }
};
