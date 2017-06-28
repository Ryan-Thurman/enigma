const Hapi = require('hapi');
const fs = require('fs')

const EncryptionServiceClass = require('./services/encryptionService.js')

let cryptoservices = new EncryptionServiceClass()

let server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: 3001,
    routes: {
        cors: true
    }
})

server.route({
    method: 'POST',
    path: "/encrypt",
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    handler: (req, reply) => {
        let data = JSON.parse(req.payload)
        // em = encrypted message fm = formattedData
        let em = cryptoservices.encrypt(data.message, data.passphrase)

        let fm = {
            name: data.name,
            message: em,
            date: data.date,
            passphrase: data.passphrase //terrible idea to store passwords without hashing, would normally have a hash and salt function etc
        }
        // grabbing sudo DB
        fs.readFile("./data.json", (err, data) => {
            let list = JSON.parse(data)
            list.push(fm)

            //writing to DB
            fs.writeFile("./data.json", JSON.stringify(list), (err, list) => {
                reply(em)
            })
        })
    }
})

server.route({
    method: 'POST',
    path: "/decrypt",
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    handler: (req, reply) => {
        let reqData = JSON.parse(req.payload)
        // dm = decrypted object fm = formattedData 
        let dm = {},
            fm = {}
        fs.readFile('./data.json', (err, data) => {
            let list = JSON.parse(data)
            //looping sudo DB
            list.forEach((obj) => {
                if (Object.values(obj).indexOf(reqData.message) !== -1) {
                    Object.assign(dm, obj)
                }
            })
            let check = cryptoservices.decrypt(dm.message, reqData.passphrase, dm.passphrase, dm.date)
            if (check) {
                fm = {
                    name: dm.name,
                    message: check,
                }
            } else {
                fm = {
                    name: 'N/A',
                    message: "Passphrase is incorrect or the message expiration date has expired"
                }
            }
            reply(fm)
        })
    }
})

server.start((err) => {
    if (err) {
        throw err
    }
    console.log(`Server running on ${server.info.uri}`)
})