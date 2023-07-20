import Admin from "../models/Admin.js";
import Event from "../models/Event.js";
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

  let event;
  let events;
  event = await Event.findById(id);

  if (file === "false" && image === "false") {
    (event.name = name),
      (event.date1 = date1),
      (event.date2 = date2),
      (event.description = description);
    await event.save();
  } else if (file === "false" && image !== "false") {
    fs.unlink(event.image, (err) => {
      console.log(err);
    });
    (event.name = name),
      (event.date1 = date1),
      (event.date2 = date2),
      (event.description = description),
      (event.image = req.files["image"][0].path);
    await event.save();
  } else if (file !== "false" && image === "false") {
    fs.unlink(event.pdf, (err) => {
      console.log(err);
    });
    (event.name = name),
      (event.date1 = date1),
      (event.date2 = date2),
      (event.description = description),
      (event.pdf = req.files["file"][0].path);
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
      (event.description = description),
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

export { login, createEvent, getEvents, editEvent, deleteEvent };
