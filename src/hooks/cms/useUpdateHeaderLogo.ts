import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  updateHeaderLogo,
  type HeaderSection,
} from "@/service/cms/headerService"

import { HEADER_LOGO_QUERY_KEY } from "./useHeaderLogo"
import { SITE_LOGO_QUERY_KEY } from "./useSiteSettings"

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
      // Update header section cache
      queryClient.setQueryData(
        HEADER_LOGO_QUERY_KEY,
        updatedSection
      )

      // Update public site logo cache
      queryClient.setQueryData(SITE_LOGO_QUERY_KEY, {
        imageUrl: updatedSection.imageUrl,
        alt: String(updatedSection.content.alt ?? "Company Logo"),
      })

      toast.success("Website logo updated successfully!")
    },

    onError: (error) => {
      console.error("Update header logo error:", error)
      toast.error("Failed to update website logo.")
    },
  })
}