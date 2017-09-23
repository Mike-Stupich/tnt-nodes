import updateNodes from './updateNodes'
import createNode from './createNewNode'
import checkNodes from './checkNodeHealth'
import help from './help'

const commandObj = { update: updateNodes, create: createNode, check: checkNodes, help }

const commandHandler = ([command, ...rest]) => {
    if (!commandObj[command]) {
        return null
    }
    const result = commandObj[command]
    return result(rest)
}

export default commandHandler