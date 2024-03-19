import express from "express";
import { signupUser } from "../Controllers/userController.js";
const Router = express.Router();

//@desc POST api/user/signup
// register a user

Router.post("/signup", signupUser);

export default Router;
