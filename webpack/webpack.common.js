const HTMLWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path'); //для того чтобы превратить отнсительный путь в абсолютный мы будем использовать пакет path
const webpack = require('webpack');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const production = process.env.NODE_ENV === 'production';

module.exports = {
	entry: path.resolve(__dirname, '..', './src/index.tsx'),
	output: {
		path: path.resolve(__dirname, '..', './dist'),
		filename: production
			? 'static/scripts/[name].[contenthash].js'
			: 'static/scripts/[name].js',
		publicPath: '/',
	},
	
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|gif|webp)$/,
				type: 'asset/resource',
				generator: {
					filename: 'static/images/[hash][ext][query]',
				},
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf)$/,
				type: 'asset/resource',
				generator: {
					filename: 'static/fonts/[hash][ext][query]',
				},
			},
			{
				test: /\.svg$/i,
				oneOf: [
					{
						resourceQuery: /react/,
						use: ['@svgr/webpack'],
					},
					{
						type: 'asset/resource',
						generator: {
							filename: 'static/images/[hash][ext][query]',
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					production ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: '[name]__[local]__[hash:base64:5]',
								auto: /\.module\.\w+$/i,
							},
							importLoaders: 1,
					},
					'postcss-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
		alias: {
			'@app': path.resolve(__dirname, '..', 'src/app'),
			'@pages': path.resolve(__dirname, '..', 'src/pages'),
			'@widgets': path.resolve(__dirname, '..', 'src/widgets'),
			'@features': path.resolve(__dirname, '..', 'src/features'),
			'@entities': path.resolve(__dirname, '..', 'src/entities'),
			'@shared': path.resolve(__dirname, '..', 'src/shared'),
		},
	},
	plugins: [
		new HTMLWebpackPlugins({
			template: path.resolve(__dirname, '..', './public/index.html'),
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: production
				? 'static/styles/[name].[contenthash].css'
				: 'static/styles/[name].css',
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development',
		}),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(process.env),
		}),
	],
};
