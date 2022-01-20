const path = require("path");
//html处理插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/index.js",
    test: "./src/test.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "", //publicPath是生成的dist中的html文件中自动引入js和css文件时在最前面拼的一部分字符串
  },
  resolve: {
    //配置免后缀的文件类型
    extensions: [".js", ".jsx", ".vue", ".css", ".less", ".scss"],
    //为全路径配置缩写@
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        //配置babel-loader用来编译和解析js
        test: /\.js$/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
  plugins: [
    //html处理插件
    new HtmlWebpackPlugin({
      template: "./public/index.html", //html模版文件位置
      filename: "index.html", //生成的html文件名，生成的html文件路径会整合base中配置的path生成到目标位置
      chunks: ["index", "test"], //生成的index.html中自动引入的组件，这里设置的是entry中定义的key
    }),
  ],
};
