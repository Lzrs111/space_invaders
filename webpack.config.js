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
            loaders: [
                'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }
        
        ]

    },
    plugins: [HTMLWebpackPluginConfig]
}