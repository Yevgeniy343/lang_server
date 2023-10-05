import Jury from "../models/Jury.js";
import OrderChild from "../models/OrderChild.js";
import OrderAdult from "../models/OrderAdult.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-errors.js";
import nodemailer from "nodemailer";
import { generate } from "random-words";
import { nanoid } from "nanoid";

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
  console.log(req.params);
  try {
    let childOrders = await OrderChild.find({});
    let adultOrders = await OrderAdult.find({});
    res.status(StatusCodes.CREATED).json({ childOrders, adultOrders });
  } catch (error) {
    throw new BadRequestError("Ошибка 500!");
  }
};

export { changePass, getOrders };
