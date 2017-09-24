import { createNewConnection, closeConnection, openAllConnections, execCommand, closeAllConnections } from '../util/ssh-wrapper'

const createNode = async([ ip, user, pass ]) => {
    const conn = await createNewConnection({ ip, user, pass })
    const createCommand = `echo ${pass} | sudo -S apt install curl && curl -sSL https://cdn.rawgit.com/chainpoint/chainpoint-node/13b0c1b5028c14776bf4459518755b2625ddba34/scripts/docker-install-ubuntu.sh | bash`
    await execCommand({ connection: conn, command: createCommand })
    
    //await closeConnection(conn)
}

export default createNode