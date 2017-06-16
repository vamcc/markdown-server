'use strict'

const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const showdown = require('showdown')
const chalk = require('chalk')

const converter = new showdown.Converter()
const currentPath = process.cwd()
const imgSuffixList = ['ico', 'jpg', 'jpeg', 'gif', 'png']

function listDirectory(req, res, filePath) {
    const title = '文件列表'
    fs.readdir(filePath, (err, fileList) => {
        if (err) {
            console.log(chalk.red(err))
            return
        }
        const list = fileList.map(file => {
            const stats = fs.statSync(path.join(filePath, file))
            let url = `/${file}`
            if (filePath !== currentPath) url = filePath.substr(currentPath.length) + url
            return {
                url: url,
                name: file,
                isDirectory: stats.isDirectory(),
                isMd: path.extname(file) === '.md'
            }
        })
        res.render('fileList', {
            title: title,
            list: list
        })
    })
}

function showText(req, res, filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(chalk.red(err))
            res.redirect('/')
            return
        }
        if (path.extname(filePath) === '.md') {
            res.render('markdown', {
                title: path.basename(filePath),
                data: converter.makeHtml(data)
            })
        } else {
            res.send(data)
        }
    })
}

function showImg(req, res, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(chalk.red(err))
            res.redirect('/')
            return
        }
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        res.end(data)
    })
}

function showFile(req, res, filePath) {
    const extname = path.extname(filePath).substr(1).toLowerCase()
    if (!~imgSuffixList.indexOf(extname)) {
        showText(req, res, filePath)
    } else {
        showImg(req, res, filePath)
    }
}

/* get */

router.get('/*', function(req, res) {
    const filename = req.params[0] || ''
    const filepath = path.join(currentPath, filename)
    let stats = null
    try {
        stats = fs.statSync(filepath)
    } catch (e) {
        console.log(chalk.red(e))
    }

    if (stats) {
        stats.isDirectory()
            ? listDirectory(req, res, filepath)
            : showFile(req, res, filepath)
    }
})

module.exports = router