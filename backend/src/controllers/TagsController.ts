import { Request, Response } from "express";
import { Tag } from "../models/Tags";

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.findAll({
      attributes: ["id", "name"],
    });

    res.status(200).json({
      success: true,
      data: tags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Сталася помилка під час отримання тегів",
    });
  }
};
