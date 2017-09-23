import { openConnections, execCommand, closeConnections } from '../util/ssh-wrapper'

const checkNode = async () => {
    const conns = await openConnections()
}

export default checkNode