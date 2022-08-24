import { exec } from 'node:child_process'

export const run = cmd =>
  exec(cmd, { cwd: process.cwd() }, (err, stdout, stderr) => {
    if (err) return console.error(err)
    if (stdout) return console.log(stdout)
    if (stderr) return console.log(stderr)
  })
