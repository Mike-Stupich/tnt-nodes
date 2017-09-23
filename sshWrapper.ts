import SSH from 'simple-ssh'
import * as fs from 'fs'

const DEFAULT_FILE_PATH = './resources/'

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
    //let 
    if (filePath) {
       // fs.readFile(FilePath)
    }
}