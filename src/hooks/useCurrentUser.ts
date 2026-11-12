import { useQuery } from "@tanstack/react-query"
import { fetchCurrentUser } from "@/service/auth.service"

export const currentUserQueryKey = ["auth", "me"] as const

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: fetchCurrentUser,
    enabled: Boolean(
      localStorage.getItem("accessToken") || localStorage.getItem("refreshToken")
    ),
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: false,
  })
}
