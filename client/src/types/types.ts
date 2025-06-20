export type Tag = {
  id: number;
  name: string;
};

export type User = {
  _id: number;
  username: string;
  email: string;
  tags: Tag[];
  about: string;
  telegram?: string;
  linkedin?: string;
  discord?: string;
};

export type projectCardType = {
  id: number;
  title: string;
  tags: Tag[];
  text: string;
  telegram?: string;
  linkedin?: string;
  discord?: string;
};

export type myProject = {
  id: number;
  title: string;
  tags: Tag[];
  text: string;
  needs: string[];
  socials: string[];
};
