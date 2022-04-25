type Flag = {
  label: string;
  values: string[];
};

export type Command = {
  name: string;
  command: string;
  flags?: Flag[];
  logo?: string;
};

export type Project = {
  name?: string;
  command?: Command;
  path?: string;
  flags?: { [key: string]: string }[];
};

export type CreateHandler = Project;
