import { Project } from "@/types";

export const getFullExec = (project: Project): string => {
  const flags = () => {
    if (!project?.flags) {
      return "";
    }

    for (let i = 0; i < project?.flags.length; i++) {
      const element = project?.flags[i];
      console.log(element);
    }

    // return project.flags.map((flag) => {
    //   const keys = Object.keys(flag);
    //   const key = keys[0];
    //   const value = flag[key];
    //   console.log(keys);

    //   if (value === true) {
    //     return `${key}`;
    //   }

    //   return `${key} ${value}`;
    // });
  };

  return `${project?.command?.command} ${flags()} `;
};
