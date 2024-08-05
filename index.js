import express from "express"

const app = express()
const port = 3000

app.use(express.json())

app.get("/api", (req, res) => {
  res.send("test")
})

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})