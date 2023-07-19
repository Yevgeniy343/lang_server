import Admin from "../models/Admin.js";
import Event from "../models/Event.js";
import { StatusCodes } from "http-status-codes";

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
  console.log(admin);
  res.status(StatusCodes.OK).json({ admin: login });
};

const createEvent = async (req, res) => {
  const { name, date1, date2, description } = req.body;

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
    description: description,
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
  const { name, date1, date2, description, id, file, image } = req.body;

  console.log(req.body);
  // console.log(req.files);

  if (!name || !date1 || !date2 || !description) {
    throw new BadRequestError("Введите все значения");
  }

  if (date1 > date2) {
    throw new BadRequestError(
      "Мероприятие не может завершиться раньше даты начала"
    );
  }

  if (file === "false" && image === "false") {
    const event = await Event.findByIdAndUpdate(id, {
      name: name,
      date1: date1,
      date2: date2,
      description: description,
    });
  } else if (file === "false" && image !== "false") {
    const event = await Event.findByIdAndUpdate(id, {
      name: name,
      date1: date1,
      date2: date2,
      description: description,
      image: req.files["image"][0].path,
    });
  } else if (file !== "false" && image === "false") {
    const event = await Event.findByIdAndUpdate(id, {
      name: name,
      date1: date1,
      date2: date2,
      description: description,
      pdf: req.files["file"][0].path,
    });
  } else {
    const event = await Event.findByIdAndUpdate(id, {
      name: name,
      date1: date1,
      date2: date2,
      description: description,
      pdf: req.files["file"][0].path,
      image: req.files["image"][0].path,
    });
  }
  const events = await Event.find({});
  res.status(StatusCodes.OK).json({ events });
};

export { login, createEvent, getEvents, editEvent };
