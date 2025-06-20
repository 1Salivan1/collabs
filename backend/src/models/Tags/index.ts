import Tag from "./Tag";
import User_Tag from "./User_Tag";
import Project_Tag from "./Project_Tag";
import { tagsArray } from "./variables/tagsArray";

export { Tag, User_Tag, Project_Tag };

export const addDefaultTags = async () => {
  for (const tagName of tagsArray) {
    await Tag.findOrCreate({
      where: { name: tagName },
    });
  }
};
