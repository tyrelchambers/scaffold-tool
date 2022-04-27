import { Actions, projectReducer } from "./reducers/projectReducer";
import { CreateHandler, Flag, FlagValue } from "./types";
import {
  faCheckCircle,
  faCircle,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useReducer } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RadioGroup } from "@headlessui/react";
import commands from "./data/commands";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getFullExec } from "./utils/getFullExec";
import { useCommand } from "./hooks/useCommand";

const App = () => {
  const { command, setCommand } = useCommand();
  const [project, dispatch] = useReducer(projectReducer, {
    flags: [],
  });

  useEffect(() => {
    dispatch({
      type: Actions.SET_COMMAND,
      payload: command,
    });
  }, [command]);

  const directoryHandler = async () => {
    // @ts-expect-error
    const file = await window.ipcRenderer.openDialog();
    dispatch({
      type: Actions.SET_DIRECTORY,
      payload: file[0],
    });
  };

  const createHandler = async (project: CreateHandler | null) => {
    if (!project) return;

    const fullCmd = await getFullExec(project);
    console.log(fullCmd);

    // window.ipcRenderer.createProject(project.path, fullCmd);
  };

  return (
    <div className="h-full min-h-screen p-10 bg-zinc-900">
      <h1 className="text-4xl text-zinc-200 font-bold">
        Scaffold your project{" "}
        <FontAwesomeIcon
          icon={faCircle}
          className="text-indigo-600"
          fontSize="14"
        />
      </h1>
      <p className="text-xl text-zinc-400 mt-2">
        Let's fill out some information
      </p>

      {/* {console.log(project)} */}

      {command && (
        <div className="p-4 rounded-lg bg-zinc-800 mt-8 w-fit">
          <p className="text-zinc-200 text-lg">
            <span className="mr-4 select-none text-indigo-300">$</span>{" "}
            {getFullExec(project)}
          </p>
        </div>
      )}

      <main className="flex max-w-screen-xl gap-20">
        <section className="mt-10">
          <div className=" w-[400px]">
            <RadioGroup
              value={command}
              onChange={(e) => setCommand(e)}
              className="flex flex-col gap-6"
            >
              {commands.map((cmd) => (
                <RadioGroup.Option
                  value={cmd}
                  key={cmd.name}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-300 "
                        : ""
                    }
                  ${
                    checked
                      ? "bg-indigo-500 bg-opacity-75 text-white"
                      : "bg-zinc-800 "
                  }
                    focus:outline-none relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md`
                  }
                >
                  {({ checked }) => (
                    <span className={`flex gap-6 items-center w-full`}>
                      <img src={cmd.logo} alt="" className="h-8" />

                      <div className="flex flex-col w-full">
                        <RadioGroup.Label
                          as="p"
                          className={`  ${
                            checked ? "text-white font-bold" : "text-gray-300"
                          }`}
                        >
                          {cmd.name}
                        </RadioGroup.Label>
                      </div>

                      {checked && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className=" p-2 rounded-full bg-indigo-500 text-white shadow-md"
                        />
                      )}
                    </span>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </div>
        </section>

        {project?.command && (
          <div className="flex flex-col w-full max-w-lg">
            <section className="mt-10">
              <h2 className="text-zinc-200 text-2xl">
                Name your <span className="  font-bold">project</span>
              </h2>
              <input
                type="text"
                placeholder="my cool project"
                className="bg-zinc-900 p-4 rounded-lg w-full max-w-sm mt-4 border-2 border-zinc-600 text-white"
                value={project?.name}
                onChange={(e) =>
                  dispatch({
                    type: Actions.SET_NAME,
                    payload: e.target.value,
                  })
                }
              />
            </section>

            <section className="mt-10">
              <h2 className="text-zinc-200 text-2xl">
                Choose your <span className="font-bold ">flags</span>
              </h2>
              <div className="flex flex-col gap-8 mt-8">
                {project?.command?.flags?.map((flag) => (
                  <div
                    key={flag.label}
                    className="bg-zinc-800 rounded-lg overflow-hidden "
                  >
                    <header className="flex flex-col px-4 py-2 bg-zinc-700">
                      <p className="text-zinc-100 text-lg">{flag.label}</p>
                      <p className="text-zinc-200">{flag.description}</p>
                    </header>
                    {flag?.values && !flag.isCheckbox && (
                      <div className=" flex gap-4 flex-wrap mt-2 p-2">
                        {flag.values.map((val) => (
                          <button
                            onClick={() =>
                              dispatch({
                                type: Actions.SET_FLAG,
                                payload: {
                                  label: flag.label,
                                  value: val,
                                },
                              })
                            }
                            className="flex-1 whitespace-nowrap p-2 px-4 rounded-full text-zinc-200 border-2 border-zinc-200 hover:bg-indigo-700 transition-all text-sm"
                          >
                            <>{val}</>
                          </button>
                        ))}
                      </div>
                    )}

                    {flag.isCheckbox &&
                      flag.values?.map((val) => (
                        <div className="py-2 px-4">
                          <input
                            type="checkbox"
                            className="mr-2"
                            name={val.name}
                            onChange={(e) => {
                              dispatch({
                                type: Actions.SET_FLAG,
                                payload: {
                                  label: flag.label,
                                  value: e.target.checked,
                                  isCheckbox: true,
                                },
                              });
                            }}
                          />
                          <label className="text-zinc-100" htmlFor={val.name}>
                            {val.label}
                          </label>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-zinc-200 text-lg">
                Choose <span className="font-bold">target directory</span>
              </h2>
              {!project?.path && command && (
                <button
                  onClick={() => directoryHandler()}
                  className={`rounded-full p-2 px-4 text-sm shadow-md bg-indigo-700 text-white mt-4`}
                >
                  Choose directory
                </button>
              )}

              {project?.path && (
                <div className="bg-blue-500 p-4 px-6 rounded-md w-fit flex gap-10 items-center mt-4 shadow-md">
                  <FontAwesomeIcon icon={faFolder} className="text-white" />
                  <div className="flex flex-col">
                    <p className="text-white text-xs">Project path</p>
                    <p className="text-white opacity-70  text-xs mt-1">
                      {project.path}/{project.name}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-white opacity-70 hover:opacity-100 transition-all"
                  />
                </div>
              )}
            </section>
            {project?.path && project.command && project.name && (
              <button
                onClick={() => createHandler(project)}
                className="bg-green-500 text-zinc-800 p-4 mt-8 text-sm rounded-lg"
              >
                Create
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
