

const headers = {
  'Content-Type': 'application/json',
};

// Common GET request function
export async function get<T>(url: string): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'GET',
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
}

export async function post<T>(url: string, data: unknown): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json(); 

  if (!response.ok) {
      throw {
      message: responseData?.error?.message || "Unknown error",
      code: responseData?.error?.code || "UNKNOWN_ERROR",
    };
  }

  return responseData; // Return the parsed response data
}

// Common PUT request function
export async function put<T>(url: string, data: unknown): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
}

// Common DELETE request function
export async function del<T>(url: string): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
}
