/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	content: [ './src/**/*.{js,jsx,ts,tsx}' ],
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--bb-border))',
				input: 'hsl(var(--bb-input))',
				ring: 'hsl(var(--bb-ring))',
				background: 'hsl(var(--bb-background))',
				foreground: 'hsl(var(--bb-foreground))',
				primary: {
					DEFAULT: 'hsl(var(--bb-primary))',
					foreground: 'hsl(var(--bb-primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--bb-secondary))',
					foreground: 'hsl(var(--bb-secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--bb-destructive))',
					foreground: 'hsl(var(--bb-destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--bb-muted))',
					foreground: 'hsl(var(--bb-muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--bb-accent))',
					foreground: 'hsl(var(--bb-accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--bb-popover))',
					foreground: 'hsl(var(--bb-popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--bb-card))',
					foreground: 'hsl(var(--bb-card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--bb-radius)',
				md: 'calc(var(--bb-radius) - 2px)',
				sm: 'calc(var(--bb-radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [ require( 'tailwindcss-animate' ) ],
	corePlugins: {
		preflight: false,
	},
};
