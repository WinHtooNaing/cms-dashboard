import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  getMyProfile,
  updateMyProfile,
} from "@/service/profile.service"

import type {
  UpdateProfilePayload,
} from "@/service/profile.service"

export const profileQueryKey = ["profile", "me"]


export function useProfile() {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000,
  })
}


export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      updateMyProfile(payload),

    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(
        profileQueryKey,
        updatedProfile
      )
    },
  })
}