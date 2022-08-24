import input from '@inquirer/input'
import { run } from '../lib/run.js'

export default async function clone() {
  const repo = await input({
    message: 'Enter repository: ex. (http://github...) / (user/repo): ',
    validate: text => text.includes('/'),
  })
  const folder = await input({ message: 'Enter folder name:' })
  let url, path
  if (repo.startsWith('http') && new URL(url).host) url = repo
  else url = `https://github.com/${repo}`
  folder > 0 ? (path = 0) : (path = folder.split('/').pop())
  const command = `git clone ${url} ${path}`
  run(command)
}
