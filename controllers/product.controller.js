import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAllProduct = async (req, res) => {
  try {
    const products = await prisma.products.findMany()

    res.status(200).json(products)
  } catch (error) {
    console.error("Error fetching products: ", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
