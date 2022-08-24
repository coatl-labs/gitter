import input from '@inquirer/input'
import { run } from '../lib/run.js'

export default async function add() {
  const files = await input({
    message: 'Files to add:',
    default: '.',
  })

  const command = `git add ${files}`
  run(command)
}
