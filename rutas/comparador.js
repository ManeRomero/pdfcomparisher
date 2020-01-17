const { Router } = require('express')
const router = Router()
const controller = require('../controllers')
const multerConfig = require('../config')
const fs = require('fs')

router.get('/', async (req, res) => {
    res.render('layouts/index', {
    })
})

router.post('/upload', multerConfig.array('pdfs', 10), async (req, res, next) => {
    let pdfs = await req.files
    let rutas = []

    for (let i = 0; i < pdfs.length; i++) {
        rutas.push(pdfs[i].filename)
    }

    req.session.pdfs = rutas
    req.flash('success_msg', 'subida de archivos ok')
    res.redirect('/next')
})

router.get('/next', async (req, res) => {
    const pdfs = req.session.pdfs

    res.render('layouts/result', {
        pdfs
    })
})

router.get('/uploads/:nombreDoc', (req, res) => {
    console.log(req.session.pdfs)
    let pdf = fs.readFileSync('uploads/' + req.session.pdfs[0])
    res.contentType("application/pdf");
    res.send(pdf)
})

module.exports = router