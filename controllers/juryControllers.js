import Jury from "../models/Jury.js";
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

export { changePass };
