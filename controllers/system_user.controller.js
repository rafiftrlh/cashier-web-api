import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()
const saltRounds = 10

export const getAllSystemUser = async (req, res) => {
  try {
    const users = await prisma.system_Users.findMany()

    res.status(200).json(users)
  } catch (error) {
    console.error("Error fetching products: ", error)
    res.status(500).json({
      msg: "Internal server error",
      err: error.message
    })
  }
}

export const getSystemUser = async (req, res) => {
  try {
    const { id } = req.body

    const user = await prisma.system_Users.findFirst({
      where: {
        id
      }
    })

    res.status(200).json(user)
  } catch (error) {
    console.error(`Error fetching products: ${error}`)
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

    await prisma.system_Users.create({
      data: {
        name,
        email,
        password: hashPassword,
        role,
      }
    })

    res.json({ msg: `Created a staff account with the name ${name} successfully` })
  } catch (error) {
    res.status(400).json({
      msg: `Failed to create a staff account`,
      err: error.message
    })
  }
}

export const softDeleteStaff = async (req, res) => {
  try {
    const { id } = req.body

    const user = await prisma.system_Users.findFirst({
      select: {
        name: true,
        role: true
      },
      where: {
        id
      }
    })

    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    if (user.role == "ADMIN") {
      return res.status(404).json({ msg: "User is admin" })
    }

    await prisma.system_Users.update({
      data: {
        deletedAt: new Date()
      },
      where: {
        id
      }
    })

    res.json({ msg: `Soft deleted a staff account with the name ${user.name} successfully` })
  } catch (error) {
    res.status(400).json({
      msg: `Failed to soft delete a staff account`,
      err: error.message
    })
  }
}

export const forceDeleteStaff = async (req, res) => {
  try {
    const { id } = req.body

    const user = await prisma.system_Users.findFirst({
      select: {
        name: true,
        role: true
      },
      where: {
        id
      }
    })

    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    if (user.role == "ADMIN") {
      return res.status(404).json({ msg: "User is admin" })
    }

    await prisma.system_Users.delete({
      where: {
        id
      }
    })

    res.json({ msg: `Force deleted a staff account with the name ${user.name} successfully` })
  } catch (error) {
    return res.status(400).json({
      msg: `Failed to force delete a staff account`,
      err: error.message
    })
  }
}

export const restoreStaff = async (req, res) => {
  try {
    const { id } = req.body

    const user = await prisma.system_Users.findFirst({
      select: {
        name: true,
        deletedAt: true
      },
      where: {
        id
      }
    })

    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    if (!user.deletedAt) {
      return res.status(400).json({ msg: "User is not deleted" })
    }

    await prisma.system_Users.update({
      data: {
        deletedAt: null
      },
      where: {
        id
      }
    })

    res.json({ msg: `Restored a staff account with the name ${user.name} successfully` })
  } catch (error) {
    res.status(400).json({
      msg: `Failed to restore a staff account`,
      err: error.message
    })
  }
}
