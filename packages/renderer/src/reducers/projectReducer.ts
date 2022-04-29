import { FlagValue, Project } from "@/types";

import { Reducer } from "react";

export enum Actions {
  SET_COMMAND = "SET_COMMAND",
  SET_NAME = "SET_NAME",
  SET_FLAG = "SET_FLAG",
  SET_DIRECTORY = "SET_DIRECTORY",
}

interface Action {
  type: Actions;
  payload: any;
}

export const projectReducer: Reducer<Project, Action> = (state, action) => {
  switch (action.type) {
    case Actions.SET_COMMAND: {
      return {
        ...state,
        command: action.payload,
        flags: [],
      };
    }

    case Actions.SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }

    case Actions.SET_FLAG: {
      const cloneFlags: FlagValue[] = [...state.flags];

      // remove flag if it exists else add it
      const index = cloneFlags.findIndex(
        (flag) => flag.label === action.payload.label
      );

      if (index === -1) {
        cloneFlags.push(action.payload);
      } else {
        cloneFlags.splice(index, 1);
      }

      return {
        ...state,
        flags: [...cloneFlags],
      };
    }

    case Actions.SET_DIRECTORY: {
      return {
        ...state,
        path: action.payload,
      };
    }
  }
};
