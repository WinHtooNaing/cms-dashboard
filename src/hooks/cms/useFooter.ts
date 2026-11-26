import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  getFooterSections,
  updateFooterDescription,
  createFooterItem,
  updateFooterItem,
  deleteFooterItem,
  reorderFooterItems,
} from "@/service/cms/footerService"

import type {
  CreateFooterItemPayload,
  UpdateFooterItemPayload,
  ReorderFooterItemsPayload,
} from "@/service/cms/footerService"

const FOOTER_QUERY_KEY = ["cms", "footer", "sections"]


export const useFooter = () => {
  return useQuery({
    queryKey: FOOTER_QUERY_KEY,
    queryFn: getFooterSections,
  })
}


export const useUpdateFooterDescription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateFooterDescription,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FOOTER_QUERY_KEY,
      })
    },
  })
}


export const useCreateFooterItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateFooterItemPayload) =>
      createFooterItem(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FOOTER_QUERY_KEY,
      })
    },
  })
}


export const useUpdateFooterItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateFooterItemPayload) =>
      updateFooterItem(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FOOTER_QUERY_KEY,
      })
    },
  })
}


export const useDeleteFooterItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFooterItem,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FOOTER_QUERY_KEY,
      })
    },
  })
}


export const useReorderFooterItems = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ReorderFooterItemsPayload) =>
      reorderFooterItems(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FOOTER_QUERY_KEY,
      })
    },
  })
}