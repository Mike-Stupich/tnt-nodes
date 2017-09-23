import * as SSH from 'simple-ssh'
import * as fs from 'fs'

const DEFAULT_FILE_PATH = './src/resources/myconns.json'

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

// Returns array of open SSH connections to all ip's found in the filePath
export const openConnections = async(filePath?:string) => {
    let data
    if (filePath) {
        data = await readFile(filePath)
    } else {
        data = await readFile(DEFAULT_FILE_PATH)
    }
    const connections = JSON.parse(data).connections

    return connections.map(async (connection) => {
        createNewConnection(connection)
    })
}

export const createNewConnection = async (connInfo) => {
    const { ip, username, password } = connInfo
    return new SSH({
        host: ip,
        user: username,
        pass: password
    })
}

// Closes the connections to all open connections
export const closeConnections = async (connections) => {
    Promise.all(connections).then((allSSH) => {
        allSSH.map((connection) => {
            connection.end()
        })
    })
}

// Executes a command on all connections
export const execCommand = async ({ connections, command }) => {
    Promise.all(connections).then((sshConns) => {
        sshConns.map((connection) => {
            connection.exec((command), {
                in: command,
                out: console.log.bind(console)
            }).start()
        })
    })
}

export const listenFor = async ({ connections, event, callback }) => {
    Promise.all(connections).then((sshConns) => {
        sshConns.map((connection) => {
            connection.on(event, callback)
        })
    })
}

export default { createNewConnection, openConnections, execCommand, closeConnections }