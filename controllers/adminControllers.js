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
    pdf: req.files.file.path,
    image: req.files.image.path,
  });
  // console.log(req.body);
  // console.log(req.files.file);
  res.status(StatusCodes.CREATED).json(event);
};
export { login, createEvent };
