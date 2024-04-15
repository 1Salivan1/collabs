export type User = {
  _id: string;
  username: string;
  email: string;
  tags: [string];
  about: string;
  telegram?: string;
  linkedin?: string;
  discord?: string;
};

export type projectCardType = {
  id: number;
  title: string;
  tags: string[];
  description: string;
  needs: string[];
  contacts: string[];
};

export type userCardType = {
  id: number;
  username: string;
  tags: string[];
  micro_description: string;
  full_description: string;
  contacts: string[];
};

export type myProject = {
  id: number;
  title: string;
  tags: string[];
  text: string;
  needs: string[];
  socials: string[];
};
