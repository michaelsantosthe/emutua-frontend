export interface Product {
    id: number
    name: string
    description: string
    price: number
    category: string
    quantity: number
    user_id?: string
    deleted_at?: string | null
  }
  
  export interface ProductFormData {
    name: string
    description: string
    price: number
    category: string
    quantity: number
  }
  
  export interface PaginatedResponse<T> {
    data: T[]
    meta: {
      current_page: number
      from: number
      last_page: number
      per_page: number
      to: number
      total: number
    }
  }
  
  export interface ValidationErrors {
    [key: string]: string[]
  }
  
  export interface ApiError {
    message: string
    validationErrors?: ValidationErrors
  }
  
  