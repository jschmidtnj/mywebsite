const path = require('path')
const fs = require('fs-extra')
const globby = require('globby')
const ampify = require('ampify')

exports.onPostBuild = (_, pluginOptions) => {
  const defaultOptions = {
    files: ['**/*.html'],
    publicPath: 'public',
    gaConfigPath: null,
    dist: null,
    serviceWorker: null
  }
  const { files, publicPath, gaConfigPath, dist, serviceWorker } = { ...defaultOptions, ...pluginOptions }
  const absolutePaths = files.map(file => path.join(process.cwd(), publicPath, file))
  const htmls = globby.sync(absolutePaths)
  const config = { cwd: path.join(process.cwd(), publicPath) }
  const promises = htmls.map(async html => {
    const buffer = fs.readFileSync(html)
    const amp = await ampify(buffer.toString(), config)
    if (dist) {
      const newFilePath = html.replace(path.join(process.cwd(), publicPath), path.join(process.cwd(), dist))
      fs.outputFileSync(newFilePath, amp)
    } else {
      fs.writeFileSync(html, amp)
    }
  })
  return Promise.all(promises)
}
