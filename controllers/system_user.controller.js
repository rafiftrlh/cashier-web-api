import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()
const saltRounds = 10;

export const createStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const hashPassword = await bcrypt.hash(password, saltRounds)

    await prisma.system_Users.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      }
    })

    res.send("create staff success")
  } catch (error) {
    res.send("create data user invalid:" + error)
  }
}