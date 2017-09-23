module.exports = [    
    {
        header: 'Options',
        optionList: [
            {
                name: 'help',
                description: 'Display help',
                alias: 'h',
                defaultOption: true,
                type: Boolean
            },
            {
                name: 'create',
                description: 'Creates a new node at the given IP address with the given username and password, and an ethereum address',
                type: String,
                multiple: true,
                alias: 'c',
                typeLabel: 'ip username password address'
            },
            {
                name: 'audit',
                description: 'Checks if all nodes listed in src/resources/connections or file are healthy',
                type: String,
                alias: 'a',
                typeLabel: 'file'
            },
            {
                name: 'update',
                description: '[underline]{Only call this when a new update is pushed!} Updates all nodes in src/resources/connections or file',
                type: String,
                alias: 'u',
                typeLabel: 'file'
            },
        ]
    }
]