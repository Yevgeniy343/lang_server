import User from "../models/Users.js";
import Event from "../models/Event.js";
import NomE from "../models/NomE.js";
import Nomination from "../models/Nomination.js";
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
  const noms = await NomE.find({});
  const nominations = await Nomination.find({});
  res.status(StatusCodes.OK).json({ event, noms, nominations });
};

const changePass = async (req, res) => {
  const { id, pass, pass1, pass2 } = req.body;
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    throw new BadRequestError("Ошибка 500!");
  }

  if (pass1 !== pass2) {
    throw new BadRequestError("Введенные пароли не совпадают !");
  }

  const isPasswordCorrect = await user.comparePassword(pass);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Текущий пароль указан не верно !");
  }

  user.password = pass1;
  await user.save();

  user = await User.findById(id);
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

export { editUser, getEvent, changePass };
