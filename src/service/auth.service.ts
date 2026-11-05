import api from "@/lib/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    roleId: number;
    isActive: boolean;
    role: "ADMIN" | "CUSTOMER";
  };

  accessToken: string;
  refreshToken: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  path: string;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    payload
  );

  return response.data.data;
};

export async function logoutUser() {
  const refreshToken = localStorage.getItem("refreshToken")

  if (!refreshToken) {
    throw new Error("Refresh token not found")
  }

  const response = await api.post(
    "/auth/logout",
    {
      refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  )

  return response
}
export function clearAuthStorage() {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("user")
}