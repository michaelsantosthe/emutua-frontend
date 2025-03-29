"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ProductList from "@/components/product-list"
import ProductForm from "@/components/product-form"
import { ConfirmDialog } from "@/components/confirm-dialog"
import type { Product } from "@/lib/types"
import { fetchProducts, deleteProduct } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Search } from "lucide-react"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const { toast } = useToast()

  const loadProducts = async (page = 1) => {
    setLoading(true)
    try {
      const data = await fetchProducts(page)
      setProducts(data)
      setCurrentPage(page)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load products",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const confirmDelete = (id: number) => {
    setProductToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const handleDelete = async () => {
    if (!productToDelete) return

    try {
      await deleteProduct(productToDelete)
      setProducts(products.filter((product) => product.id !== productToDelete))
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      })
    } finally {
      setDeleteConfirmOpen(false)
      setProductToDelete(null)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  const handleFormSubmit = () => {
    loadProducts(currentPage)
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Product Management</h1>
        <Button onClick={() => setIsFormOpen(true)} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search products by name, description or category..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <ProductList products={filteredProducts} onEdit={handleEdit} onDelete={confirmDelete} />

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-10">
              <p className="text-gray-500">No products found</p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => loadProducts(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="py-2">Page {currentPage}</span>
            <Button variant="outline" onClick={() => loadProducts(currentPage + 1)} disabled={products.length < 10}>
              Next
            </Button>
          </div>
        </>
      )}

      {isFormOpen && <ProductForm product={editingProduct} onClose={handleFormClose} onSubmit={handleFormSubmit} />}

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </main>
  )
}

