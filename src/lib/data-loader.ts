export async function loadPortfolioData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    console.error("API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL in your environment.");
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}/portfolio-data`);
    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch portfolio data:", error);
    return null;
  }
}
