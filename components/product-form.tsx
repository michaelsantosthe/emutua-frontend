"use client"

import type React from "react"

import { useState } from "react"
import type { Product, ProductFormData } from "@/lib/types"
import { createProduct, updateProduct } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ErrorMessage } from "./error-message"

interface ProductFormProps {
  product: Product | null
  onClose: () => void
  onSubmit: () => void
}

export default function ProductForm({ product, onClose, onSubmit }: ProductFormProps) {
  const isEditing = !!product
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || "",
    quantity: product?.quantity || 0,
  })
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number.parseFloat(value) : value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    
    setStatusMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setStatusMessage(null)

    try {
      if (isEditing && product) {
        await updateProduct(product.id, formData)
        setStatusMessage({
          type: 'success',
          message: 'Produto Atualizado com sucesso'
        })
        setTimeout(() => {
          onSubmit()
        }, 1000)
      } else {
        await createProduct(formData)
        setStatusMessage({
          type: 'success',
          message: 'Produto criado com successo'
        })
        setTimeout(() => {
          onSubmit()
        }, 1000)
      }
    } catch (error: any) {
      if (error.validationErrors) {
        setErrors(error.validationErrors)
        setStatusMessage({
          type: 'error',
          message: 'Please check the form for errors'
        })
      } else {
        setStatusMessage({
          type: 'error',
          message: isEditing ? 'Falha ao atualizar o produto' : 'Falha ao criar o produto'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // Helper to display the first error message for a field
  const getErrorMessage = (field: string): string | null => {
    return errors[field] && errors[field].length > 0 ? errors[field][0] : null
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Produto" : "Adicionar novo produto"}</DialogTitle>
        </DialogHeader>

        {statusMessage && (
          <div className={`p-3 rounded-md ${
            statusMessage.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
          }`}>
            {statusMessage.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {getErrorMessage("name") && <ErrorMessage message={getErrorMessage("name")} />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={errors.description ? "border-red-500" : ""}
            />
            {getErrorMessage("description") && <ErrorMessage message={getErrorMessage("description")} />}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Valor</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? "border-red-500" : ""}
              />
              {getErrorMessage("price") && <ErrorMessage message={getErrorMessage("price")} />}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                className={errors.quantity ? "border-red-500" : ""}
              />
              {getErrorMessage("quantity") && <ErrorMessage message={getErrorMessage("quantity")} />}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? "border-red-500" : ""}
            />
            {getErrorMessage("category") && <ErrorMessage message={getErrorMessage("category")} />}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}