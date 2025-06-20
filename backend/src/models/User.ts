import {
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  Model,
  Optional,
} from "sequelize";
import { BelongsToManyAddAssociationsMixin } from "sequelize/types";
import Tag from "./Tags/Tag";
import db from "../db";

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  about: string;
  telegram?: string;
  linkedin?: string;
  discord?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

interface UserType
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  setTags: BelongsToManyAddAssociationsMixin<typeof Tag, number>;
  getTags: BelongsToManyGetAssociationsMixin<typeof Tag>;
}

const User = db.define<UserType>("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.TEXT,
    unique: false,
  },
  email: {
    type: DataTypes.TEXT,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
  },
  about: {
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
});

export default User;
