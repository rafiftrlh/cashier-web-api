import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const getAllVIPCustomer = async (req, res) => {
  try {
    const users = await prisma.vip_Customers.findMany()

    res.status(200).json(users)
  } catch (error) {
    console.error("Error fetching users: ", error)
    res.status(500).json({
      msg: "Internal server error",
      err: error.message
    })
  }
}