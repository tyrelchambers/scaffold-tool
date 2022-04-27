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
          { name: "vanilla" },
          { name: "vanilla-ts" },
          { name: "vue" },
          { name: "vue-ts" },
          { name: "react" },
          { name: "react-ts" },
          { name: "preact" },
          { name: "preact-ts" },
          { name: "lit" },
          { name: "lit-ts" },
          { name: "svelte" },
          { name: "svelte-ts" },
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
          { name: "architect" },
          { name: "cloudflare-pages" },
          { name: "cloudflare-workers" },
          { name: "express" },
          { name: "netlify" },
          { name: "vercel" },
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
