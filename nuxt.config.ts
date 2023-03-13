// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxtjs/supabase'],
	tailwindcss: {
		config: {
			content: [],
			important: false,
			theme: {
				extend: {
					colors: {
						primary: '#0c0c0d',
						secondary: '#18181b',
						darkgray: '#121213',
						lightgray: '#27272a',
						white: '#e5e7eb',
					},
				},
			},
		},
	},
	typescript: {
		strict: true,
	},
})
