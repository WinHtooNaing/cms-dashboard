import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  updateItem,
  type UpdateItemPayload,
} from "@/service/cms/itemService"

type UpdateItemVariables = {
  itemId: string
  sectionId: string
  payload: UpdateItemPayload
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: UpdateItemVariables) => updateItem(itemId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "cms",
          "sections",
          variables.sectionId,
          "items",
        ],
      })

      toast.success("Content updated successfully!")
    },

    onError: (error) => {
      console.error("Update item error:", error)
      toast.error("Failed to update content.")
    },
  })
}