import { BadgeCheck } from "lucide-react"

import AboutContentManager from "@/components/about/AboutContentManager"
import { useMemo } from "react"

import { useAboutSection } from "@/hooks/cms/useAboutSection"
import { useSectionItems } from "@/hooks/cms/useSectionItems"
import { useUpdateItem } from "@/hooks/cms/useUpdateItem"
import { ABOUT_SECTION_KEYS } from "@/constants/cms"

const WhyChooseUs = () => {
  const { section, isLoading: sectionLoading } = useAboutSection(
    ABOUT_SECTION_KEYS.WHY_CHOOSE_US
  )

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
      title="Why Choose Us"
      description="Manage the reasons customers choose your store."
      icon={BadgeCheck}
      itemLabel="Benefit"
      items={items}
      isLoading={sectionLoading || itemsLoading}
      isUpdating={updateItemMutation.isPending}
      onUpdate={handleUpdate}
    />
  )
}

export default WhyChooseUs
