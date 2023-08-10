import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteImageMin from 'vite-plugin-imagemin';

export default defineConfig({
	plugins: [
		react(),
		viteImageMin({
			gifsicle: {
				optimizationLevel: 3,
				interlaced: false,
			},
			optipng: {
				optimizationLevel: 7,
			},
			mozjpeg: {
				quality: 80,
			},
			pngquant: {
				quality: [0.8, 0.9],
				speed: 4,
			},
			svgo: {
				plugins: [
					{
						name: 'removeViewBox',
					},
					{
						name: 'removeEmptyAttrs',
						active: false,
					},
				],
			},
			webp: {
				quality: 80,
			},
		}),
	],
	server: {
		port: 3000,
	},
});
