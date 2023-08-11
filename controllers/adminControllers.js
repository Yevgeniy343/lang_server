import Admin from "../models/Admin.js";
import Event from "../models/Event.js";
import User from "../models/Users.js";
import Nomination from "../models/Nomination.js";
import NomE from "../models/NomE.js";
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
  const { name, date1, date2 } = req.body;

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
  console.log(req.body);
  const { name, date1, date2, id, file, image } = req.body;

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
  let nomE;

  event = await Event.findById(id);

  if (file === "false" && image === "false") {
    (event.name = name),
      (event.date1 = date1),
      (event.date2 = date2),
      (event.extra1 = req.body.extra1);
    event.extra2 = req.body.extra2;
    event.extra3 = req.body.extra3;
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
