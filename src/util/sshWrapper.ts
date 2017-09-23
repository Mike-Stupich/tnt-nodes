import SSH from 'simple-ssh'
import * as fs from 'fs'

const DEFAULT_FILE_PATH = '../resources/myconns.json'

const readFile = (filePath:string) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', ((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve (data)
            }
        }))
    })
}

const createConnections = (filePath?:string) => {
    let connections
    if (filePath) {
       connections = readFile(filePath)
    } else {
        connections = DEFAULT_FILE_PATH
    }
    console.log(connections)
}

export default createConnections