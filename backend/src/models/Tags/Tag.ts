import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db";

export interface TagAttributes {
  id: number;
  name: string;
}

interface TagCreationAttributes extends Optional<TagAttributes, "id"> {}

interface TagType
  extends Model<TagAttributes, TagCreationAttributes>,
    TagAttributes {}

const Tag = db.define<TagType>("Tag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export default Tag;
