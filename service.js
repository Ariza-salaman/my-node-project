import express from 'express'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

const app = express()
const userSessions = {}

app.use(cors())
app.use(bodyParser.json())

app.post('/storeUserInfo', (req, res) => {
  const userInfo = req.body
  const sessionId = uuidv4()
  userSessions[sessionId] = userInfo
  res.json({ session_id: sessionId })
})

app.get('/getUserInfo', (req, res) => {
  const sessionId = req.query.session_id
  const userInfo = userSessions[sessionId]
  res.json(userInfo)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
