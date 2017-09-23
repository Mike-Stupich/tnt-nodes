import { createNewConnection, openConnections, execCommand, closeConnections } from '../util/ssh-wrapper'

const createNode = async([ip, user, pass, addr]) => {
    const conns = await createNewConnection({ ip, user, pass })
    const createCommand = 'curl -sSL https://cdn.rawgit.com/chainpoint/chainpoint-node/13b0c1b5028c14776bf4459518755b2625ddba34/scripts/docker-install-ubuntu.sh | bash'
    
}

export default createNode