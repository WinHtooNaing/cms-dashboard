import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateSection } from "@/service/cms/sectionService"
import type { UpdateSectionPayload } from "@/service/cms/sectionService"

type UpdateSectionVariables = {
  sectionId: string
  payload: UpdateSectionPayload
}

export const useUpdateSection = (documentId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ sectionId, payload }: UpdateSectionVariables) =>
      updateSection(sectionId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cms", "documents", documentId, "sections"],
      })

      toast.success("Introduction updated successfully!")
    },

    onError: (error) => {
      console.error("Update section error:", error)
      toast.error("Failed to update introduction.")
    },
  })
}