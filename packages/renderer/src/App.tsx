import { Actions, projectReducer } from "./reducers/projectReducer";
import { faCircle, faFolder } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useReducer } from "react";

import { CreateHandler } from "./types";
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
    const file = await window.ipcRenderer.openDialog();
    // setProject({ ...project, path: file[0] });
  };

  const createHandler = async (project: CreateHandler | null) => {
    if (!project) return;

    const fullCmd = await getFullExec(project);

    window.ipcRenderer.createProject(project.path, fullCmd);
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

      {console.log(project)}

      {command && (
        <div className="p-4 rounded-lg bg-zinc-800 mt-8 w-fit">
          <p className="text-zinc-200 text-lg">
            <span className="mr-4 select-none text-indigo-300">$</span>{" "}
            {project?.command?.command} {project?.name} --{" "}
            {project?.flags
              ?.map(
                (flag) => `${Object.keys(flag)[0]} ${Object.values(flag)[0]}`
              )
              .join(" ")}
          </p>
        </div>
      )}

      <main className="flex max-w-screen-xl gap-20">
        <section className="mt-10 border-2 border-zinc-800 p-4 rounded-lg h-fit">
          <div className="grid grid-cols-2  w-full">
            {commands.map((cmd) => (
              <button
                className={`bg-zinc-800 rounded-lg p-4 flex gap-6 hover:bg-zinc-700 transition-all`}
                onClick={() => setCommand(cmd)}
              >
                <img src={cmd.logo} alt="" className="h-10" />
                <div className="flex flex-col items-start">
                  <p className={`text-lg text-zinc-200`}>{cmd.name}</p>
                  <p className="text-sm text-zinc-400">
                    <span className={`mr-2 select-none`}>$</span>
                    {cmd.command}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {project?.command && (
          <div className="flex flex-col w-full max-w-lg">
            <section className="mt-10">
              <h2 className="text-zinc-200 text-lg">
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
              <h2 className="text-zinc-200 text-lg">
                Choose your <span className="font-bold">flags</span>
              </h2>
              <div className="flex gap-4 mt-4">
                {project?.command?.flags?.map((flag) => (
                  <div
                    className="border-2 border-zinc-700 rounded-lg"
                    key={flag.label}
                  >
                    <header className="bg-zinc-700 p-4 ">
                      <p className="text-zinc-100">{flag.label}</p>
                    </header>
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
                          className="w-fit p-2 px-4 rounded-full text-zinc-200 bg-zinc-800 hover:bg-indigo-700 transition-all text-sm"
                        >
                          {val}
                        </button>
                      ))}
                    </div>
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
                className="bg-green-400 text-zinc-800 p-2 text-sm rounded-lg"
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
