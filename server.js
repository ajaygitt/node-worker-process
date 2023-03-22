var express = require("express");
const cluster = require("cluster");
const totalCpus = require("os").cpus().length;
const PORT = 3000;
const fabObj = require("./mathLogic");

var app = express();
if (cluster.isMaster) {

  const worker1 = require('child_process').fork('./workers/worker1')
  const worker2 = require('child_process').fork('./workers/worker2')


worker1.on('message',(number)=>{
  console.log("at worker one"+number)
})

worker2.on('message',(number)=>{
  console.log("at worker TWo"+number)
})

  for (var i = 0; i < totalCpus; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(`Worker Id is ${worker.id} and PID is ${worker.process.pid}`);
  });
  cluster.on("exit", (worker) => {
    console.log(
      `Worker Id ${worker.id} and PID is ${worker.process.pid} is offline`
    );
    console.log("Let's fork new worker!");
    cluster.fork();
  });
} else {
  app.get("/test", async (req, res) => {
    console.log(
      `worker process id is : ${cluster?.worker?.process?.pid} is running the request`
    );
    //some heavy calculations

    let squareVal = req.query.number;

    squareVal = (await squareVal) * squareVal;

    res
      .status(200)
      .send(
        `Running on Process ${cluster?.worker?.process?.pid} and result is ${squareVal}  and it is master?=${cluster.isMaster}`
      );
  });
  app.listen(PORT, () => {
    console.log("Server started On PORT", PORT);
  });
}
