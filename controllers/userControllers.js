import User from "../models/Users.js";
import Event from "../models/Event.js";
import { StatusCodes } from "http-status-codes";

import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-errors.js";

const editUser = async (req, res) => {
  const { name, email, phone, second_name, date, city, job, job_title, id } =
    req.body;
  const user = await User.findById(id);
  user.name = name;
  user.email = email;
  user.phone = phone;
  user.second_name = second_name;
  user.date = date;
  user.city = city;
  user.job = job;
  user.job_title = job_title;
  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      _id: user._id,
      phone: user.phone,
      second_name: user.second_name,
      date: user.date,
      city: user.city,
      job: user.job,
      job_title: user.job_title,
    },
    token,
  });
};

const getEvent = async (req, res) => {
  const event = await Event.find({});
  console.log(event);
  res.status(StatusCodes.OK).json({ event });
};

export { editUser, getEvent };
