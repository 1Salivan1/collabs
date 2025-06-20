import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Tag } from "../models/Tags";
import db from "../db";

const generateToken = (id: number) =>
  jwt.sign({ _id: id }, process.env.SECRET || "", { expiresIn: "30d" });

const createUser = async (userData: any) => {
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser)
    return {
      status: 400,
      data: { message: "Користувач з такою поштою вже існує" },
    };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const user = await User.create({ ...userData, password: hashedPassword });

  if (userData.tags && Array.isArray(userData.tags)) {
    await user.setTags(userData.tags);
  }

  const tags = await user.getTags({
    joinTableAttributes: [],
    attributes: ["id", "name"],
  });
  const token = generateToken(user.id);

  return {
    status: 200,
    user: {
      token,
      id: user.id,
      username: user.username,
      tags,
      email: user.email,
      about: user.about,
      telegram: user.telegram,
      linkedin: user.linkedin,
      discord: user.discord,
    },
  };
};

const updateUser = async (userId: number, userData: any) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return { status: 404, data: { message: "Користувача не знайдено" } };
  }

  const { email, password, ...allowedUpdates } = userData;

  await user.update(allowedUpdates);
  await user.setTags(userData.tags);

  const tags = await user.getTags({
    joinTableAttributes: [],
    attributes: ["id", "name"],
  });

  return {
    status: 200,
    data: {
      id: user.id,
      username: user.username,
      tags,
      email: user.email,
      about: user.about,
      telegram: user.telegram,
      linkedin: user.linkedin,
      discord: user.discord,
    },
  };
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return { status: 400, data: { message: "Неправильна пошта або пароль" } };
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return { status: 400, data: { message: "Неправильна пошта або пароль" } };
  }

  const token = generateToken(user.id);
  return {
    status: 200,
    token,
  };
};

const getCurrentUser = async (userId: number) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return { status: 404, data: { message: "Користувача не знайдено" } };
  }
  const tags = await user.getTags({
    joinTableAttributes: [],
    attributes: ["id", "name"],
  });

  return {
    status: 200,
    user: {
      id: user.id,
      username: user.username,
      tags,
      email: user.email,
      about: user.about,
      telegram: user.telegram,
      linkedin: user.linkedin,
      discord: user.discord,
    },
  };
};

const getAllUsers = async () => {
  const users = await User.findAll({
    include: { model: Tag, attributes: ["id", "name"] },
  });

  if (!users || users.length === 0) {
    return { status: 404, data: { message: "Користувачі не знайдені" } };
  }

  return {
    status: 200,
    users: users.map((user: any) => ({
      _id: user.id,
      username: user.username,
      tags: user.Tags.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
      })),
      email: user.email,
      about: user.about,
      telegram: user.telegram,
      linkedin: user.linkedin,
      discord: user.discord,
    })),
  };
};

const getUserById = async (userId: number) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return { status: 404, data: { message: "Користувача не знайдено" } };
  }
  const tags = await user.getTags({
    joinTableAttributes: [],
    attributes: ["id", "name"],
  });

  return {
    status: 200,
    user: {
      id: user.id,
      username: user.username,
      tags,
      email: user.email,
      about: user.about,
      telegram: user.telegram,
      linkedin: user.linkedin,
      discord: user.discord,
    },
  };
};

const UserServices = {
  createUser,
  updateUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
};

export default UserServices;
