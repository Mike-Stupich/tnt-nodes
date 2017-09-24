import * as ssh2 from 'ssh2'
import * as fs from 'fs'

const DEFAULT_FILE_PATH = './src/resources/myconns.json'

// Helper to read files
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

// Creates an SSH instance to a single node
export const createNewConnection = async ({ ip, user, pass }) => {
    const client = new ssh2.Client()
    client.connect({
            host: ip,
            username: user,
            password: pass
        })
    return client
}

// Returns array of open SSH connections to all ip's found in the filePath
export const openAllConnections = async(filePath?: string) => {
    let data
    if (filePath) {
        data = await readFile(filePath)
    } else {
        data = await readFile(DEFAULT_FILE_PATH)
    }
    const connections = JSON.parse(data).connections

    return connections.map(async (connection) => {
        const { ip, username, password } = connection
        return createNewConnection(connection)
    })
}

// Closes all ssh connections
export const closeAllConnections = async (connections) => {
    Promise.all(connections).then((allSSH) => {
        allSSH.map((connection) => {
            closeConnection(connection)
        })
    })
}

// Close an ssh connection
export const closeConnection = async (connection) => {
    connection.end()
}

// Executes a command on all connections
export const execCommandAll = async ({ connections, command }) => {
    Promise.all(connections).then((sshConns) => {
        sshConns.map((connection) => {
            execCommand({ connection, command })        
        })
    })
}

// Execute a command on a connection
export const execCommand = async ({ connection, command }) => {
    connection.on('ready', () => {    
        console.log('Client Ready')
        connection.exec(command, {pty:true}, (err, output) => {
            if (err) {
                throw err
            }
            output.on('close', (code, signal) => {
                console.log(`code ${code}, signal ${signal}`)
                connection.end()
            }).on('data', (data) => {
                console.log(data.toString())
            }).stderr.on('data', (data) => {
                console.log('STDERR', data.toString())
            })
        })
    })
}
