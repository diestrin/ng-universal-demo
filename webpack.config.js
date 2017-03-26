module.exports = {
  devtool: 'source-map',
	entry: {
		main: './src/main.server.ts'
	},
	resolve: {
      extensions: ['.ts', '.js']
    },
	target: 'node',
	output: {
		path: 'dist',
		filename: '[name].js'
	},
	module: {
		rules: [
			{
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      }
		]
	}
}
