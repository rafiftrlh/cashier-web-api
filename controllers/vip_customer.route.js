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

export const getVIPCustomer = async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.vip_Customers.findUnique({
      where: { id }
    })

    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    res.status(200).json(user)
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

export const updateVIPCustomer = async (req, res) => {
  try {
    const { id } = req.params
    const { name, phone, vipStatus } = req.body

    const existingUser = await prisma.vip_Customers.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" })
    }

    let updatedData = { name, phone, vipStatus }

    const updatedStaff = await prisma.vip_Customers.update({
      where: { id },
      data: updatedData,
    })

    res.status(200).json({
      msg: "Staff successfully updated",
      staff: updatedStaff,
    })
  } catch (error) {
    console.error(`Error updating vip account: ${error}`)
    res.status(500).json({
      msg: "Failed to update vip account",
      err: error.message,
    })
  }
}