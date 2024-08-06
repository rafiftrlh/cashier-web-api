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
      err: error.message
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
      err: error.message
    })
  }
}

export const addProduct = async (req, res) => {
  try {
    const { productCode, name, stock, price } = req.body

    const existingProduct = await prisma.products.findUnique({
      where: { productCode },
      select: {
        productCode: true,
        name: true,
        stock: true
      }
    })

    if (existingProduct) {
      // Jika produk dengan productCode yang sama ada tetapi namanya berbeda
      if (existingProduct.name !== name) {
        return res.status(409).json({
          msg: "Product code already exists with a different name",
          existingProduct: {
            productCode: existingProduct.productCode,
            name: existingProduct.name
          }
        })
      }

      // Jika produk dengan productCode yang sama dan namanya sama, tambahkan stok
      const updatedProduct = await prisma.products.update({
        where: { productCode },
        data: { stock: existingProduct.stock + stock }
      })

      return res.status(200).json({
        msg: "Stock successfully updated",
        product: updatedProduct
      })
    } else {
      // Jika produk belum ada, buat produk baru
      const newProduct = await prisma.products.create({
        data: {
          productCode,
          name,
          stock,
          price
        }
      })

      return res.status(201).json({
        msg: "Product successfully added",
        product: newProduct
      })
    }
  } catch (error) {
    console.error(`Error adding/updating product: ${error}`)
    res.status(500).json({
      msg: "Failed to add/update product",
      err: error.message
    })
  }
}