import Jury from "../models/Jury.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-errors.js";
import nodemailer from "nodemailer";
import { generate } from "random-words";
import { nanoid } from "nanoid";

const signup = async (req, res) => {
  const { name, email, password, ref } = req.body;
  const referal = nanoid();
  console.log(referal);
  if (!name || !email || !password) {
    throw new BadRequestError("Введите все значения");
  }
  const userAlreadyExist = await Jury.findOne({ email });
  if (userAlreadyExist) {
    throw new BadRequestError("Email уже используется");
  }
  const jury = await Jury.create({
    name,
    email,
    password,
    referal,
    from_ref: ref,
  });
  const tokenJ = jury.createJWT();
  res.status(StatusCodes.CREATED).json({
    jury: {
      email: jury.email,
      name: jury.name,
      _id: jury._id,
      referal: jury.referal,
      from_ref: jury.from_ref,
    },
    tokenJ,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Введите все значения");
  }
  const jury = await Jury.findOne({ email });
  if (!jury) {
    throw new UnAuthenticatedError("Не корректные данные");
  }
  const isPasswordCorrect = await jury.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Не корректные данные");
  }
  const tokenJ = jury.createJWT();
  res.status(StatusCodes.OK).json({ jury, tokenJ });
};

const remind = async (req, res) => {
  const { remind_email } = req.body;
  console.log(remind_email);
  if (!remind_email) {
    throw new BadRequestError("Укажите Email");
  }
  const word = generate({ minLength: 4, maxLength: 6 });
  const number = Math.floor(Math.random() * 8999 + 1000);
  const new_pass = word + number;
  console.log(word);
  console.log(number);
  console.log(new_pass);
  let jury;
  jury = await Jury.findOne({ email: remind_email });
  if (!jury) {
    throw new UnAuthenticatedError(
      "Мы не нашли Вас в зарегистрированных пользователях. Проверьте правильность указанной почты "
    );
  }
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kronujin@gmail.com",
        pass: process.env.APP,
      },
    });

    var mailOptions = {
      from: "kronujin@gmail.com",
      to: `${remind_email}`,
      subject: "Новый пароль",
      text: "",
      html: `<h1 style="color:#a6a28e">${new_pass}</h1>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(StatusCodes.OK).json(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(StatusCodes.OK).json("Email sent: " + info.response);
      }
    });
  } catch (error) {
    throw new BadRequestError("Error 500 !");
  }

  jury.password = new_pass;
  await jury.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Сгенерированный пароль отправлен на указанный Email" });
};

export { signup, login, remind };
