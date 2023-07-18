import User from "../models/Users.js";
import Event from "../models/Event.js";
import { StatusCodes } from "http-status-codes";

import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-errors.js";

const editUser = async (req, res) => {
  const { name, email, phone, second_name, date, city, id } = req.body;
  const user = await User.findById(id);
  user.name = name;
  user.email = email;
  user.phone = phone;
  user.second_name = second_name;
  user.date = date;
  user.city = city;
  await user.save();
};

const getEvent = async (req, res) => {
  const event = await Event.find({});
  console.log(event);
  res.status(StatusCodes.OK).json({ event });
};

export { editUser, getEvent };
