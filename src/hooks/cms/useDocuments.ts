import { useQuery } from "@tanstack/react-query"

import { getDocuments } from "../../service/cms/documentService"

export const useDocuments = () => {
  return useQuery({
    queryKey: ["cms", "documents"],
    queryFn: getDocuments,
  })
}