### 1. Module not found: Error: Cannot resolve module 'net'
 - [Webpack#1529](https://github.com/request/request/issues/1529)
 - webpack.config.js 변경
  ~~~
  var path = require('path');

    module.exports = {
    entry: 'index',
    output: {
        path: path.join(__dirname, 'scripts'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    node: {
        console: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
    };
  ~~~

### 2. TypeError: global.XMLHttpRequest is not a constructor
 - 원인
    * typescript compiler에 의해서 소스를 transpile할때, node server를 target으로 transpile을 하지않음
 
 - 해결방법
    * [Webpack#1206](https://github.com/webpack/webpack/issues/1206)