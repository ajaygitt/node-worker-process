const mathLogic = require('../mathLogic')

process.on('message', (a,b)=>{

    let sum = mathLogic.calculateSum(a,b)

    console.log("this is sum"+sum+" - and PID is"+process.pid)

    process.send(sum)
    
})