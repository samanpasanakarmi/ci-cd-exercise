const express = require('express')
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 5001

app.use(express.static('dist'))

// ✅ Health check endpoint
app.get('/health', (req, res) => {
  res.send('ok')
})

// Optional: simple root route (useful for debugging)
app.get('/', (req, res) => {
  res.send('App is running')
})

const start = async () => {
  try {
    await app.listen(PORT)
    console.log(`server started on port ${PORT}`)
  } catch (error) {
    console.error('Error starting server:', error)
  }
}

start()