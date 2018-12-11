const path = require('path')
const fs = require('fs-extra')
const globby = require('globby')
const html2amp = require('html2amp')
// tried ampify (https://github.com/rkazakov/ampify), but it didn't work. This works, but not well.
// therefore decided to scrap this and either make my own html to amp converter or create individual
// amp pages (more likely)

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
  const config = {gaConfigPath, cwd: path.join(process.cwd(), publicPath), serviceWorker}
  const promises = htmls.map(async html => {
    const buffer = fs.readFileSync(html)
    const amp = await html2amp(buffer.toString(), config)
    if (dist) {
      const newFilePath = html.replace(path.join(process.cwd(), publicPath), path.join(process.cwd(), dist))
      fs.outputFileSync(newFilePath, amp)
    } else {
      fs.writeFileSync(html, amp)
    }
  })
  return Promise.all(promises)
}
