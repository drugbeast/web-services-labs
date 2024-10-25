const express = require('express')
const clubRouter = require('./routes/club.routes')

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())

app.use('/api', clubRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


