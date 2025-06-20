import {
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  Model,
  Optional,
} from "sequelize";
import { BelongsToManyAddAssociationsMixin } from "sequelize/types";
import db from "../db";
import User from "./User";
import { Tag } from "./Tags";

interface ProjectAttributes {
  id: number;
  title: string;
  text?: string;
  telegram?: string;
  linkedin?: string;
  discord?: string;
  creator_id: number;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}

interface ProjectType
  extends Model<ProjectAttributes, ProjectCreationAttributes>,
    ProjectAttributes {
  setTags: BelongsToManyAddAssociationsMixin<typeof Tag, number>;
  getTags: BelongsToManyGetAssociationsMixin<typeof Tag>;
  Tags?: (typeof Tag)[];
}

const Project = db.define<ProjectType>("Project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
  },
  telegram: {
    type: DataTypes.TEXT,
  },
  linkedin: {
    type: DataTypes.TEXT,
  },
  discord: {
    type: DataTypes.TEXT,
  },
  creator_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
});

Project.belongsTo(User, { foreignKey: "creator_id" });

export default Project;
