const debug = require('../w-debug')({
    console:true,
    clearOnReconect: false,
    port:3012
});


let showDebug = (type,msg)=>
    debug(type)(msg);

let showLog = (...msg)=>
    console.log(...msg);

let i=0;
let j=0;
let k=0;
let l=0;

let o=0;
let p=0;


setInterval(()=>{
    let r = {name:"Joe",sellPrice:i}
    showDebug('test1',r)
    i++;    
},500);

setInterval(()=>{
    let q = [1,2,j]
    showDebug('test2',q);
    j++;
},400);

setInterval(()=>{
    let q = [1,2,j]
    showDebug('test8',q);
    j++;
},400);

setInterval(()=>{
    let q = [1,2,j]
    showDebug('test9',q);
    j++;
},400);

setInterval(()=>{
    let q = [1,2,j]
    showDebug('test10',q);
    j++;
},400);

setInterval(()=>{
    let q = [1,2,j]
    showDebug('test11',q);
    j++;
},400);

setInterval(()=>{
    let q = [1,2,j]
    showDebug('test12',q);
    j++;
},400);


setInterval(()=>{
    let q = [1,2,j]
    showDebug('hello',q);
    j++;
},800);

setInterval(()=>{
    showDebug('test3dtyyiytgityityityityityityityityityi',k)
    k++;
},3000);

setInterval(()=>{
    showLog('xx',o,'yy',p)
    o++;
},600);

setInterval(()=>{
    showLog(p)
    p++;
},200);

setTimeout(()=>{
    setInterval(()=>{
        showDebug('test888',l)
        l++;
    },200);

},5000)