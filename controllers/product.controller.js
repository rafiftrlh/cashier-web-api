import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany()

    res.status(200).json(products)
  } catch (error) {
    console.error(`Error fetching products: ${error}`)
    res.status(500).json({
      msg: "Internal server error",
      err: error
    })
  }
}

export const getAllProductsAvailable = async (req, res) => {
  try {
    const products = await prisma.products.findMany({
      where: {
        stock: {
          gt: 0
        }
      }
    })

    res.status(200).json(products)
  } catch (error) {
    console.error(`Error fetching products: ${error}`)
    res.status(500).json({
      msg: "Internal server error",
      err: error
    })
  }
}