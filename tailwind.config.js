/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366f1', // Indigo 500
                    dark: '#4f46e5',
                    light: '#e0e7ff',
                },
                'bg-app': '#f5f7fa',
                'bg-surface': '#ffffff',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
