import db from "../../db";
import Project from "../Project";
import Tag from "./Tag";

const Project_Tag = db.define("Project_Tag", {}, { timestamps: false });

Project.belongsToMany(Tag, { through: Project_Tag, as: "tags" });
Tag.belongsToMany(Project, { through: Project_Tag, as: "projects" });

export default Project_Tag;
