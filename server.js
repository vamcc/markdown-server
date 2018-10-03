#!/usr/bin/env node

"use strict"

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const chalk = require('chalk')
const open = require('open')
const router = require('./routes')
const host = require('./helpers/getLocalIPAddress')

const app = express()
const port = process.argv[2] || 8000

// config
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))

// 允许跨域
app.use('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

// routes
app.use('/', router)

// server
app.listen(port, '0.0.0.0', err => {
    if (err) {
        console.log(chalk.red(err))
        return
    }
    console.log(chalk.green(`markdown server in listening at http://${host}:${port}`))
    console.log(chalk.green(`you can preview current directory!`))
    open(`http://${host}:${port}`)
})