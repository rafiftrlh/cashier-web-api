import express from "express"

const app = express()
const port = 3000

app.use(express.json())

app.route("/", (req, res) => {
  console.log("route /")
})

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})