import { Command } from "@/types";

const commands: Command[] = [
  {
    name: "Vite",
    command: "npm create vite@latest",
    logo: "./images/vite.svg",
    flags: [
      {
        label: "--template",
        values: [
          "vanilla",
          "vanilla-ts",
          "vue",
          "vue-ts",
          "react",
          "react-ts",
          "preact",
          "preact-ts",
          "lit",
          "lit-ts",
          "svelte",
          "svelte-ts",
        ],
      },
    ],
  },
];

export default commands;
