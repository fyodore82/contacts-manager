const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = ({ config }) => {
  config.module.rules.push({
			test: /\.(ts|tsx)$/,
			loader: require.resolve('ts-loader'),
			options: { 
				transpileOnly: true 
			},
		}
	);
  config.resolve.extensions.push('.ts', '.tsx');
  config.plugins.push(new ForkTsCheckerWebpackPlugin());
  return config;
};