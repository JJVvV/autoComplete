var path = require('path');
var webpack = require('webpack');
console.log('**********webpack started *************');

module.exports = {
  //devtool: 'cheap-source-map',

  entry: {
   'App': [ './src/App'],
   // 'App': [ './src/App'],
    //'AdminApp': [ 'webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server', './src/AdminApp']
  },
  output: {
    path: path.join(__dirname, './public/js'), //运行webpack生成的文件存放目录
    filename: '[name].bundle.js',
    publicPath: '/static/',
    //chunkFilename: '[id].chunk.js'
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    //new webpack.optimize.CommonsChunkPlugin('common.js')
    new webpack.optimize.UglifyJsPlugin({ output: {comments: false} })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
      test: /\.jsx?$/,
      loader: 'react-hot',
      include: path.join(__dirname, 'src')
    },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        query:{
          optional: ['es7'],
          blacklist:["strict"]
        }
      }
    ]
  },
    debug:false
};
