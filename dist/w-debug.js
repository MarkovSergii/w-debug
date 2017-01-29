let that;
let wDebug = (params)=>{

    let express = require('express');
    let app = express();
    let server = require('http').Server(app);
    let io = require('socket.io')(server);
    let R = require('ramda');

    if (that) return that.debagFunction
    else
    {
        this.console = (params.console == false) ? false : true;
        this.clearOnReconect = (params.clearOnReconect == false) ? false : true;
        this.port = (params.port) ? params.port : 28888;

        if (this.console){
            let _log = global.console.log;

            global.console.log = (...args)=>{
                let data = {
                    type:'console.log',
                    date:new Date(),
                    msg:args
                };

                try{
                    sok.emit('logDebug', data);
                }
                catch(e){
                   
                }
                _log.apply(this,args)
            };
        }
        this.debagFunction = (key)=>{
            return (value)=>{
                let data = {
                    type:key,
                    date:new Date(),
                    msg:value
                };
                updateVariable(key,value);
                try{
                    sok.emit('logDebug', data);
                }
                catch(e){

                }
            }
        };

        app.use (express.static(__dirname+'/public'))

        app.get('/', function (req, res) {
            res.sendfile(__dirname + '/index.html');
        });

        let sok;
        io.on('connection', (socket) => {
            sok = socket;
            if (this.clearOnReconect) sok.emit('clear')
        });

        let variables = [];

        let createVariable = (name)=>{
            let variable = {
                name:name,
                values:['','',''],
                dates:['','','']
            };
            variables.push(variable)
        };

        let updateVariable = (variable,value)=>{
            let index1 = R.findIndex(R.propEq('name', variable))(variables);
            if (index1!= -1){
                variables[index1].values.unshift(value);
                variables[index1].values.length = 3;
                variables[index1].dates.unshift(new Date());
                variables[index1].dates.length = 3;
                try{
                    sok.emit('debugValue', variables);
                }
                catch(e){
                }
            }
            else{
                createVariable(variable);
                updateVariable(variable,value);
            }
        };

        server.listen(this.port);


        that = this;
        return that.debagFunction

    }
};

module.exports = wDebug;
