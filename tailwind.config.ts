import AnimatePlugin from "tailwindcss-animate";
import { shadcnPlugin } from "./lib/shadcn-plugin";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  plugins: [AnimatePlugin, shadcnPlugin],
};

export default config;