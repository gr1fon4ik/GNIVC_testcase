const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const Modes = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
};

module.exports = (env, { mode }) => {
  const isProduction = mode === Modes.PRODUCTION;

  return {
    mode,
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? "[name]-[contenthash].css" : "[name].css",
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)?$/,
          loader: "esbuild-loader",
          options: {
            loader: "tsx",
            target: "es2015",
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jp(e*)g|gif|webp|avif|webm)$/,
          use: ["file-loader"],
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: "url-loader",
          },
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.s?css$/,
          oneOf: [
            {
              test: /\.m\.s?css$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: "css-loader",
                  options: {
                    modules: {
                      localIdentName: `${isProduction ? "" : "[local]--"}[hash:base64:5]`,
                    },
                  },
                },
                "sass-loader",
              ],
            },
            {
              use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: [".ts", ".js", ".tsx", ".json", ".scss", ".css", ".m.scss", ".m.css"],
      modules: [path.resolve(__dirname, "./src"), "./node_modules"],

      alias: {
        "@root": path.resolve(__dirname, "./src"),
        "@api": path.resolve(__dirname, "./src/api"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@interfaces": path.resolve(__dirname, "./src/interfaces"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@reducers": path.resolve(__dirname, "./src/store/reducers"),
      },
    },

    performance: {
      maxEntrypointSize: Infinity,
      maxAssetSize: 1024 ** 2,
    },

    devtool: isProduction ? "source-map" : "inline-source-map",

    devServer: {
      host: "0.0.0.0",
      port: 3000,
      historyApiFallback: true,
    },
  };
};
