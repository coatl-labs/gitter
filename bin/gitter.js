#!/usr/bin/env node
import menu from '@inquirer/select'
// commands
import init from './commands/init.js'
import add from './commands/add.js'
import commit from './commands/commit.js'
import push from './commands/push.js'
import clone from './commands/clone.js'

const option = await menu({
  message: 'What do you want to do?',
  choices: [
    { value: '0', name: '[init]:\tInitialize repository' },
    { value: '1', name: '[add]:\tAdd changes to git' },
    { value: '2', name: '[commit]:\tCommit changes to git' },
    { value: '3', name: '[push]:\tPush changes to git' },
    { value: '4', name: '[clone]:\tClone repository' },
  ],
})

function gitter() {
  if (option === '0') return init()
  if (option === '1') return add()
  if (option === '2') return commit()
  if (option === '3') return push()
  if (option === '4') return clone()
}
gitter()
