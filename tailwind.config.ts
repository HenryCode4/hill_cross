import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		screens: {
			fold: { min: '279px', max: '321px' },
			zfold: { min: '344px', max: '358px' },
			s8: { min: '359px', max: '388px' },
			pro: { min: '389px', max: '420px' },
			se: { min: '375px', max: '389px' },
			proMax: { min: '430px', max: '529px' },
			xr: { min: '414px', max: '420px' },
			iho: { min: '410px', max: '529px' },
			surface: { min: '530px', max: '559px' },
			surface7: { min: '900px', max: '1000px' },
			ipad: { min: '550px', max: '768px' },
			nest: { raw: '(height: 600px)' },
			800: { raw: '(min-height: 800px)' },
			900: { raw: '(height: 900px)' },
			1366: { raw: '(height: 1366px)' },
			ipadAir: { min: '810px', max: '830px' },
			zenbookFold: { min: '831px', max: '899px' },
			nestHub: { min: '1024px', max: '1199px' },
			ipadPro: { min: '1024px', max: '1100px' },
			nestMax: { min: '1200px', max: '1300px' },
			pad: { min: '820px', max: '1024px' },
			padlg: { min: '1024px', max: '1050px' },
			'2xl': '1440px',
			'2.5xl': { min: '1600px', max: '1800px' },
			'3xl': '1800px',
			'4k': { raw: '(min-width: 2560px)' },
			xxs: { min: '322px', max: '374px' },
			xs: { min: '322px', max: '424px' },
		  },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
