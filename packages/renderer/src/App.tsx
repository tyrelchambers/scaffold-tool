import { Actions, projectReducer } from "./reducers/projectReducer";
import { CreateHandler, Flag, FlagValue } from "./types";
import { Popover, RadioGroup } from "@headlessui/react";
import {
  faArrowRight,
  faCheckCircle,
  faCircle,
  faFolder,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useReducer } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                      ? "bg-indigo-600 bg-opacity-100 text-white"
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
                          className={`${
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
              <h2 className="text-zinc-200 text-xl">
                Name your <span className="  font-bold">project</span>
              </h2>
              <input
                type="text"
                placeholder="my cool project"
                className="bg-zinc-900 p-4 rounded-lg w-full mt-4 border-2 border-zinc-600 text-white outline-indigo-500"
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
              <h2 className="text-zinc-200 text-xl">
                Choose your <span className="font-bold ">flags</span>
              </h2>
              <Popover className="relative w-full mt-4">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`bg-zinc-800 w-full p-4 rounded-lg text-white hover:bg-indigo-500 transition-all font-bold justify-between flex items-center ${
                        open ? "bg-indigo-600" : "bg-zinc-800"
                      }`}
                    >
                      Select flags
                      <FontAwesomeIcon icon={open ? faMinus : faPlus} />
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10 bg-zinc-700 w-full p-2 mt-2 rounded-lg">
                      <div className="flex flex-col gap-2  ">
                        {project?.command?.flags?.map((flag) => {
                          const isActive = project.flags?.some(
                            (f) => f.label === flag.label
                          );

                          return (
                            <button
                              className={`flex items-center  p-2 px-4 rounded-lg hover:bg-indigo-500 transition-all shadow-lg ${
                                isActive ? "bg-indigo-600" : "bg-zinc-800"
                              }`}
                              onClick={() =>
                                dispatch({
                                  type: Actions.SET_FLAG,
                                  payload: flag,
                                })
                              }
                            >
                              <>
                                <div className="flex flex-col items-start w-full">
                                  <p className="text-white text-lg">
                                    {flag.label}
                                  </p>
                                  <p className="text-gray-300 text-sm">
                                    {flag.description}
                                  </p>
                                </div>

                                {isActive && (
                                  <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className=" p-2 rounded-full bg-indigo-500 text-white shadow-md"
                                  />
                                )}
                              </>
                            </button>
                          );
                        })}
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>

              <div className="mt-4 flex flex-col gap-4">
                {project?.flags?.map((flag) => (
                  <div className="flex flex-col bg-zinc-800 rounded-lg overflow-hidden">
                    <label
                      htmlFor={flag.label}
                      className="text-white bg-indigo-700 p-3 "
                    >
                      {flag.label}
                    </label>

                    {!flag.isCheckbox &&
                      flag?.values?.map((val) => (
                        <button
                          className="p-3 border-b-[1px] border-zinc-500 flex items-center last:border-b-0 hover:bg-indigo-500 transition-all"
                          onClick={() =>
                            dispatch({
                              type: Actions.UPDATE_FLAG,
                              payload: {
                                label: flag.label,
                                name: val.name,
                              },
                            })
                          }
                        >
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="mr-6 text-white"
                          />
                          <p className="text-white">{val.name}</p>
                        </button>
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
