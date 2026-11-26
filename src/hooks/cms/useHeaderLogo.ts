import { useQuery } from "@tanstack/react-query"
import { getHeaderSection } from "@/service/cms/headerService"

export const HEADER_LOGO_QUERY_KEY = ["cms", "header-logo"]

export const useHeaderLogo = () => {
  return useQuery({
    queryKey: HEADER_LOGO_QUERY_KEY,
    queryFn: getHeaderSection,
  })
}