import Admin from "../models/Admin.js";
import Event from "../models/Event.js";
import User from "../models/Users.js";
import Nomination from "../models/Nomination.js";
import NomE from "../models/NomE.js";
import OrdersChild from "../models/OrderChild.js";
import OrderAdult from "../models/OrderAdult.js";
import Reason from "../models/Reason.js";
import { StatusCodes } from "http-status-codes";
import fs from "fs";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-errors.js";
import nodemailer from "nodemailer";

const login = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    throw new BadRequestError("Введите все значения");
  }
  const admin = await Admin.findOne({ login });
  if (!admin) {
    throw new UnAuthenticatedError("Не корректные данные");
  }
  if (password !== admin.password) {
    throw new UnAuthenticatedError("Не корректные данные");
  }
  res.status(StatusCodes.OK).json({ admin: login });
};

const createEvent = async (req, res) => {
  const {
    name,
    date1,
    date2,
    tarif_1,
    tarif_2,
    tarif_3,
    tarif_1a,
    tarif_2a,
    tarif_3a,
    supervisor,
    diplom,
    index,
  } = req.body;
  console.log(index);

  if (
    !name ||
    !date1 ||
    !date2 ||
    !tarif_1 ||
    !tarif_2 ||
    !tarif_3 ||
    !tarif_1a ||
    !tarif_2a ||
    !tarif_3a ||
    !supervisor ||
    !diplom
  ) {
    throw new BadRequestError("Введите все значения");
  }

  if (date1 > date2) {
    throw new BadRequestError(
      "Мероприятие не может завершиться раньше даты начала"
    );
  }

  const event = await Event.create({
    name: name,
    date1: date1,
    date2: date2,
    tarif_1: tarif_1,
    tarif_2: tarif_2,
    tarif_3: tarif_3,
    tarif_1a: tarif_1a,
    tarif_2a: tarif_2a,
    tarif_3a: tarif_3a,
    supervisor: supervisor,
    diplom: diplom,
    // index: Number(index) + 1,
    pdf: req.files["file"][0].path,
    image: req.files["image"][0].path,
  });

  const nomE = await NomE.create({
    childNoms: req.body.childNom,
    adultNoms: req.body.adultNom,
    eventId: event._id,
  });

  res.status(StatusCodes.CREATED).json(event);
};

const getEvents = async (req, res) => {
  let events = await Event.find({});
  let noms = await NomE.find({});
  res.status(StatusCodes.OK).json({ events, noms });
};

const editEvent = async (req, res) => {
  const {
    name,
    date1,
    date2,
    id,
    file,
    image,
    tarif_1,
    tarif_2,
    tarif_3,
    tarif_1a,
    tarif_2a,
    tarif_3a,
    supervisor,
    diplom,
  } = req.body;

  // console.log(req.files);

  if (
    !name ||
    !date1 ||
    !date2 ||
    !tarif_1 ||
    !tarif_2 ||
    !tarif_3 ||
    !tarif_1a ||
    !tarif_2a ||
    !tarif_3a ||
    !supervisor ||
    !diplom
  ) {
    throw new BadRequestError("Введите все значения");
  }

  if (date1 > date2) {
    throw new BadRequestError(
      "Мероприятие не может завершиться раньше даты начала"
    );
  }

  let event;
  let events;
  let nomE;

  event = await Event.findById(id);

  if (file === "false" && image === "false") {
    (event.name = name),
      (event.date1 = date1),
      (event.date2 = date2),
      (event.extra1 = req.body.extra1);
    event.extra2 = req.body.extra2;
    event.extra3 = req.body.extra3;
    event.tarif_1 = tarif_1;
    event.tarif_2 = tarif_2;
    event.tarif_3 = tarif_3;
    event.tarif_1a = tarif_1a;
    event.tarif_2a = tarif_2a;
    event.tarif_3a = tarif_3a;
    event.supervisor = supervisor;
    event.diplom = diplom;
    await event.save();
  } else if (file === "false" && image !== "false") {
    fs.unlink(event.image, (err) => {
      console.log(err);
    });
    (event.name = name),
      (event.date1 = date1),
      (event.date2 = date2),
      (event.extra1 = req.body.extra1);
    event.extra2 = req.body.extra2;
    event.extra3 = req.body.extra3;
    event.tarif_1 = tarif_1;
    event.tarif_2 = tarif_2;
    event.tarif_3 = tarif_3;
    event.tarif_1a = tarif_1a;
    event.tarif_2a = tarif_2a;
    event.tarif_3a = tarif_3a;
    event.supervisor = supervisor;
    event.diplom = diplom;
    event.image = req.files["image"][0].path;
    await event.save();
  } else if (file !== "false" && image === "false") {
    fs.unlink(event.pdf, (err) => {
      console.log(err);
    });
    (event.name = name),
      (event.date1 = date1),
      (event.date2 = date2),
      (event.extra1 = req.body.extra1);
    event.extra2 = req.body.extra2;
    event.extra3 = req.body.extra3;
    event.tarif_1 = tarif_1;
    event.tarif_2 = tarif_2;
    event.tarif_3 = tarif_3;
    event.tarif_1a = tarif_1a;
    event.tarif_2a = tarif_2a;
    event.tarif_3a = tarif_3a;
    event.supervisor = supervisor;
    event.diplom = diplom;
    event.pdf = req.files["file"][0].path;
    await event.save();
  } else {
    fs.unlink(event.image, (err) => {
      console.log(err);
    });
    fs.unlink(event.pdf, (err) => {
      console.log(err);
    });
    (event.name = name),
      (event.date1 = date1),
      (event.date2 = date2),
      (event.extra1 = req.body.extra1);
    event.extra2 = req.body.extra2;
    event.extra3 = req.body.extra3;
    event.tarif_1 = tarif_1;
    event.tarif_2 = tarif_2;
    event.tarif_3 = tarif_3;
    event.tarif_1a = tarif_1a;
    event.tarif_2a = tarif_2a;
    event.tarif_3a = tarif_3a;
    event.supervisor = supervisor;
    event.diplom = diplom;
    (event.image = req.files["image"][0].path),
      (event.pdf = req.files["file"][0].path);
    await event.save();
  }

  nomE = await NomE.findById(req.body.nomId);
  nomE.childNoms = req.body.childNoms;
  nomE.adultNoms = req.body.adultNoms;
  await nomE.save();

  events = await Event.find({});
  res.status(StatusCodes.OK).json({ events });
};

