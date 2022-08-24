import menu from '@inquirer/select'
import input from '@inquirer/input'
import { run } from '../lib/run.js'

export default async function push() {
  const option = await menu({
    message: 'Push options:',
    choices: [
      {
        value: 'push',
        name: 'Auto-upload',
      },
      {
        value: 'set-url',
        name: 'Set url for automatic push',
      },
    ],
  })

  let command = 'git push origin main'

  if (option == 'set-url') {
    const branch = await input({
      message: 'Enter git branch: ',
      default: 'main',
    })
    command = `git push --set-upstream origin ${branch}`
  }
  run(command)
}
