// lib/authClient.ts (Client-Side Auth)
import Cookies from 'js-cookie';

// Interface for login response
interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

// Function to login user and store token in cookies (client-side)
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }

    const data: LoginResponse = await response.json();

    // Store token in cookies (client-side)
    Cookies.set('auth_token', data.token, { expires: 1, path: '/', sameSite: 'Strict' });

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Login failed');
  }
}

// Function to get token from cookies (client-side)
export function getAuthToken(): string | null {
  return Cookies.get('auth_token') || null;
}

// Function to logout user (client-side)
export function logoutUser(): void {
  Cookies.remove('auth_token');
  window.location.href = '/login';
}