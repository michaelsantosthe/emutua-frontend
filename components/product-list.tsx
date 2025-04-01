"use client"

import type { Product } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between items-start">
              <span className="truncate">{product.name}</span>
              <span className="text-primary font-bold">{formatCurrency(product.price)}</span>
            </CardTitle>
            <div className="inline-block bg-primary/10 text-primary text-sm px-2 py-1 rounded-md">
              {product.category}
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-600 line-clamp-3">{product.description}</p>
            <div className="mt-2 text-sm">
              <span className="font-medium">Quantidade  :</span> {product.quantity}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
              <Edit className="h-4 w-4 mr-1" /> Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)}>
              <Trash2 className="h-4 w-4 mr-1" /> Deletar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

