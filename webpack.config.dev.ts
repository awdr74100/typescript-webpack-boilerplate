import { resolve } from 'path';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import baseConfig from './webpack.config.base';

const devServer: DevServerConfiguration = {
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  compress: true,
  hot: true,
  open: true,
  port: 3000,
  static: {
    directory: resolve(__dirname, 'public'),
    publicPath: '/',
  },
};

const config = merge<Configuration>(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: resolve(__dirname, '.env.development'),
    }),
  ],
  devServer,
});

export default config;
