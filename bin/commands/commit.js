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
      emoji: ':tada:', // 🎉
      description: 'Initial commit',
      text,
    },
    {
      value: 'feat',
      emoji: ':sparkles:', // ✨
      description: 'Add a new feature',
      text,
    },
    {
      value: 'fix',
      emoji: ':bug:', // 🐛
      description: 'A bug fix in the code',
      text,
    },
    {
      value: 'refactor',
      emoji: ':recycle:', // ♻️
      description: 'A code change that neither fixes a bug nor adds a feature',
      text,
    },
    {
      value: 'docs',
      emoji: ':pencil:', // 📝
      description: 'Add or update the documentation',
      text,
    },
    {
      value: 'style',
      emoji: ':gem:', // 💎
      description: 'Changes that do not affect the meaning of the code',
      text,
    },
    {
      value: 'typo',
      emoji: ':pencil2:', // ✏️
      description: 'A typo mistake',
      text,
    },
    {
      value: 'test',
      emoji: ':test_tube:', // 🧪
      description: 'Add or update tests',
      text,
    },
    {
      value: 'perf',
      emoji: ':zap:', // ⚡
      description: 'A code change that improves performance',
      text,
    },
    {
      value: 'chore',
      emoji: ':wrench:', // 🔧
      description: 'Changes to the build process or auxiliary tools',
      text,
    },
    {
      value: 'revert',
      emoji: ':rewind:', // ⏪
      description: 'Revert to a commit or changes',
      text,
    },
    {
      value: 'types',
      emoji: ':label:', // 🏷️
      description: 'Adding/updating types or interface',
      text,
    },
    {
      value: 'meta',
      emoji: ':package:', // 📦
      description:
        'Adding/updating metadata (package.json) (version, license, etc)',
      text,
    },
    {
      value: 'release',
      emoji: ':rocket:', // 🚀
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
