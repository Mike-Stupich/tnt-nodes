import { openAllConnections, execCommand, closeAllConnections } from '../util/ssh-wrapper'

const checkNode = async () => {
    const conns = await openAllConnections()
}

export default checkNode