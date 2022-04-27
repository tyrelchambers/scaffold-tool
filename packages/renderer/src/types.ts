export type FlagValue = {
  name: string;
  label?: string;
};
export interface Flag {
  label: string;
  values?: FlagValue[];
  isCheckbox?: boolean;
  description?: string;
}

export interface Command {
  name: string;
  command: string;
  flags?: Flag[];
  logo?: string;
}

export interface Project {
  name?: string;
  command?: Command;
  path?: string;
  flags?: { [key: string]: string }[];
}

export type CreateHandler = Project;
