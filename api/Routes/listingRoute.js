import express from "express";
import { createListing } from "../Controllers/listingController.js";
// import { validateToken } from "../Middleware/validateToken.js";
import { validateToken } from "../Middleware/validateToken.js";
const Router = express.Router();

Router.post("/create", validateToken, createListing);

export default Router;
