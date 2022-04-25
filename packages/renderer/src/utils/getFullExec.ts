import { Project } from "@/types";

export const getFullExec = (project: Project) => {
  return `${project.command?.command} ${project.name} -- --template react`;
};
