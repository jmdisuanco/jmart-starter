const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const JMartDev = require('./plugins/jmartdev')
const config = require('./jmart.config.json')
const path = require('path')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

module.exports = {
  entry: {
    bundle: ['./src/main.js'],
  },
   devServer: {
    contentBase: path.join(__dirname, 'public'),
    allowedHosts: [config.host],
    hot:true,
    host: '0.0.0.0',
    public:config.host,
    sockPath: 'hmr',
    compress: true,
    port: 9090
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        // use: {
        // 	loader: 'svelte-loader',
        // 	options: {
        // 		emitCss: true,
        // 		hotReload: true
        // 	}
        // }
        use: {
          loader: 'svelte-loader-hot',
          options: {
            emitCss: true,
            hotReload: true, // Default: false
            hotOptions: {
              noPreserveState: false, // Default: false
              optimistic: true, // Default: false
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new JMartDev(),
  ],
  devtool: prod ? false : 'source-map',
}
