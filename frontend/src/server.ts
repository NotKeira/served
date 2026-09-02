import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = resolve(fileURLToPath(import.meta.url), '..')

const server = createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  try {
    let filePath: string

    if (req.url === '/' || req.url === '') {
      filePath = resolve(__dirname, '../dist/index.html')
    } else if (req.url?.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8')
      filePath = resolve(__dirname, `../dist${req.url}`)
    } else if (req.url?.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      filePath = resolve(__dirname, `../dist${req.url}`)
    } else {
      filePath = resolve(__dirname, '../dist/index.html')
    }

    const content = await readFile(filePath, 'utf-8')
    res.statusCode = 200
    res.end(content)
  } catch (error) {
    res.statusCode = 404
    res.end('Not found')
  }
})

const port = parseInt(process.env.PORT || '9053')
const host = process.env.HOST || '0.0.0.0'

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`)
})
