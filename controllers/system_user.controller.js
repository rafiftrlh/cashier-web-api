import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

export const createStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    await prisma.system_Users.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      }
    });

    res.json({ msg: `Created a staff account with the name ${name} successfully` });
  } catch (error) {
    res.status(400).json({
      msg: `Failed to create a staff account`,
      err: error.message
    });
  }
};

export const softDeleteStaff = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await prisma.system_Users.findFirst({
      select: {
        name: true
      },
      where: {
        id: id
      }
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await prisma.system_Users.update({
      data: {
        deletedAt: new Date()
      },
      where: {
        id: id
      }
    });

    res.json({ msg: `Soft deleted a staff account with the name ${user.name} successfully` });
  } catch (error) {
    res.status(400).json({
      msg: `Failed to soft delete a staff account`,
      err: error.message
    });
  }
};

export const restoreStaff = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await prisma.system_Users.findFirst({
      select: {
        name: true,
        deletedAt: true
      },
      where: {
        id: id
      }
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.deletedAt) {
      return res.status(400).json({ msg: "User is not deleted" });
    }

    await prisma.system_Users.update({
      data: {
        deletedAt: null
      },
      where: {
        id: id
      }
    });

    res.json({ msg: `Restored a staff account with the name ${user.name} successfully` });
  } catch (error) {
    res.status(400).json({
      msg: `Failed to restore a staff account`,
      err: error.message
    });
  }
};
