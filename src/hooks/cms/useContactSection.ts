import { CMS_DOCUMENT_KEYS, CONTACT_SECTION_KEYS } from "@/constants/cms"

import { useDocuments } from "@/hooks/cms/useDocuments"
import { useDocumentSections } from "@/hooks/cms/useDocumentSections"

export const useContactSection = () => {
  const documentsQuery = useDocuments()

  const contactDocument = documentsQuery.data?.find(
    (document) => document.key === CMS_DOCUMENT_KEYS.CONTACT_US
  )

  const sectionsQuery = useDocumentSections(contactDocument?.id)

  const section = sectionsQuery.data?.find(
    (section) => section.key === CONTACT_SECTION_KEYS.GET_IN_TOUCH
  )

  return {
    documentId: contactDocument?.id,
    section,

    isLoading:
      documentsQuery.isLoading ||
      (!!contactDocument && sectionsQuery.isLoading),

    isError: documentsQuery.isError || sectionsQuery.isError,

    error: documentsQuery.error || sectionsQuery.error,
  }
}