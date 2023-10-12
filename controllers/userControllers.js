import User from "../models/Users.js";
import Event from "../models/Event.js";
import NomE from "../models/NomE.js";
import Nomination from "../models/Nomination.js";
import OrderChild from "../models/OrderChild.js";
import OrderAdult from "../models/OrderAdult.js";
import { StatusCodes } from "http-status-codes";

import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-errors.js";
import nodemailer from "nodemailer";
import { generate } from "random-words";

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
    userId,
    eventName,
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
      userId: userId,

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

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kronujin@gmail.com",
        pass: process.env.APP,
      },
    });

    var mailOptions = {
      from: "kronujin@gmail.com",
      to: `${email}`,
      subject: "Информация по заявке",
      text: "",
      html: `<p style="color:#6b2351">Уважаемый ${name}! </p1>
      <p style="color:#6b2351">Благодарим за участие в ${eventName}</p> 
      <p style="color:#6b2351">Ваша работа находится на модерации.</p>
      <p style="color:#6b2351">Номер вашей заявки ${number} </p> 
      <p style="color:#6b2351">В течение 3-х дней Вы получите уведомление принята работа или нет. Только оно является гарантом того, что работа дошла до адресата. </p>
      <p style="color:#6b2351">Если уведомление не получено, повторите отправку заявки по прошествии трех дней. В противном случае Организатор не несет ответственность: работа в конкурсе не участвует,  а денежные средства за неё не возвращаются.</p> 
      <p style="color:#6b2351">С уважением, команда Фонда «Язык предков» </p> 
       `,
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
    throw new BadRequestError("Error 500!");
  }
  res.status(StatusCodes.CREATED).json(orderChild);
};

const createAdultOrder = async (req, res) => {
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
    userId,
    eventName,
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
      userId: userId,

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

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kronujin@gmail.com",
        pass: process.env.APP,
      },
    });

    var mailOptions = {
      from: "kronujin@gmail.com",
      to: `${email}`,
      subject: "Информация по заявке",
      text: "",
      html: `<p style="color:#6b2351">Уважаемый ${name}! </p1>
      <p style="color:#6b2351">Благодарим за участие в ${eventName}</p> 
      <p style="color:#6b2351">Ваша работа находится на модерации.</p>
      <p style="color:#6b2351">Номер вашей заявки ${number} </p> 
      <p style="color:#6b2351">В течение 3-х дней Вы получите уведомление принята работа или нет. Только оно является гарантом того, что работа дошла до адресата. </p>
      <p style="color:#6b2351">Если уведомление не получено, повторите отправку заявки по прошествии трех дней. В противном случае Организатор не несет ответственность: работа в конкурсе не участвует,  а денежные средства за неё не возвращаются.</p> 
      <p style="color:#6b2351">С уважением, команда Фонда «Язык предков» </p> 
       `,
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
    throw new BadRequestError("Error 500!");
  }
  res.status(StatusCodes.CREATED).json(orderAdult);
};

const getAllOrders = async (req, res) => {
  console.log(req.params);
  try {
    let childOrders = await OrderChild.find({ userId: req.params.userId });
    let adultOrders = await OrderAdult.find({ userId: req.params.userId });
    console.log(childOrders);
    console.log(adultOrders);
    res.status(StatusCodes.CREATED).json({ childOrders, adultOrders });
  } catch (error) {
    throw new BadRequestError("Internal server Error!");
  }
};

const updateChildrenOrder = async (req, res) => {
  console.log(req.body);
  const {
    userId,
    orderId,
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
  } = req.body;
  try {
    let order = await OrderChild.findById(orderId);

    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json("Order not found");
    }
    (order.name = name),
      (order.tarif = tarif),
      (order.name2 = name2),
      (order.name3 = name3),
      (order.part = part),
      (order.curatorsAmount = curatorsAmount),
      (order.cur = cur),
      (order.age = age),
      (order.subject = subject),
      (order.punct = punct),
      (order.graduate = graduate),
      (order.nomPul = nomPul),
      (order.language = language),
      (order.language2 = language2),
      (order.link = link),
      (order.email = email),
      (order.phone = phone),
      (order.extra1 = extra1),
      (order.extra2 = extra2),
      (order.extra3 = extra3),
      await order.save();
    let childOrders = await OrderChild.find({ userId: userId });
    res.status(StatusCodes.OK).json(childOrders);
  } catch (error) {
    throw new BadRequestError("Internal server error");
  }
};

const updateAdultOrder = async (req, res) => {
  console.log(req.body);
  const {
    userId,
    orderId,
    number,
    eventId,
    name,
    status,
    tarif,
    name2,
    name3,
    part,
    curatorsAmount,
    cur,
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
  try {
    let order = await OrderAdult.findById(orderId);
    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json("Order not found");
    }
    // order.eventId = eventId;
    // order.status = status;
    order.name = name;
    order.name2 = name2;
    order.name3 = name3;
    order.tarif = tarif;
    order.part = part;
    order.curatorsAmount = curatorsAmount;
    order.cur = cur;
    order.subject = subject;
    order.subject2 = subject2;
    order.subject3 = subject3;
    order.punct = punct;
    order.punct2 = punct2;
    order.punct3 = punct3;
    order.job = job;
    order.job2 = job2;
    order.job3 = job3;
    order.job_title = job_title;
    order.job_title2 = job_title2;
    order.job_title3 = job_title3;
    order.internship = internship;
    order.internship2 = internship2;
    order.internship3 = internship3;
    order.graduate = graduate;
    order.nomPul = nomPul;
    order.language = language;
    order.language2 = language2;
    order.link = link;
    order.email = email;
    order.phone = phone;
    order.extra1 = extra1;
    order.extra2 = extra2;
    order.extra3 = extra3;
    await order.save();

    let adultOrders = await OrderAdult.find({ userId: userId });

    res.status(StatusCodes.OK).json(adultOrders);
  } catch (error) {
    throw new BadRequestError("Internal server error");
  }
};

export {
  editUser,
  getEvent,
  changePass,
  createChildOrder,
  createAdultOrder,
  getAllOrders,
  updateChildrenOrder,
  updateAdultOrder,
};
