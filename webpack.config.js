var HTMLWebpackPlugin = require("html-webpack-plugin")
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + "/app/index.html",
    filename: "index.html",
    inject: "body"
});


module.exports = {
    entry: __dirname + "/app/index.js",
    output: {
        filename: 'working.js',
        path: __dirname + "/build"
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
              loader: 'image-webpack-loader',
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 4,
                },
                pngquant: {
                  quality: '75-90',
                  speed: 3,
                },
              },
            }],
            exclude: /node_modules/,
            include: __dirname,
          },        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }
        
        ]

    },
    plugins: [HTMLWebpackPluginConfig]
}