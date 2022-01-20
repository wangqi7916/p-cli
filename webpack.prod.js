const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");
//清理dist文件夹的插件，用来在每次执行构建的时候清空上次构建的结果防止文件缓存
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//引入抽取css样式插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(base, {
  //定义环境为生产环境
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name]-[hash].js",
  },
  module: {
    // 执行顺序由后到前
    rules: [
      {
        //用来编译css代码
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "postcss-loader" },
        ],
      },
      {
        //用来编译sass代码
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    //配置样式抽取插件，生成的css文件名称为[name],[name]为entry中定义的key
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
});
