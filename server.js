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

// config
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))

// routes
app.use('/', router)

// server
app.listen(8000, host, err => {
    if (err) {
        console.log(chalk.red(err))
        return
    }
    console.log(chalk.green(`markdown server in listening at http://${host}:8000`))
    console.log(chalk.green(`you can preview current directory!`))
    open(`http://${host}:8000`)
})