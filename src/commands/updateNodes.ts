import { openAllConnections, execCommandAll, closeAllConnections } from '../util/ssh-wrapper'

const updateNodes = async () => {
    const conns = await openAllConnections()
    const updateCommand = 'make down && git pull && make up'
    await execCommandAll({ connections: conns, command: updateCommand })
}

export default updateNodes