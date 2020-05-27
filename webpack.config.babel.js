import { resolve } from 'path'
import webpack, {
  DefinePlugin,
  EnvironmentPlugin,
  IgnorePlugin,
  optimize
} from 'webpack'
import StylelintPlugin from 'stylelint-webpack-plugin'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import pkg from './package.json'
import WXAppComponentPlugin, {
  Targets
} from './webpack-plugin/wxapp-components-plugin/index'


const { NODE_ENV, LINT } = process.env
const isDev = NODE_ENV !== 'production'
const shouldLint = !!LINT && LINT !== 'false'
const srcDir = resolve('src')

const copyPatterns = []
  .concat(pkg.copyWebpack || [])
  .map((pattern) =>
    typeof pattern === 'string' ? { from: pattern, to: pattern } : pattern
  )

export default (env = {}) => {
  const min = env.min
  const target = env.target || 'Wechat'
  const isWechat = true

  const relativeFileLoader = (ext = '[ext]') => {
    const namePrefix = isWechat ? '' : '[path]'
    return {
      loader: 'file-loader',
      options: {
        useRelativePath: true,
        name: `${namePrefix}[name].${ext}`,
        context: srcDir
      }
    }
  };

  return {
    entry: {
      app: [
        // add promise polyfill into wechat mini program
        // 	`es6-promise/dist/es6-promise.auto${isDev ? ".min" : ""}.js`,

        './src/app.ts'
      ].filter(Boolean)
    },
    output: {
      filename: '[name].js',
      publicPath: '/',
      path: resolve('dist')
    },
    target: (compiler) => compiler.apply(new webpack.LoaderTargetPlugin(env.target || 'Wechat')),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: /src/,
          exclude: /node_modules/,
          use: ['ts-loader'].filter(Boolean)
        },
        {
          test: /\.(js)$/,
          include: /src/,
          exclude: /node_modules/,
          use: ['babel-loader', shouldLint && 'eslint-loader', 'source-map-loader'].filter(Boolean)
        },
        {
          test: /\.wxs$/,
          include: /src/,
          exclude: /node_modules/,
          use: [
            relativeFileLoader(),
            'babel-loader',
            shouldLint && 'eslint-loader'
          ].filter(Boolean)
        },
        {
          test: /\.(less|wxss|acss)$/,
          include: /src/,
          use: [
            relativeFileLoader(),
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                javascriptEnabled: true
              }
            },
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          include: /src/,
          use: [
            relativeFileLoader()
          ]
        },

        {
          test: /\.json$/,
          use: [
            relativeFileLoader()
          ]
        },
        {
          test: /\.json$/,
          type: 'javascript/auto',
          include: /src/,
          loader: resolve('webpack-plugin/json-loader.js')
					
        },
        {
          test: /\.(wxml)$/,
          include: /src/,
          use: [
            relativeFileLoader(isWechat ? 'wxml' : 'axml'),
            {
              loader: 'wxml-loader',
              options: {
                root: srcDir,
                enforceRelativePath: true
              }
            }
          ]
        },
        {
          test: /\.(wxml)$/,
          include: /src\/pages/,
          use: [
            {
              loader: resolve('webpack-plugin/add-xml-loader.js'),
              options: {
                xml: '<global-component id="globalComponent"/>',
              },
            },
          ],
        },
        {
          test: /\.(wxml)$/,
          include: /src/,
          use: [
            {
              loader: resolve('webpack-plugin/page-skeleton-loader.js'),
              options: {
              },
            },
          ],
        }
      ]
    },
    plugins: [
      new EnvironmentPlugin({
        NODE_ENV: 'development'
      }),
      new DefinePlugin({
        __DEV__: isDev,
        __WECHAT__: isWechat,
        wx: isWechat ? 'wx' : 'my',
        my: isWechat ? 'wx' : 'my'
      }),
      new WXAppComponentPlugin({
        clear: !isDev
      }),
      // new WXAppWebpackPlugin({
      // 	clear: !isDev
      // }),
      new optimize.ModuleConcatenationPlugin(),
      new IgnorePlugin(/vertx/),
      shouldLint && new StylelintPlugin(),
      min && new MinifyPlugin(),
      new CopyPlugin(copyPatterns, { context: srcDir })
      // new ImageminPlugin({
      // 	disable: process.env.NODE_ENV !== "production",
      // 	pngquant: {
      // 		quality: "95-100"
      // 	}
      // })
    ].filter(Boolean),
    devtool: isDev ? 'source-map' : false,
    resolve: {
      extensions: ['.wxml','.ts', 'wxss', 'less', '.json', '.webpack.js', '.web.js', '.js'],
      alias: {
        '@': resolve('src')
      },
      modules: [resolve(__dirname, 'src'), 'node_modules']
    },
    watchOptions: {
      poll: 1000, // 监测修改的时间(ms)
      ignored: /dist|node_modules/,
      aggregateTimeout: 300
    }
  }
};
