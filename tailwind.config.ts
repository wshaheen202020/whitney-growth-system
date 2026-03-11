import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        whitney: {
          navy: '#0a1628',
          blue: '#1e3a5f',
          gold: '#c9a84c',
          light: '#f4f1eb',
          accent: '#2563eb',
        }
      }
    },
  },
  plugins: [],
}
export default config
