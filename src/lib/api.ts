// This is our central function for making authenticated API calls.

export async function apiClient(endpoint: string, method: string = 'GET', body: any = null) {
  const headers: HeadersInit = {};

  // Get the token from local storage
  const token = localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  // The browser automatically sets the correct Content-Type for FormData.
  // For JSON, we need to set it manually.
  if (body) {
    if (body instanceof FormData) {
      config.body = body;
    } else {
      headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(body);
    }
  }

  // Construct the full URL
  const fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(fullUrl, config);
    const data = await response.json();

    if (!response.ok) {
      // If the server returns an error, use its message
      throw new Error(data.message || 'An error occurred');
    }

    return data;

  } catch (error) {
    // Re-throw the error so the component can catch it
    throw error;
  }
}