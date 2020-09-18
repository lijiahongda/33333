'use strict'
var proxyConfig = require('./proxyConfig')
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.
// console.log(proxyConfig);
const path = require('path')

module.exports = {
	dev: {
		// Paths
		env: require('./dev.env'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: proxyConfig.proxy,
		host: '0.0.0.0',
		port: 9091,
		autoOpenBrowser: true,
		errorOverlay: true,
		notifyOnErrors: false,
		poll: false,
		useEslint: true,
		showEslintErrorsInOverlay: false,
		/**
		 * Source Maps
		 */
		devtool: 'cheap-source-map',
		cssSourceMap: false
	},

	build: {
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		/**
		 * You can set by youself according to actual condition
		 * You will need to set this if you plan to deploy your site under a sub path,
		 * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
		 * then assetsPublicPath should be set to "/bar/".
		 * In most cases please use '/' !!!
		 */
		assetsPublicPath: './',
		/**
		 * Source Maps
		 */
		productionSourceMap: false,
		devtool: 'source-map',
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		bundleAnalyzerReport: process.env.npm_config_report || false,
		generateAnalyzerReport: process.env.npm_config_generate_report || false
	}
}
