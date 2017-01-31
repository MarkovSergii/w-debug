# w-debug
Simple tool for debuging and tracking changes in values

### Installation

```sh
$ npm install w-debug
```


### Usage

w-debug returns function and takes object with settings

Declaration
```
const debug = require('w-debug')(
    {
        console:true,
        clearOnReconect: false,
        port:3012,
        blackListEmit:['test1*']
    }
);
```

* *console* - if _true_ then messages from console.log will be sent to web view  (default:true)

* *clearOnReconect* - clear web view if socketIO reconnects (default:true)

* *port* - http port for web view (default:28888)

* *blackListEmit* - Array of variables or templates that will not be sent to the web view
(test1* - means that all words like (test1, test12, test156) are in the black list) (default:[])

then you can use it as:

```
debug('variableName')(variableValue);
```

At **http:127.0.0.1:28888** you can see:
* the three last values of variables
* stdout area
* convenient search with filters

###Screenshot
[![](http://image.prntscr.com/image/5b949efcbd174bf4848536965d0a0e51.png)](#)


###Authors
* Sergii Markov

### License
(The MIT License)

Copyright (c) 2017 Sergii Markov <markoff.sergii@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.