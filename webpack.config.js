const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');

module.exports =  env => {
    return {
        mode: 'development',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'main.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.less$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'less-loader' }
                    ]
                },
                {
                    test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
                    use: 'file-loader',
                }
            ]
        },
        plugins: [new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new Dotenv({
            path: `./environments/.env${env.file ? `.${env.file}` : ''}`
          })],
        devServer: {
            allowedHosts: 'all',
            historyApiFallback: true,
            port: 3000
        }
    }
}