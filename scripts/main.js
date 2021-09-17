'use strict';

const yargs = require('yargs');

yargs
    .option('assumeYes', {
        alias: ['y', 'yes'],
        desc: 'Automatic yes to prompts.',
        requiresArg: false,
        type: 'boolean'
    })
    .option('force', {
        alias: ['f'],
        desc: 'Force execution despite failing checks. Use with caution.',
        requiresArg: false,
        type: 'boolean'
    })
    .option('config', {
        alias: ['c'],
        desc:
            'Config file to use. ' +
            'Allows to re-use the framework for multiple lectures.',
        type: 'string',
        default: './config.json'
    })
    .commandDir('./commands')
    .demandCommand(1, 'You need specify a command.')
    .scriptName('cg')
    .locale('en')
    .help()
    .wrap(null)
    .argv;
