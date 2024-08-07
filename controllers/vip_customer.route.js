import { PrismaClient } from "@prisma/client"

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

export const createVIPCustomer = async (req, res) => {
  try {
    const { name, phone } = req.body

    const newUser = await prisma.vip_Customers.create({
      data: {
        name,
        phone
      }
    })

    res.status(201).json({ msg: `Created a vip account with the name ${name} successfully`, user: newUser })
  } catch (error) {
    res.status(400).json({
      msg: `Failed to create a vip account`,
      err: error.message
    })
  }
}