const deleteEvent = async (req, res) => {
  let event;
  let delete_file1;
  let delete_file2;
  try {
    event = await Event.findById(req.params.id);
    throw new BadRequestError("Error 500!");
  } catch (error) {}
  delete_file1 = event.pdf;
  delete_file2 = event.image;
  fs.unlink(delete_file1, (err) => {
    console.log(err);
  });
  fs.unlink(delete_file2, (err) => {
    console.log(err);
  });
  await Event.deleteOne(event);
  const events = await Event.find({});
  res.status(StatusCodes.OK).json({ events });
};

const getUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({});
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    throw new BadRequestError("Ошибка 500!");
  }
};

const createNom = async (req, res) => {
  const { name, condition1, condition2, condition3 } = req.body;
  if (!name) {
    throw new BadRequestError("Введите все значения");
  }
  let nom;
  nom = await Nomination.create({
    name: name,
    link: true ? condition1.length !== 0 : false,
    file: true ? condition2.length !== 0 : false,
    language: true ? condition3.length !== 0 : false,
  });

  // if (condition1 === "доступно прикрепление ссылки") {
  //   nom = await Nomination.create({ name: name, link: true });
  // } else {
  //   nom = await Nomination.create({ name: name, link: false, file: true });
  // }
  // await nom.save();
  res.status(StatusCodes.CREATED).json(nom);
};

const getNom = async (req, res) => {
  try {
    const nom = await Nomination.find({});
    res.status(StatusCodes.OK).json(nom);
  } catch (error) {
    throw new BadRequestError("Ошибка 500!");
  }
};

const deleteNom = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new BadRequestError("Введите все значения");
  }
  let nom;
  let noms;
  nom = await Nomination.findById(id);
  await Nomination.deleteOne(nom);
  noms = await Nomination.find({});
  res.status(StatusCodes.OK).json(noms);
};

const getChildOrders = async (req, res) => {
  let ordersChild;
  try {
    ordersChild = await OrdersChild.find({});
    res.status(StatusCodes.OK).json(ordersChild);
  } catch (error) {
    throw new BadRequestError("Ошибка 500!");
  }
};

const getAdultOrders = async (req, res) => {
  let ordersAdult;
  try {
    ordersAdult = await OrderAdult.find({});
    res.status(StatusCodes.OK).json(ordersAdult);
    console.log(ordersAdult);
  } catch (error) {
    throw new BadRequestError("Ошибка 500!");
  }
};

const updateChildrenOrder = async (req, res) => {
  console.log(req.body);
  const {
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
    number,
  } = req.body;
  try {
    let order = await OrdersChild.findById(orderId);
    // console.log(order);
    // order.eventId= eventId,

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
    let ordersChild = await OrdersChild.find({});
    res.status(StatusCodes.OK).json({ order, ordersChild });
  } catch (error) {
    throw new BadRequestError("Internal server error");
  }
};

const updateAdultOrder = async (req, res) => {
  console.log(req.body.status);
  const {
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
    order.status = status;
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
    // res.status(StatusCodes.OK).json(order);
    let ordersAdult = await OrderAdult.find({});
    res.status(StatusCodes.OK).json({ order, ordersAdult });
  } catch (error) {
    throw new BadRequestError("Internal server error");
  }
};

const updateStatusOrder = async (req, res) => {
  console.log(req.body);
  try {
    let order = await OrderAdult.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    if (!order) {
      let order = await OrdersChild.findByIdAndUpdate(req.body.orderId, {
        status: req.body.status,
      });
    }
    let ordersAdult = await OrderAdult.find({});
    let ordersChild = await OrdersChild.find({});
    res.status(StatusCodes.OK).json({ ordersChild, ordersAdult });
  } catch (error) {
    throw new BadRequestError("Internal server error");
  }

  if (req.body.status === "declined") {
    console.log(req.body.decline);
    console.log(req.body.email);
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
        to: `${req.body.email}`,
        subject: "Заявка отклонена",
        text: "",
        html: `<p style="color:#6b2351">${req.body.decline}</p1>`,
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
  }
};

const getReasons = async (req, res) => {
  try {
    let reasons = await Reason.find({});
    res.status(StatusCodes.OK).json(reasons);
  } catch (error) {
    throw new BadRequestError("Error 500 !");
  }
};

export {
  login,
  createEvent,
  getEvents,
  editEvent,
  deleteEvent,
  getUsers,
  createNom,
  getNom,
  deleteNom,
  getChildOrders,
  getAdultOrders,
  updateChildrenOrder,
  updateAdultOrder,
  updateStatusOrder,
  getReasons,
};
