import { useQuery } from "@tanstack/react-query"

import { getDocumentSections } from "../../service/cms/sectionService"

export const useDocumentSections = (documentId?: string) => {
  return useQuery({
    queryKey: ["cms", "documents", documentId, "sections"],
    queryFn: () => getDocumentSections(documentId!),
    enabled: !!documentId,
  })
}