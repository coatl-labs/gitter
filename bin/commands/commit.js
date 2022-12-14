import menu from '@inquirer/select'
import input from '@inquirer/input'
import { run } from '../lib/run.js'

function text(msg, scope) {
  return `${this.value}${scope}: ${this.emoji} ${msg}`
}

export default async function commit() {
  const data = [
    {
      value: 'init',
      emoji: ':tada:', // ๐
      description: 'Initial commit',
      text,
    },
    {
      value: 'feat',
      emoji: ':sparkles:', // โจ
      description: 'Add a new feature',
      text,
    },
    {
      value: 'fix',
      emoji: ':bug:', // ๐
      description: 'A bug fix in the code',
      text,
    },
    {
      value: 'refactor',
      emoji: ':recycle:', // โป๏ธ
      description: 'A code change that neither fixes a bug nor adds a feature',
      text,
    },
    {
      value: 'docs',
      emoji: ':pencil:', // ๐
      description: 'Add or update the documentation',
      text,
    },
    {
      value: 'style',
      emoji: ':gem:', // ๐
      description: 'Changes that do not affect the meaning of the code',
      text,
    },
    {
      value: 'typo',
      emoji: ':pencil2:', // โ๏ธ
      description: 'A typo mistake',
      text,
    },
    {
      value: 'test',
      emoji: ':test_tube:', // ๐งช
      description: 'Add or update tests',
      text,
    },
    {
      value: 'perf',
      emoji: ':zap:', // โก
      description: 'A code change that improves performance',
      text,
    },
    {
      value: 'chore',
      emoji: ':wrench:', // ๐ง
      description: 'Changes to the build process or auxiliary tools',
      text,
    },
    {
      value: 'revert',
      emoji: ':rewind:', // โช
      description: 'Revert to a commit or changes',
      text,
    },
    {
      value: 'types',
      emoji: ':label:', // ๐ท๏ธ
      description: 'Adding/updating types or interface',
      text,
    },
    {
      value: 'meta',
      emoji: ':package:', // ๐ฆ
      description:
        'Adding/updating metadata (package.json) (version, license, etc)',
      text,
    },
    {
      value: 'release',
      emoji: ':rocket:', // ๐
      description: 'Release a new version or package',
      text,
    },
  ]

  const type = await menu({
    message: 'Commit type:',
    choices: data.map(i => ({
      value: i.value,
      name: `[${i.value}]:\t`.concat(i.description),
    })),
    pageSize: 6,
  })

  const msg = await input({
    message: 'Commit description:',
    validate: i => i.length >= 30,
  })
  const scopeStr = await input({ message: 'Scope of change' })
  const scope = scopeStr || scopeStr > 0 ? `(${scopeStr.toLowerCase()})` : ''
  const _commit = data.find(i => i.value === type).text(msg, scope)
  const command = `git commit -m "${_commit}"`
  run(command)
}
