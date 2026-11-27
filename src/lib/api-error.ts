import axios from "axios"

interface ApiErrorResponse {
  success: false
  statusCode: number
  message: string | string[]
  error: string
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const response = error.response

    // Network error
    if (!response) {
      return "Unable to connect to the server. Please try again."
    }

    const message = response.data?.message

    // Backend validation errors
    if (Array.isArray(message) && message.length > 0) {
      return message.join(", ")
    }

    // Backend error message
    if (typeof message === "string" && message.trim()) {
      return message
    }

    // Fallback messages based on HTTP status
    switch (response.status) {
      case 400:
        return "Invalid information. Please check your input."

      case 401:
        return "Invalid email or password, or your account may be inactive."

      case 403:
        return "You don't have permission to perform this action."

      case 404:
        return "The requested resource could not be found."

      case 409:
        return "This action conflicts with the current account state."

      case 429:
        return "Too many requests. Please try again later."

      case 500:
        return "Something went wrong on the server. Please try again later."

      default:
        return "Something went wrong. Please try again."
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return "An unexpected error occurred."
}