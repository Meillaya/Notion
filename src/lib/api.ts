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

export async function requestAuthCode(email: string) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to request auth code');
  }
}

export async function verifyAuthCode(email: string, code: string) {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to verify auth code');
  }
}

export async function createPage(token: string) {
  try {
    const response = await fetch(`${API_URL}/pages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create page');
  }
}

export async function updatePage(token: string, pageId: number, updates: { title?: string; content?: string }) {
  try {
    const response = await fetch(`${API_URL}/pages/${pageId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to update page');
  }
}

export async function getPages(token: string) {
  try {
    const response = await fetch(`${API_URL}/pages`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch pages');
  }
}

export async function getPage(token: string, pageId: number) {
  try {
    const response = await fetch(`${API_URL}/pages/${pageId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch page');
  }
}