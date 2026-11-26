import axios from "axios";

interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  error: string;
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const response = error.response;

    if (!response) {
      return "Unable to connect to the server. Please try again.";
      
    }

    const message = response.data?.message;

    if (Array.isArray(message)) {
      return message.join(", ");
    }

    if (typeof message === "string") {
      return message;
    }

    return "Something went wrong. Please try again.";
  }

  return "An unexpected error occurred.";
}