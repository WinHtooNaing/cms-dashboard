import api from "@/lib/axios"

import { getDocuments } from "./documentService"
import { getDocumentSections } from "./sectionService"
import { updateSection } from "./sectionService"
import { updateItem } from "./itemService"

import { CMS_DOCUMENT_KEYS } from "@/constants/cms"

import type { ApiResponse, CmsSection } from "@/types/cms"
import type { CmsSectionItem } from "./itemService"


export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "linkedin"
  | "x"
  | "github"


export type FooterSupportContent = {
  name: string
  destinationType: "internal" | "external"
  pageKey?: string
  url?: string
}


export type FooterSocialContent = {
  platform: SocialPlatform
  url: string
}


export type FooterItem = CmsSectionItem & {
  content: Record<string, unknown>
}


export type FooterSection = CmsSection & {
  items: FooterItem[]
}


export type CreateFooterItemPayload = {
  sectionId: string
  position: number
  content: Record<string, unknown>
}


export type UpdateFooterItemPayload = {
  itemId: string
  content: Record<string, unknown>
}


export type ReorderFooterItemsPayload = {
  sectionId: string
  ids: string[]
}


export const getFooterSections = async (): Promise<FooterSection[]> => {
  const documents = await getDocuments()

  const footerDocument = documents.find(
    (document) => document.key === CMS_DOCUMENT_KEYS.FOOTER
  )

  if (!footerDocument) {
    throw new Error("Footer document not found")
  }

  return getDocumentSections(footerDocument.id) as Promise<FooterSection[]>
}


export const updateFooterDescription = async ({
  sectionId,
  description,
}: {
  sectionId: string
  description: string
}) => {
  return updateSection(sectionId, {
    content: { description },
  })
}

export const createFooterItem = async (
  payload: CreateFooterItemPayload
): Promise<CmsSectionItem> => {
  const formData = new FormData()

  formData.append("position", String(payload.position))
  formData.append("content", JSON.stringify(payload.content))

  const response = await api.post<ApiResponse<CmsSectionItem>>(
    `/cms/sections/${payload.sectionId}/items`,
    formData
  )

  return response.data.data
}


export const updateFooterItem = async (
  payload: UpdateFooterItemPayload
) => {
  return updateItem(payload.itemId, {
    content: payload.content,
  })
}


export const deleteFooterItem = async (itemId: string) => {
  await api.delete(`/cms/items/${itemId}`)
}


export const reorderFooterItems = async (
  payload: ReorderFooterItemsPayload
) => {
  const response = await api.patch<ApiResponse<CmsSectionItem[]>>(
    `/cms/sections/${payload.sectionId}/items/reorder`,
    {
      ids: payload.ids,
    }
  )

  return response.data.data
}