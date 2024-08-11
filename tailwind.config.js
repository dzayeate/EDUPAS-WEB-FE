/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#404040',
                    DEFAULT: '#404040',
                    dark: '#000000',
                },
                secondary: {
                    light: '#EA8389',
                    DEFAULT: '#EA8389',
                    dark: '#BF4B52',
                },
                // other custom colors
                customGreen: {
                    light: '#A7F3D0',
                    DEFAULT: '#10B981',
                    dark: '#065F46',
                },
                customBlue: {
                    light: '#3267E3',
                    DEFAULT: '#3267E3',
                    dark: '#065F46',
                },
                colorText: {
                    light: '#404040',
                    DEFAULT: '#404040',
                    dark: '#065F46',
                },
                colorPurple: {
                    light: '#4C4DDC',
                    DEFAULT: '#4C4DDC',
                    dark: '#3267E3',
                },
                colorBg: {
                    light: '#F0F3FF',
                    default: '#F0F3FF',
                },
                neutral70: {
                    default: '#757575',
                },
                neutral80: {
                    default: '#616161',
                },
                primarySurface: {
                    default: '#F5F5FF',
                },
                primaryBorder: {
                    default: '#E0E0F3',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                openSans: ['Lexend', 'sans-serif'],
            },
            boxShadow: {
                'form': '1px 2px 2px 0px rgba(0, 0, 0, 0.12)',
                'card': '0px 4px 10px 0px #00000026'
            }            
        },
    },
};
