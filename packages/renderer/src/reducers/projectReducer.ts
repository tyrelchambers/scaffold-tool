import { Project } from "@/types";
import { Reducer } from "react";

export enum Actions {
  SET_COMMAND = "SET_COMMAND",
  SET_NAME = "SET_NAME",
  SET_FLAG = "SET_FLAG",
}

type State = Project | null | undefined;

type Action = {
  type: Actions;
  payload: any;
};

export const projectReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case Actions.SET_COMMAND: {
      return {
        ...state,
        command: action.payload,
      };
    }

    case Actions.SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }

    case Actions.SET_FLAG: {
      return {
        ...state,
        flags: [
          {
            [action.payload.label]: action.payload.value,
          },
        ],
      };
    }
  }
};
