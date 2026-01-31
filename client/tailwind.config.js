/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'matcha-soft': '#8FAF9A',
        'pistachio-light': '#CFE3D6',
        'azure-mist': '#7FB9BE',
        'indigo-dust': '#364A5A',
        'orchid-pastel': '#D48A96',
        'peach-cream': '#FFD8B8',
        'sunset-sorbet': '#E59A4F',
        'warm-beige': '#F5F0E8',
        'soft-cream': '#FDF8F3',
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
