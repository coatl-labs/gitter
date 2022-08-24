#!/usr/bin/env node
import input from '@inquirer/input'
import menu from '@inquirer/select'
import confirm from '@inquirer/confirm'
import { exec } from 'node:child_process'

const type = await menu({
  message: 'Commit type:',
  choices: [
    {
      value: 'feat',
      name: 'feat:      A new feature',
    },
    {
      value: 'fix',
      name: 'fix:       A bug fix',
    },
    {
      value: 'docs',
      name: 'docs:      Documentation only changes',
    },
    {
      value: 'style',
      name: 'style:     Changes that do not affect the meaning of the code',
    },
    {
      value: 'refactor',
      name: 'refactor:  A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf:      A code change that improves performance',
    },
    {
      value: 'test',
      name: 'test:      Adding missing tests',
    },
    {
      value: 'chore',
      name: 'chore:     Changes to the build process or auxiliary tools',
    },
    {
      value: 'revert',
      name: 'revert:    Revert to a commit',
    },
    {
      value: 'init',
      name: 'init:      Initial commit',
    },
    {
      value: 'typo',
      name: 'typo:      A typo mistake',
    },
    {
      value: 'types',
      name: 'types:     Adding/updating types or interfaces',
    },
    {
      value: 'metadata',
      name: 'metadata:  Adding/updating metadata (package.json) (version, license, etc)',
    },
    {
      value: 'release',
      name: 'release:   Release commit',
    },
  ],
})

const scope = await input({ message: 'Scope:' })
const message = await input({ message: 'Commit message:' })

const _scope = scope || scope.length > 0 ? `(${scope})` : ''

const templates = {
  feat: (message, scope) => `feat${scope}: :sparkles: ${message}`,
  init: (message, scope) => `init${scope}: :tada: ${message}`,
  fix: (message, scope) => `fix${scope}: :bug: ${message}`,
  docs: (message, scope) => `docs${scope}: :pencil: ${message}`,
  style: (message, scope) => `style${scope}: :gem: ${message}`,
  refactor: (message, scope) => `refactor${scope}: :recycle: ${message}`,
  perf: (message, scope) => `perf${scope}: :zap: ${message}`,
  test: (message, scope) => `test${scope}: :test_tube: ${message}`,
  chore: (message, scope) => `chore${scope}: :wrench: ${message}`,
  revert: (message, scope) => `revert${scope}: :rewind: ${message}`,
  typo: (message, scope) => `typo${scope}: :pencil2: ${message}`,
  types: (message, scope) => `types${scope}: :label: ${message}`,
  metadata: (message, scope) => `metadata${scope}: :package: ${message}`,
  release: (message, scope) => `release${scope}: :rocket: ${message}`,
}

const commit = templates[type](message, _scope)

const confirmCommit = await confirm({
  message: `Are you sure you want to commit: "${commit}"`,
})

const currentPath = process.cwd()

if (confirmCommit) {
  exec(
    `git commit -m "${commit}"`,
    { cwd: currentPath },
    (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(stdout)
      console.log(stderr)
    }
  )
}
