import { Compass } from "lucide-react"

import AboutContentManager from "@/components/about/AboutContentManager"

import { useMemo } from "react"

import { useAboutSection } from "@/hooks/cms/useAboutSection"
import { useSectionItems } from "@/hooks/cms/useSectionItems"
import { useUpdateItem } from "@/hooks/cms/useUpdateItem"

const OurPurposes = () => {
  const { section, isLoading: sectionLoading } =
    useAboutSection("mission-vision")

  const { data: cmsItems = [], isLoading: itemsLoading } = useSectionItems(
    section?.id
  )

  const updateItemMutation = useUpdateItem()

  const items = useMemo(
    () =>
      cmsItems.map((item) => ({
        id: item.id,
        position: item.position,
        title: String(item.content.title ?? ""),
        description: String(item.content.description ?? ""),
      })),
    [cmsItems]
  )

  const handleUpdate = async (
    itemId: string,
    values: {
      title: string
      description: string
    }
  ) => {
    if (!section) return

    await updateItemMutation.mutateAsync({
      itemId,
      sectionId: section.id,
      payload: {
        content: {
          title: values.title,
          description: values.description,
        },
      },
    })
  }
  return (
    <AboutContentManager
      title="Mission & Vision"
      description="Manage your company's mission and vision."
      icon={Compass}
      itemLabel="Purpose"
      items={items}
      isLoading={sectionLoading || itemsLoading}
      isUpdating={updateItemMutation.isPending}
      onUpdate={handleUpdate}
    />
  )
}

export default OurPurposes
