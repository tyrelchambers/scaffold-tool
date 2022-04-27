import { Command } from "@/types";

const commands: Command[] = [
  {
    name: "Vite",
    command: "npm create vite@latest --",
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
  {
    name: "Remix",
    command: "npx create-remix@latest",
    logo: "./images/remix.svg",
    flags: [
      {
        label: "--template",
        description: "Pick from a list of templates",
        values: [
          "architect",
          "cloudflare-pages",
          "cloudflare-workers",
          "express",
          "netlify",
          "vercel",
        ],
      },
      {
        label: "--install",
        description: "Install dependencies (this can be done manually after)?",
        isCheckbox: true,
        values: [
          {
            name: "installDeps",
            label: "Install dependencies",
          },
        ],
      },
    ],
  },
];

export default commands;
