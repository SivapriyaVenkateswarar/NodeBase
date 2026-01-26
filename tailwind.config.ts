import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate'; // plugin

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx,js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: { extend: {} },
  plugins: [
    tailwindAnimate, // <-- register plugin here
  ],
};

export default config;
