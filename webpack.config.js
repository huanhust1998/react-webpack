const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [ //we now need to tell webpack to transpile js files using babel before bundling them.
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                        // here we have 2 presets @babel/preset-env for transpiling ES2015+ syntax and we have @babel/preset-react for transpiling react code.
                    }
                }
            },
            { //babel config for CSS file
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            { //babel config for images
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: ['file-loader'],
            },
            { //babel config for SVG as react component
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html")
        })
    ]
}