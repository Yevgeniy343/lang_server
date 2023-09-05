import User from "../models/Users.js";
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
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    throw new BadRequestError("Email уже используется");
  }
  const user = await User.create({
    name,
    email,
    password,
    referal,
    from_ref: ref,
  });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      _id: user._id,
      referal: user.referal,
      from_ref: user.from_ref,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Введите все значения");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError("Не корректные данные");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Не корректные данные");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
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
  let user;
  user = await User.findOne({ email: remind_email });
  if (!user) {
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

  user.password = new_pass;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Сгенерированный пароль отправлен на указанный Email" });
};

export { signup, login, remind };

// fjbgswbugzieiaho
