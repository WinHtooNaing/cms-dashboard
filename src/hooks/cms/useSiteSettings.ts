import { useQuery } from "@tanstack/react-query"
import { getSiteLogo } from "@/service/cms/logoService"

export const SITE_LOGO_QUERY_KEY = ["cms", "site-settings", "logo"]

export const useSiteLogo = () => {
  return useQuery({
    queryKey: SITE_LOGO_QUERY_KEY,
    queryFn: getSiteLogo,
    staleTime: 5 * 60 * 1000,
  })
}