const getUsage = require('command-line-usage')
const options = require('../resources/helpOptions')
//const helpOptions = require('../resources/helpOptions')

const help = () => {
    const usage = getUsage(options)
    console.log(usage)
}

export default help