import { createConnections, execCommand, closeConnections } from '../util/ssh-wrapper'

const checkNode = () => {
    createConnections()
}

export default checkNode