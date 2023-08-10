import Admin from "../models/Admin.js";
import Event from "../models/Event.js";
import User from "../models/Users.js";
import Nomination from "../models/Nomination.js";
import { StatusCodes } from "http-status-codes";
import fs from "fs";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-errors.js";

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
  // console.log(req.body.childNom_1);
  console.log(req.body);
  const {
    name,
    date1,
    date2,
    childNom_1,
    childNom_2,
    childNom_3,
    childNom_4,
    childNom_5,
    childNom_6,
    childNom_7,
    childNom_8,
    childNom_9,
    childNom_10,
    adultNom_1,
    adultNom_2,
    adultNom_3,
    adultNom_4,
    adultNom_5,
    adultNom_6,
    adultNom_7,
  } = req.body;

  if (!name) {
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
    childNom_1: childNom_1,
    childNom_2: childNom_2,
    childNom_3: childNom_3,
    childNom_4: childNom_4,
    childNom_5: childNom_5,
    childNom_6: childNom_6,
    childNom_7: childNom_7,
    childNom_8: childNom_8,
    childNom_9: childNom_9,
    childNom_10: childNom_10,
    adultNom_1: adultNom_1,
    adultNom_2: adultNom_2,
    adultNom_3: adultNom_3,
    adultNom_4: adultNom_4,
    adultNom_5: adultNom_5,
    adultNom_6: adultNom_6,
    adultNom_7: adultNom_7,

    pdf: req.files["file"][0].path,
    image: req.files["image"][0].path,
  });
  // console.log(req.body);
  res.status(StatusCodes.CREATED).json(event);
};

const getEvents = async (req, res) => {
  let events = await Event.find({});
  res.status(StatusCodes.OK).json({ events });
};

const editEvent = async (req, res) => {
  const {
    name,
    date1,
    date2,
    id,
    file,
    image,
    childNom_1,
    childNom_2,
    childNom_3,
    childNom_4,
    childNom_5,
    childNom_6,
    childNom_7,
    childNom_8,
    childNom_9,
    childNom_10,
    adultNom_1,
    adultNom_2,
    adultNom_3,
    adultNom_4,
    adultNom_5,
    adultNom_6,
    adultNom_7,
  } = req.body;

  console.log(req.body);
  // console.log(req.files);

  if (!name || !date1 || !date2) {
    throw new BadRequestError("Введите все значения");
  }

  if (date1 > date2) {
    throw new BadRequestError(
      "Мероприятие не может завершиться раньше даты начала"
    );
  }

  let event;
  let events;
  event = await Event.findById(id);

  if (file === "false" && image === "false") {
    (event.name = name),
      (event.date1 = date1),
      (event.date2 = date2),
      (event.childNom_1 = childNom_1);
    event.childNom_2 = childNom_2;
    event.childNom_3 = childNom_3;
    event.childNom_4 = childNom_4;
    event.childNom_5 = childNom_5;
    event.childNom_6 = childNom_6;
    event.childNom_7 = childNom_7;
    event.childNom_8 = childNom_8;
    event.childNom_9 = childNom_9;
    event.childNom_10 = childNom_10;
    event.adultNom_1 = adultNom_1;
    event.adultNom_2 = adultNom_2;
    event.adultNom_3 = adultNom_3;
    event.adultNom_4 = adultNom_4;
    event.adultNom_5 = adultNom_5;
    event.adultNom_6 = adultNom_6;
    event.adultNom_7 = adultNom_7;
    await event.save();
  } else if (file === "false" && image !== "false") {
    fs.unlink(event.image, (err) => {
      console.log(err);
    });
    (event.name = name),
      (event.date1 = date1),
      (event.date2 = date2),
      (event.childNom_1 = childNom_1);
    event.childNom_2 = childNom_2;
    event.childNom_3 = childNom_3;
    event.childNom_4 = childNom_4;
    event.childNom_5 = childNom_5;
    event.childNom_6 = childNom_6;
    event.childNom_7 = childNom_7;
    event.childNom_8 = childNom_8;
    event.childNom_9 = childNom_9;
    event.childNom_10 = childNom_10;
    event.adultNom_1 = adultNom_1;
    event.adultNom_2 = adultNom_2;
    event.adultNom_3 = adultNom_3;
    event.adultNom_4 = adultNom_4;
    event.adultNom_5 = adultNom_5;
    event.adultNom_6 = adultNom_6;
    event.adultNom_7 = adultNom_7;
    event.image = req.files["image"][0].path;
    await event.save();
  } else if (file !== "false" && image === "false") {
    fs.unlink(event.pdf, (err) => {
      console.log(err);
    });
    (event.name = name),
      (event.date1 = date1),
      (event.date2 = date2),
      (event.childNom_1 = childNom_1);
    event.childNom_2 = childNom_2;
    event.childNom_3 = childNom_3;
    event.childNom_4 = childNom_4;
    event.childNom_5 = childNom_5;
    event.childNom_6 = childNom_6;
    event.childNom_7 = childNom_7;
    event.childNom_8 = childNom_8;
    event.childNom_9 = childNom_9;
    event.childNom_10 = childNom_10;
    event.adultNom_1 = adultNom_1;
    event.adultNom_2 = adultNom_2;
    event.adultNom_3 = adultNom_3;
    event.adultNom_4 = adultNom_4;
    event.adultNom_5 = adultNom_5;
    event.adultNom_6 = adultNom_6;
    event.adultNom_7 = adultNom_7;
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
      (event.childNom_1 = childNom_1);
    event.childNom_2 = childNom_2;
    event.childNom_3 = childNom_3;
    event.childNom_4 = childNom_4;
    event.childNom_5 = childNom_5;
    event.childNom_6 = childNom_6;
    event.childNom_7 = childNom_7;
    event.childNom_8 = childNom_8;
    event.childNom_9 = childNom_9;
    event.childNom_10 = childNom_10;
    event.adultNom_1 = adultNom_1;
    event.adultNom_2 = adultNom_2;
    event.adultNom_3 = adultNom_3;
    event.adultNom_4 = adultNom_4;
    event.adultNom_5 = adultNom_5;
    event.adultNom_6 = adultNom_6;
    event.adultNom_7 = adultNom_7;
    (event.image = req.files["image"][0].path),
      (event.pdf = req.files["file"][0].path);
    await event.save();
  }
  events = await Event.find({});
  res.status(StatusCodes.OK).json({ events });
};

const deleteEvent = async (req, res) => {
  console.log(req.params.id);
  let event;
  let delete_file1;
  let delete_file2;
  try {
    event = await Event.findById(req.params.id);
    throw new BadRequestError("Error 500!");
  } catch (error) {}
  delete_file1 = event.pdf;
  delete_file2 = event.image;
  console.log(delete_file1, delete_file2);
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
    console.log(users);
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    throw new BadRequestError("Ошибка 500!");
  }
};

const createNom = async (req, res) => {
  console.log(req.body);
  const { name, condition } = req.body;
  if (!name || !condition) {
    throw new BadRequestError("Введите все значения");
  }
  let nom;
  if (condition === "доступно прикрепление ссылки") {
    nom = await Nomination.create({ name: name, link: true, file: false });
  } else {
    nom = await Nomination.create({ name: name, link: false, file: true });
  }
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
  console.log(req.params);
  const id = req.params.id;
  console.log("id=", id);
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
};
