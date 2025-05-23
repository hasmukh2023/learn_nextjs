const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.access);
    return data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

export default refreshAccessToken;