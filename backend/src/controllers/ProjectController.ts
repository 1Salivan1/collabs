import { Request, Response } from "express";
import { AuthRequest } from "../types/types";
import { validationResult } from "express-validator";
import Project from "../models/Project";
import ProjectServices from "../services/ProjectServices";
import { CreateProjectDto, UpdateProjectDto } from "../dto/Project";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectServices.getAllProjects();

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Сталася помилка під час отримання проєктів",
    });
  }
};

export const getOneProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectServices.getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Проєкт не знайдено",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Сталася помилка під час отримання проєкту",
    });
  }
};

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const projectData = plainToClass(CreateProjectDto, {...req.body, creator_id: userId});

    const validationErrors = await validate(projectData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }

    const project = await ProjectServices.createNewProject(projectData, userId);

    res.json({ ...project });
  } catch (err) {
    res.status(500).json({
      message: "Не вдалося створити проєкт",
    });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Проєкт не знайдено" });
    }

    await project.destroy();

    res.json({ success: true, message: "Проєкт успішно видалено" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Виникла помилка при видаленні проєкту",
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Проєкт не знайдений",
      });
    }

    const projectData = plainToClass(UpdateProjectDto, req.body);
    const validationErrors = await validate(projectData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }

    const updatedProject = await ProjectServices.updateProject(req.params.id, projectData);

    res.json({ success: true, updatedProject });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Виникла помилка при оновлені проєкту",
    });
  }
};

export const getMyProjects = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }
    
    const projects = await ProjectServices.getMyProjects(req.userId);

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Проєкти не знайдені",
      });
    }

    res.json({ projects });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Помилка при отриманні проєктів",
    });
  }
};
