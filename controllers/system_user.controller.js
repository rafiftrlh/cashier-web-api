import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()
const saltRounds = 10

export const getAllSystemUser = async (req, res) => {
  try {
    const users = await prisma.system_Users.findMany()

    res.status(200).json(users)
  } catch (error) {
    console.error("Error fetching users: ", error)
    res.status(500).json({
      msg: "Internal server error",
      err: error.message
    })
  }
}

export const getSystemUser = async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.system_Users.findUnique({
      where: { id }
    })

    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error(`Error fetching user: ${error}`)
    res.status(500).json({
      msg: "Internal server error",
      err: error.message
    })
  }
}

export const getAllStaff = async (req, res) => {
  try {
    const users = await prisma.system_Users.findMany({
      where: {
        role: {
          not: "ADMIN"
        }
      }
    })

    res.status(200).json(users)
  } catch (error) {
    console.error(`Error fetching user: ${error}`)
    res.status(500).json({
      msg: "Internal server error",
      err: error.message
    })
  }
}

export const createStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const hashPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await prisma.system_Users.create({
      data: {
        name,
        email,
        password: hashPassword,
        role,
      }
    })

    res.status(201).json({ msg: `Created a staff account with the name ${name} successfully`, user: newUser })
  } catch (error) {
    res.status(400).json({
      msg: `Failed to create a staff account`,
      err: error.message
    })
  }
}

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password, role } = req.body

    const existingUser = await prisma.system_Users.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" })
    }

    let updatedData = { name, email, role }
    if (password) {
      const hashPassword = await bcrypt.hash(password, saltRounds)
      updatedData.password = hashPassword
    }

    const updatedStaff = await prisma.system_Users.update({
      where: { id },
      data: updatedData,
    })

    res.status(200).json({
      msg: "Staff successfully updated",
      staff: updatedStaff,
    })
  } catch (error) {
    console.error(`Error updating staff: ${error}`)
    res.status(500).json({
      msg: "Failed to update staff",
      err: error.message,
    })
  }
}


export const softDeleteStaff = async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.system_Users.findUnique({
      where: { id },
      select: {
        name: true,
        role: true
      }
    })

    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    if (user.role === "ADMIN") {
      return res.status(403).json({ msg: "Cannot delete admin user" })
    }

    await prisma.system_Users.update({
      where: { id },
      data: { deletedAt: new Date() }
    })

    res.status(200).json({ msg: `Soft deleted a staff account with the name ${user.name} successfully` })
  } catch (error) {
    res.status(400).json({
      msg: `Failed to soft delete a staff account`,
      err: error.message
    })
  }
}

export const forceDeleteStaff = async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.system_Users.findUnique({
      where: { id },
      select: {
        name: true,
        role: true
      }
    })

    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    if (user.role === "ADMIN") {
      return res.status(403).json({ msg: "Cannot delete admin user" })
    }

    await prisma.system_Users.delete({
      where: { id }
    })

    res.status(200).json({ msg: `Force deleted a staff account with the name ${user.name} successfully` })
  } catch (error) {
    return res.status(400).json({
      msg: `Failed to force delete a staff account`,
      err: error.message
    })
  }
}

export const restoreStaff = async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.system_Users.findUnique({
      where: { id },
      select: {
        name: true,
        deletedAt: true
      }
    })

    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    if (!user.deletedAt) {
      return res.status(400).json({ msg: "User is not deleted" })
    }

    await prisma.system_Users.update({
      where: { id },
      data: { deletedAt: null }
    })

    res.status(200).json({ msg: `Restored a staff account with the name ${user.name} successfully` })
  } catch (error) {
    res.status(400).json({
      msg: `Failed to restore a staff account`,
      err: error.message
    })
  }
}
