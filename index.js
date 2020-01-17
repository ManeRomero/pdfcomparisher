const app = require('./app')

async function init() {
    await app.listen(3000)
    console.log('Comparador by MROMERO 2019')
}

init()