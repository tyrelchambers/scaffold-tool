import { Project } from "@/types";

export const getFullExec = (project: Project): string => {
  const flags = () => {
    if (!project?.flags) {
      return "";
    }

    return project.flags
      .map((flag) => {
        const keys = Object.keys(flag);
        const key = keys[0];
        const value = flag[key];

        if (value === true) {
          return `${key}`;
        }

        return `${flag.label} ${flag.value || ""}`;
      })
      .join(" ");
  };

  return `${project?.command?.command} ${project.name || ""} ${flags()} `;
};
