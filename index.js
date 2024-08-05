import express from "express"
import system_userRoute from "./routes/system_user.route.js"

const app = express()
const port = 3000

app.use(express.json())

app.use("/api", system_userRoute)

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})