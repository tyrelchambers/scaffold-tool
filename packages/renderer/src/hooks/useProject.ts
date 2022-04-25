import { Actions, projectReducer } from "@/reducers/projectReducer";
import { useEffect, useReducer } from "react";

import { Command } from "@/types";

export const useProject = (command: Command) => {
  const [project, dispatch] = useReducer(projectReducer, {});

  useEffect(() => {
    dispatch({
      type: Actions.SET_COMMAND,
      payload: command,
    });
  }, [command]);

  return { project, dispatch };
};
