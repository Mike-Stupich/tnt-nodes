const getUsage = require('command-line-usage')
const options = require('../resources/helpOptions')

const help = () => {
    console.log(getUsage(options))
}

export default help