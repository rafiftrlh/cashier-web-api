import express from "express"
import system_userRoute from "./routes/system_user.route.js"
import productRoute from "./routes/product.route.js"
import VIPCustomerRoute from "./routes/vip_customer.route.js"

const app = express()
const port = 3000

app.use(express.json())

app.use("/api/system-user", system_userRoute)
app.use("/api/products", productRoute)
app.use("/api/vip-customers", VIPCustomerRoute)

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})