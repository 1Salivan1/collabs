export type User = {
  _id: string;
  username: string;
  email: string;
  git: string;
  tags: [string];
  socials: [string];
  about: string;
};

export type projectCardType = {
  id: number;
  title: string;
  tags: string[];
  micro_description: string;
  full_description: string;
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
