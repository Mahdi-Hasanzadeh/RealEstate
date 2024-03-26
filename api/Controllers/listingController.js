import asyncHandler from "express-async-handler";
import { listingModel } from "../Models/listingModel.js";
export const createListing = async (req, res, next) => {
  try {
    const listing = await listingModel.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};
