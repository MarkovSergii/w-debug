let that;
let wDebug = (params)=>{

    let express = require('express');
    let app = express();
    let server = require('http').Server(app);
    let io = require('socket.io')(server);
    let R = require('ramda');
    let packege = require('../package.json')



    if (that) return that.debagFunction
    else
    {


        this.console = ((params.console) && (params.console == false)) ? false : true;
        this.clearOnReconect = ((params.clearOnReconect) && (params.clearOnReconect == false)) ? false : true;
        this.port = (params.port) ? params.port : 28888;


        let createRegEx = (value)=> {
            let val = value.replace(/\*/g, '.*?');
            return new RegExp('^' + val + '$')
        }

        this.blackListEmit = (params.blackListEmit) ? params.blackListEmit.map(createRegEx) : [];


        this.isInBlackList = (key) =>
        {
            let inList = false;
            this.blackListEmit.map((rule)=>{
                if (rule.test(key)) inList = true;
            });
            return inList
        };

        app.get('/getPort',(req,res)=>{
            res.send({port:this.port});
        });

        app.get('/getVariables',(req,res)=>{
            res.send({blackList:this.blackListEmit,variables:this.variables});
        });

        app.post('/setVariables',(req,res)=>{
            res.send('ok')
        });

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
                    if (!this.isInBlackList(key))
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
            sok.emit('version',packege.version)



        });

        this.variables = [];

        let createVariable = (name)=>{
            let variable = {
                name:name,
                values:['','',''],
                dates:['','','']
            };
            this.variables.push(variable)
        };



        let updateVariable = (variable,value)=>{
            if (!this.isInBlackList(variable)) {
                let index1 = R.findIndex(R.propEq('name', variable))(this.variables);
                if (index1 != -1) {
                    this.variables[index1].values.unshift(value);
                    this.variables[index1].values.length = 3;
                    this.variables[index1].dates.unshift(((new Date()).getTime() / 1000));
                    this.variables[index1].dates.length = 3;
                    try {
                        sok.emit('debugValue', this.variables);
                    }
                    catch (e) {
                    }
                }
                else {
                    createVariable(variable);
                    updateVariable(variable, value);
                }
            }
        };

        server.listen(this.port);

        that = this;
        return that.debagFunction
    }
};

module.exports = wDebug;
