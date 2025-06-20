import Project from "../models/Project";
import { Tag } from "../models/Tags";

const getAllProjects = async () => {
  const projects = await Project.findAll({
    include: { model: Tag, as: "tags", attributes: ["id", "name"] },
  });

  if (!projects || projects.length === 0) {
    return { status: 404, data: { message: "Проектів не знайдено" } };
  }

  return {
    status: 200,
    projects: projects,
  };
};

const getProjectById = async (id: string) => {
  const project = await Project.findByPk(id, {
    include: { model: Tag, as: "tags", attributes: ["id", "name"] },
  });

  return {
    status: 200,
    project
  };
};

const createNewProject = async (data: any, userId: string) => {
  const project = await Project.create({
    title: data.title,
    text: data.text,
    telegram: data?.telegram,
    discord: data?.discord,
    linkedin: data?.linkedin,
    creator_id: Number(userId),
  });

  if (data.tags && Array.isArray(data.tags)) {
    await project.setTags(data.tags);
  }

  return { ...data, creator_id: Number(userId) };
};

const removeProject = async (id: number) => {
  const project = await Project.findByPk(id);
  if (project) await project.destroy();
  return project;
};

const updateProject = async (id: string, data: any) => {
  const project = await Project.findByPk(id);

  if (!project) return null;

  const tags = data.tags;
  delete data.tags;

  await project.update(data);

  if (tags && Array.isArray(tags)) {
    await project.setTags(tags);
  }

  return project;
};


const getMyProjects = async (userId: string) => {
  const projects = await Project.findAll({ where: { creator_id: userId }, include: { model: Tag, as: 'tags', attributes: ["id", "name"] } });
  return projects;
};

const ProjectServices = {
  getAllProjects,
  getProjectById,
  createNewProject,
  removeProject,
  updateProject,
  getMyProjects,
};

export default ProjectServices;
