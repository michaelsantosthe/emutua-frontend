"use client"

import type React from "react"
import { useState, useEffect } from "react"
import ProductList from "@/components/product-list"
import ProductForm from "@/components/product-form"
import { ConfirmDialog } from "@/components/confirm-dialog"
import type { Product } from "@/lib/types"
import { fetchProducts, deleteProduct } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Search, AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [notification, setNotification] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const loadProducts = async (page = 1) => {
    setLoading(true)
    try {
      const data = await fetchProducts(page)
      setProducts(data)
      setCurrentPage(page)
    } catch (error: any) {
      setNotification({
        type: "error",
        message: error.message || "Erro ao carregar os produtos",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

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
      setNotification({
        type: "success",
        message: "Produto deletado com sucesso",
      })
    } catch (error: any) {
      setNotification({
        type: "error",
        message: error.message || "Falha ao deletar o produto",
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
      {notification && (
        <div
          className={`mb-4 p-4 rounded-md flex items-center justify-between ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            {notification.message}
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Projeto Emutua</h1>
        <Button onClick={() => setIsFormOpen(true)} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Novo Produto
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Procurar produtos..."
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
              <p className="text-gray-500">Nenhum produto encontrado...</p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => loadProducts(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </Button>
            <span className="py-2">Page {currentPage}</span>
            <Button variant="outline" onClick={() => loadProducts(currentPage + 1)} disabled={products.length < 10}>
              Próximo
            </Button>
          </div>
        </>
      )}

      {isFormOpen && <ProductForm product={editingProduct} onClose={handleFormClose} onSubmit={handleFormSubmit} />}

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Deletar Produto"
        description="Você tem certeza que deseja deletar ? Essa ação não pode ser desfeita.."
        confirmText="Deletar"
        cancelText="Cancelar"
      />
    </main>
  )
}
