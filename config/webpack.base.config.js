// Webpack
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Node 模块
const path = require('path');

// 变量
const isDevEnv = process.env.NODE_ENV === 'start';
const processEnv = require('./env.js');

// Less Colors
const colors = require('../src/styles/colors.js');

// 多文件配置
const multiplePageConfig = [
  {
    entry: 'login',
    path: './src/pages/login/main.js',
    title: 'login',
  },
  {
    entry: 'index',
    path: './src/pages/index/main.js',
    title: 'My Laboratory Index',
  },
  {
    entry: 'react',
    path: './src/pages/react/main.js',
    title: 'React Laboratory',
    favicon: `${ processEnv.STATIC_URL }/react-favicon.ico`,
  },
  {
    entry: 'vue',
    path: './src/pages/vue/main.js',
    title: 'Vue Laboratory',
    favicon: `${ processEnv.STATIC_URL }/vue-favicon.ico`,
  },
  {
    entry: 'solar-system',
    path: './src/pages/solar-system/main.js',
    title: 'Solar System',
  },
];

// chunks
const nodeModulesRegexp = '[\\\\/]node_modules[\\\\/]';
const reactModulesRegexp = 'react-?.*|@rematch\\\\/core|antd|ant-design|rc-?.*';
const vueModulesRegexp = '@?vue-?.*|ant-design-vue';
const commonsModulesRegexp = '(?!(' + reactModulesRegexp + '|' + vueModulesRegexp + '))';


const reactChunksTest = new RegExp(nodeModulesRegexp + '(' + reactModulesRegexp + ')$');
const vueChunksTest = new RegExp(nodeModulesRegexp + '(' + vueModulesRegexp + ')$');
const commonsChunksTest = new RegExp(nodeModulesRegexp + commonsModulesRegexp);


module.exports = {
  mode: isDevEnv ? 'development' : 'production',
  devtool: isDevEnv ? 'cheap-module-source-map' : false,
  entry: multiplePageConfig.reduce((entries, current) => {
    entries[current.entry] = current.path;
    return entries;
  }, {}),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: processEnv.PUBLIC_URL + '/',
    filename: 'scripts/[name].[hash:6].js',
    chunkFilename: 'scripts/[name].[hash:6].min.js',
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.tsx', '.ts', '.json' ],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@-react': path.resolve(__dirname, '../src/pages/react'),
      '@-vue': path.resolve(__dirname, '../src/pages/vue'),

      'vue$': isDevEnv ? 'vue/dist/vue.esm-bundler.js' : 'vue/dist/vue.runtime.esm-bundler.js',
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: new RegExp(nodeModulesRegexp),
        loader: 'eslint-loader',
        options: {
          // fix: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: new RegExp(nodeModulesRegexp),
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import'
          ]
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        exclude: new RegExp(nodeModulesRegexp),
        use: 'vue-loader',
      },
      {
        test: /\.(css|less)$/,
        use: [
          isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: colors,
                javascriptEnabled: true,
              },
              // localIdentName: '[name]__[local]--[hash:6]'
            }
          }
        ],
        // type: 'javascript/auto',
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'images/[name].[hash:6][ext][query]',
          esModule: false,
        },
        type: 'javascript/auto',
      },
      {
        test: /\.svg(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:6][ext][query]'
        },
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)\??.*$/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[hash:6].[ext][query]',
          esModule: false,
        },
        type: 'javascript/auto',
      },
    ],
  },
  optimization: {
    usedExports: true,
    sideEffects: false,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        // commons: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendors',
        //   chunks: 'all'
        // },
        commons: {
          // test: /[\\/]node_modules[\\/](?!(react-?.*|@rematch[\\/]core|antd|ant-design|rc-?.*|vue-?.*|ant-design-vue))/,
          test: commonsChunksTest,
          name: 'commons',
          chunks: 'all'
        },
        reactChunks: {
          // test: /[\\/]node_modules[\\/](react-?.*|@rematch[\\/]core|antd|ant-design|rc-?.*)$/,
          test: reactChunksTest,
          name: 'reactChunks',
          chunks: 'all'
        },
        vueChunks: {
          // test: /[\\/]node_modules[\\/](vue-?.*|ant-design-vue)$/,
          test: vueChunksTest,
          name: 'vueChunks',
          chunks: 'all'
        },
      }
    }
  },
  plugins: [
    // 赋值程序环境变量 ENVIRONMENT
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      ...Object.keys(processEnv).reduce((env, currentKey) => {
        env[currentKey] = JSON.stringify(processEnv[currentKey]);
        return env;
      }, {}),
    }),

    // HtmlWebpackPlugin 多页面配置
    ...multiplePageConfig.map(({ entry, path, ...restOptions }) => {
      return new HtmlWebpackPlugin({
        filename: entry + '.html',
        chunks: [ entry ],
        inject: true,
        template: 'index.template.html',
        ...restOptions
      });
    }),

    new VueLoaderPlugin(),

    // 提取css至独立文件
    new MiniCssExtractPlugin({
      filename: '[name].[hash:6].min.css',
      chunkFilename: '[name].[hash:6].min.css',
    }),

    // 压缩css
    new OptimizeCssAssetsPlugin(),
  ],
};