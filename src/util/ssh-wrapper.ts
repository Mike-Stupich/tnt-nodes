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
export const createConnections = async(filePath?:string) => {
    let data
    if (filePath) {
        data = await readFile(filePath)
    } else {
        data = await readFile(DEFAULT_FILE_PATH)
    }
    const connections = JSON.parse(data).connections

    connections.map(async (connection) => {
        const { ip, username, password } = connection
        return new SSH({
            host: ip,
            user: username,
            pass: password
        })
    })
}

// Closes the connections to all open connections
export const closeConnections = async (connections) => {
    connections.map((connection) => {
        connection.end()
    })
}

// Executes a command on all connections
export const execCommand = async ({ connections, command }) => {
    connections.map((connection) => {
        connection.exec(command), {
            in: command,
            out: stdout => console.log(stdout)
        }
    })
}

export default { createConnections, execCommand, closeConnections }