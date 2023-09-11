import User from "../models/Users.js";
import Event from "../models/Event.js";
import NomE from "../models/NomE.js";
import Nomination from "../models/Nomination.js";
import OrderChild from "../models/OrderChild.js";
import OrderAdult from "../models/OrderAdult.js";
("../models/OrderChild");
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

const createChildOrder = async (req, res) => {
  // console.log(req.files["file"][0].path);
  // console.log(req.files["file2"][0].path);
  const {
    eventId,
    name,
    tarif,
    name2,
    name3,
    part,
    curatorsAmount,
    cur,
    age,
    subject,
    punct,
    graduate,
    nomPul,
    language,
    language2,
    link,
    email,
    phone,
    extra1,
    extra2,
    extra3,
    number,
  } = req.body;
  if (!eventId || !name) {
    throw new BadRequestError("Введите все значения");
  }
  let orderChild;
  try {
    orderChild = await OrderChild.create({
      eventId: eventId,
      name: name,
      tarif: tarif,
      name2: name2,
      name3: name3,
      part: part,
      curatorsAmount: curatorsAmount,
      cur: cur,
      age: age,
      subject: subject,
      punct: punct,
      graduate: graduate,
      nomPul: nomPul,
      language: language,
      language2: language2,
      link: link,
      email: email,
      phone: phone,
      extra1: extra1,
      extra2: extra2,
      extra3: extra3,
      number: number,
      // file: req.files["file"][0].path,
      file:
        req.files && req.files["file"] && req.files["file"][0]
          ? req.files["file"][0].path
          : null,
      file2:
        req.files && req.files["file2"] && req.files["file2"][0]
          ? req.files["file2"][0].path
          : null,
    });
  } catch (error) {
    throw new BadRequestError("Error 500!");
  }
  res.status(StatusCodes.CREATED).json(orderChild);
};

const createAdultOrder = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const {
    number,
    eventId,
    name,
    tarif,
    name2,
    name3,
    part,
    curatorsAmount,
    cur,
    age,
    subject,
    subject2,
    subject3,
    punct,
    punct2,
    punct3,
    job,
    job2,
    job3,
    job_title,
    job_title2,
    job_title3,
    internship,
    internship2,
    internship3,
    graduate,
    nomPul,
    language,
    language2,
    link,
    email,
    phone,
    extra1,
    extra2,
    extra3,
  } = req.body;
  if (!eventId || !name) {
    throw new BadRequestError("Введите все значения");
  }
  let orderAdult;
  try {
    orderAdult = await OrderAdult.create({
      number: number,
      eventId: eventId,
      name: name,
      tarif: tarif,
      name2: name2,
      name3: name3,
      part: part,
      curatorsAmount: curatorsAmount,
      cur: cur,
      age: age,
      subject: subject,
      subject2: subject2,
      subject3: subject3,
      punct: punct,
      punct2: punct2,
      punct3: punct3,
      job: job,
      job2: job2,
      job3: job3,
      job_title: job_title,
      job_title2: job_title2,
      job_title3: job_title3,
      internship: internship,
      internship2: internship2,
      internship3: internship3,
      graduate: graduate,
      nomPul: nomPul,
      language: language,
      language2: language2,
      link: link,
      email: email,
      phone: phone,
      extra1: extra1,
      extra2: extra2,
      extra3: extra3,

      // file: req.files["file"][0].path,
      file:
        req.files && req.files["file"] && req.files["file"][0]
          ? req.files["file"][0].path
          : null,
      file2:
        req.files && req.files["file2"] && req.files["file2"][0]
          ? req.files["file2"][0].path
          : null,
    });
  } catch (error) {
    throw new BadRequestError("Error 500!");
  }
  res.status(StatusCodes.CREATED).json(orderAdult);
};

export { editUser, getEvent, changePass, createChildOrder, createAdultOrder };
