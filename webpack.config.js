const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

function root(_path) {
  return path.join(__dirname, _path);
}

const baseConfig = {
  devtool: 'source-map',
	resolve: {
    extensions: ['.ts', '.js']
  },
	output: {
		filename: '[name].js',
    publicPath: ''
	},
  context: __dirname,
	module: {
		rules: [
			{
        test: /\.ts$/,
        loader: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular-router-loader'
        ]
      }
		]
	},
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      root('src'), {}
    )
  ]
};

const browserConfig = {
  entry: {
    main: './src/main.browser.ts'
  },
  target: 'web',
  output: {
		path: 'dist/browser'
  }
};

const serverConfig = {
  entry: {
    main: './src/main.server.ts'
  },
  target: 'node',
  output: {
		path: 'dist/server'
  },
  node: {
    global: true,
    crypto: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

module.exports = [
  webpackMerge({}, baseConfig, browserConfig),
  webpackMerge({}, baseConfig, serverConfig)
];
