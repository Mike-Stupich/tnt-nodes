import { openConnections, execCommand, closeConnections } from '../util/ssh-wrapper'

const updateNodes = async () => {
    const conns = await openConnections()
    const updateCommand = 'make down && git pull && make up'
    await execCommand({ connections: conns, command: updateCommand })
}

export default updateNodes