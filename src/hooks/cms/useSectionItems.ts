import { useQuery } from "@tanstack/react-query"
import { getSectionItems } from "@/service/cms/itemService"

export const useSectionItems = (sectionId?: string) => {
  return useQuery({
    queryKey: ["cms", "sections", sectionId, "items"],
    queryFn: () => getSectionItems(sectionId!),
    enabled: !!sectionId,
  })
}