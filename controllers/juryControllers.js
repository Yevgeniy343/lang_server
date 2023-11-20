import Jury from "../models/Jury.js";
import OrderChild from "../models/OrderChild.js";
import OrderAdult from "../models/OrderAdult.js";
import Event from "../models/Event.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-errors.js";
import nodemailer from "nodemailer";
import { generate } from "random-words";
import { nanoid } from "nanoid";
import _ from "lodash";

const changePass = async (req, res) => {
  const { id, pass, pass1, pass2 } = req.body;
  console.log(req.body);
  let jury;
  try {
    jury = await Jury.findById(id);
  } catch (error) {
    throw new BadRequestError("Ошибка 500!");
  }

  if (pass1 !== pass2) {
    throw new BadRequestError("Введенные пароли не совпадают !");
  }

  const isPasswordCorrect = await jury.comparePassword(pass);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Текущий пароль указан не верно !");
  }

  jury.password = pass1;
  await jury.save();

  jury = await Jury.findById(id);
  const token = jury.createJWT();
  res.status(StatusCodes.OK).json({ jury, token });
};

const getOrders = async (req, res) => {
  const today = new Date();
  console.log(today);

  const oneDayAgo = new Date(today);
  oneDayAgo.setDate(today.getDate() - 1);
  console.log(oneDayAgo);

  try {
    let childOrders = await OrderChild.find({
      createdAt: { $lt: oneDayAgo },
      status: "ok",
    });
    let adultOrders = await OrderAdult.find({
      createdAt: { $lt: oneDayAgo },
      status: "ok",
    });
    res.status(StatusCodes.CREATED).json({ childOrders, adultOrders });
  } catch (error) {
    throw new BadRequestError("Ошибка 500!");
  }
};

const editProfile = async (req, res) => {
  const { name, email, lang, phone, nomins, id } = req.body;
  let jury = await Jury.findById(id);
  jury.name = name;
  jury.email = email;
  jury.phone = phone;
  jury.nomins = nomins;
  if (lang) {
    jury.lang = lang;
  }
  await jury.save();
  console.log(jury);
  res.status(StatusCodes.CREATED).json(jury);
};

const check = async (req, res) => {
  console.log(req.body);
  let order;
  order = await OrderChild.findById(req.body.orderId);
  if (!order) {
    order = await OrderAdult.findById(req.body.orderId);
  }
  order.jury = order.jury || [];

  const include = _.includes(_.map(order.jury, "juryId"), req.body.juryId);
  console.log(include);
  if (include) {
    throw new BadRequestError("Работа уже проверена !");
  } else {
    order.jury.push(req.body);
    await order.save();
    let childOrders = await OrderChild.find({});
    let adultOrders = await OrderAdult.find({});
    res.status(StatusCodes.CREATED).json({ childOrders, adultOrders });
  }
};
const getEvents = async (req, res) => {
  const events = await Event.find({});
  // const noms = await NomE.find({});
  // const nominations = await Nomination.find({});
  res.status(StatusCodes.OK).json(events);
};

export { changePass, getOrders, editProfile, check, getEvents };
