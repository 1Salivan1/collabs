import db from "../../db";
import User from "../User";
import Tag from "./Tag";

const User_Tag = db.define("User_Tag", {}, { timestamps: false });

User.belongsToMany(Tag, { through: User_Tag });
Tag.belongsToMany(User, { through: User_Tag });

export default User_Tag;
