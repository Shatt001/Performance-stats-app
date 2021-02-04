const path = require('path')
const express = require('express')
const proxy = require('http-proxy-middleware');
const app = express()
const publicPath = path.join(__dirname, '..', 'public')

app.use(express.static(publicPath))

app.use('/api', proxy({
  target: 'http://rest-service:3001',
  changeOrigin: true,
  pathRewrite: {'^/api' : ''}
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(3000, () => {
  console.log('Server is up on port: 3000!')
})