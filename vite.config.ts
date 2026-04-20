import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		root: path.resolve(__dirname),
		plugins: [
			react(),
			tsconfigPaths(),
			svgr(),
		],
		define: {
			'process.env.API_URL': JSON.stringify(env.API_URL),
			'process.env.NODE_ENV': JSON.stringify(mode),
		},
		build: {
			outDir: 'dist-vite',
			sourcemap: mode !== 'production',
			emptyOutDir: true,
		},
		server: {
			port: 5173,
			open: true,
		},
		css: {
			modules: {
				generateScopedName: '[name]__[local]__[hash:base64:5]',
			},
		},
	};
});
