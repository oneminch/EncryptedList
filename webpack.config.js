const path = require('path');

module.exports = {
	mode: 'development',
   entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve('./dist')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["babel-preset-env"]
				}
			}
		}]
	}
};
