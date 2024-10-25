const API_URL = 'http://localhost:3000/api';

interface ApiError extends Error {
  status?: number;
  data?: any;
}

async function handleResponse(response: Response) {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.error || 'An error occurred') as ApiError;
    error.status = response.status;
    error.data = data;
    throw error;
  }
  
  return data;
}

interface RegisterData {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to register');
  }
}

export async function loginUser(data: LoginData) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to login');
  }
}

export async function requestPasswordReset(email: string) {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to request password reset');
  }
}

export async function resetPassword(token: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    
    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to reset password');
  }
}