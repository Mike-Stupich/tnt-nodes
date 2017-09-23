import commandHandler from './src/commands'

const start = async () => {
    const args = process.argv.slice(2)
    commandHandler(args)
}

start()