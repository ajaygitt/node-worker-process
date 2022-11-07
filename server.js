var express= require ("express")
const cluster = require('cluster')
const totalCpus= require('os').cpus().length;

if ( cluster.isMaster)
{
    console.log("in master")
}