import { createConnections, execCommand, closeConnections } from '../util/ssh-wrapper'

const updateNodes = () => {
    createConnections()
}

export default updateNodes