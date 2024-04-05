/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
	],
	theme: {
		extend: {
			colors: {
				brand: {
					'primary': '#4e4a88',
				},
				victoria: {
					50: '#f4f5fa',
					100: '#e5e7f4',
					200: '#d1d5ec',
					300: '#b2bade',
					400: '#8d97cd',
					500: '#7177c0',
					600: '#5f60b1',
					700: '#5653a2',
					800: '#4e4a88',
					900: '#3f3d6b',
					950: '#2a2942',
				},
				'chelsea': {
					50: '#f3f8ed',
					100: '#e4efd8',
					200: '#cae1b5',
					300: '#a7ce88',
					400: '#88b962',
					500: '#72aa4a',
					600: '#507d33',
					700: '#3f602b',
					800: '#344e26',
					900: '#2f4324',
					950: '#16240f',
				},
			},
			fontFamily: {
				'lato': ['Lato', 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif'],
				'lato-bold': ['Lato Bold', 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif'],
				cabin: ['Cabin', 'sans-serif'],
				jost: ['Jost', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
				awesome: ['Font Awesome 6 Brands'],
			},
			rotate: {
				'360': '360deg',
			},
			fontSize: {
				'8px': '8px',
				'9px': '9px',
				'10px': '10px',
				'11px': '11px',
				'12px': '12px',
				'13px': '13px',
				'14px': '14px',
				'15px': '15px',
				'16px': '16px',
				'17px': '17px',
				'18px': '18px',
				'19px': '19px',
				'20px': '20px',
				'21px': '21px',
				'22px': '22px',
				'24px': '24px',
				'26px': '26px',
				'27px': '27px',
				'28px': '28px',
				'30px': '30px',
				'32px': '32px',
				'34px': '34px',
				'36px': '36px',
				'40px': '40px',
				'42px': '42px',
			},
			spacing: {
				'11px': '11px'
			},
			minHeight: {
				'50vh': '50vh'
			},
			height: {
				'600px': '600px',
			},
			lineHeight: {
				'0': '0',
				'1.6': '1.6',
			},
			letterSpacing: {
				'0.5px': '0.5px',
				'0.1px': '0.1px',
			},
			boxShadow: {
				'full': '0 0 6px 0 #ddd',
			}
		},
		container: {
			padding: '12px',
			center: true,
			screens: {
				sm: '100%',
				md: '100%',
				lg: '1100px', // You can adjust this value as needed
				xl: '1280px', // You can adjust this value as needed
				'2xl': '1350px', // You can adjust this value as needed
				'3xl': '1536px', // You can adjust this value as needed
			},
		},
	},
	variants: {},
	plugins: [
		require('tailwindcss'),
		require('precss'),
		require('autoprefixer'),
	],
};