import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { AuthRequest } from "../types/types";
import UserServices from "../services/UserServices";
import { CreateUserDto } from "../dto/User/CreateUserDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { UpdateUserDto } from "../dto/User/UpdateUserDTO";
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const userData = plainToClass(CreateUserDto, req.body);
    const validationErrors = await validate(userData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Під час валідації виникла помилка",
        errors: validationErrors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }

    const user = await UserServices.createUser(userData);

    res.json({
      ...user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не вдалося зареєструватися",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    console.log(token);
    

    if (!token) {
      return res.status(401).json({ message: 'Токен не надано' });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.SECRET!);
      console.log(decoded);
      
    } catch (err) {
      return res.status(403).json({ message: 'Невірний або прострочений токен' });
    }

    const userId = decoded._id;

    const userData = plainToClass(UpdateUserDto, req.body);
    const validationErrors = await validate(userData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }

    const result = await UserServices.updateUser(userId, userData);

    if (result.status !== 200) {
      return res.status(result.status).json(result.data);
    }

    res.json(result.data);
  } catch (error) {
    res.status(500).json({
      message: 'Помилка при оновленні користувача',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await UserServices.loginUser(
      req.body.email,
      req.body.password
    );

    res.status(data.status).json({ ...data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Помилка входу" });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const data = await UserServices.getCurrentUser(Number(req.userId));

    res.json({
      user: data.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Немає доступу",
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await UserServices.getAllUsers();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Не вдалося отримати список користувачів",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const data = await UserServices.getUserById(Number(userId));

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Не вдалося отримати користувача",
    });
  }
};
