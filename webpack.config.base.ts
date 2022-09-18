import { resolve } from 'path';
import { Configuration } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';

const config: Configuration = {
  entry: resolve(__dirname, 'src', 'main.ts'),
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'static/js/[name].[contenthash:8].js',
    assetModuleFilename: 'static/media/[name].[hash:8][ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  decorators: true,
                  dynamicImport: true,
                },
                target: 'es5',
              },
              minify: false,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10KB
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, 'tsconfig.json'),
        extensions: ['.ts', '.tsx', '.js', '.json'],
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public', 'index.html'),
      favicon: resolve(__dirname, 'public', 'favicon.svg'),
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: resolve(__dirname, 'tsconfig.json'),
      },
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx', 'js'],
    }),
    new StylelintPlugin({
      extensions: ['css'],
    }),
  ],
};

export default config;
