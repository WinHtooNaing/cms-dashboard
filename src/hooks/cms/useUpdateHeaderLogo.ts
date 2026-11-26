import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  updateHeaderLogo,
  type HeaderSection,
} from "@/service/cms/headerService"

import { HEADER_LOGO_QUERY_KEY } from "./useHeaderLogo"

type UpdateHeaderLogoVariables = {
  sectionId: string
  logoFile: File
}

export const useUpdateHeaderLogo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      sectionId,
      logoFile,
    }: UpdateHeaderLogoVariables) => updateHeaderLogo(sectionId, logoFile),

    onSuccess: (updatedSection: HeaderSection) => {
      queryClient.setQueryData(
        HEADER_LOGO_QUERY_KEY,
        updatedSection
      )

      queryClient.invalidateQueries({
        queryKey: HEADER_LOGO_QUERY_KEY,
      })

      toast.success("Website logo updated successfully!")
    },

    onError: (error) => {
      console.error("Update header logo error:", error)
      toast.error("Failed to update website logo.")
    },
  })
}