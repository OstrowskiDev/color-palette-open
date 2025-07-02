export type SafeFetchResult = {
  success: boolean
  status: number
  message: string
}

export async function safeFetch(
  url: RequestInfo,
  options?: RequestInit,
): Promise<SafeFetchResult> {
  try {
    const res = await fetch(url, options)

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        message: `Error: unexpected error occurred during fetch request.`,
      }
    }

    const json = await res.json()

    if (json.success === false) {
      return {
        success: false,
        status: res.status,
        message: json.message,
      }
    }

    return {
      success: true,
      status: res.status,
      message: json.message,
    }
  } catch (error) {
    console.error('Error during fetch request:', error)
    return {
      success: false,
      status: 0,
      message: `Error: unexpected error occurred during fetch request.`,
    }
  }
}
