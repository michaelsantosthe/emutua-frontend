import type { Product, ProductFormData } from "./types"
import { getAuthToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    if (response.status === 422) {
      const errorData = await response.json();
      throw { validationErrors: errorData.errors || {}, message: errorData.message || "Validation failed" };
    }

    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "An error occurred");
  }
  return response.json();
}

export async function fetchProducts(page = 1, limit = 10): Promise<Product[]> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse<Product[]>(response);
  } catch (error: any) {
    throw new Error(error.message || 'Falha ao buscar os produtos');
  }
}

export async function fetchProduct(id: number): Promise<Product> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse<Product>(response);
  } catch (error: any) {
    throw new Error(error.message || 'Falha ao buscar o produto');
  }
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return handleResponse<Product>(response);
  } catch (error: any) {
    throw new Error(error.message || 'Falha ao criar o produto');
  }
}

export async function updateProduct(id: number, data: Partial<ProductFormData>): Promise<Product> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return handleResponse<Product>(response);
  } catch (error: any) {
    throw new Error(error.message || 'Falha ao atualizar o produto');
  }
}

export async function deleteProduct(id: number): Promise<void> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return handleResponse<void>(response);
  } catch (error: any) {
    throw new Error(error.message || 'Falha ao deletar o produto');
  }
}
