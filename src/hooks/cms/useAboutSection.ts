import { useDocuments } from "@/hooks/cms/useDocuments"
import { useDocumentSections } from "@/hooks/cms/useDocumentSections"
import { CMS_DOCUMENT_KEYS } from "@/constants/cms"
export const useAboutSection = (sectionKey: string) => {
  const documentsQuery = useDocuments()

  const aboutDocument = documentsQuery.data?.find(
    (document) => document.key === CMS_DOCUMENT_KEYS.ABOUT_US
  )

  const sectionsQuery = useDocumentSections(aboutDocument?.id)

  const section = sectionsQuery.data?.find(
    (section) => section.key === sectionKey
  )

  return {
    section,
    isLoading:
      documentsQuery.isLoading ||
      (!!aboutDocument && sectionsQuery.isLoading),
    isError: documentsQuery.isError || sectionsQuery.isError,
    error: documentsQuery.error || sectionsQuery.error,
  }
}