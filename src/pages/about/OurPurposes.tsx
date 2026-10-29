import { Compass } from "lucide-react"

import AboutContentManager, {
  type AboutContentItem,
} from "@/components/about/AboutContentManager"

const initialMissionVision: AboutContentItem[] = [
  {
    id: "mission",
    title: "Our Mission",
    description:
      "Our mission is to make modern technology easier to discover and access by providing a simple shopping experience, clear product information, and customer-focused service.",
  },
  {
    id: "vision",
    title: "Our Vision",
    description:
      "Our vision is to become a trusted technology destination in Myanmar where customers can discover suitable products, make informed choices, and enjoy a convenient digital shopping experience.",
  },
]

const OurPurposes = () => {
  return (
    <AboutContentManager
      title="Mission & Vision"
      description="Manage the mission and vision statements that communicate the purpose and future direction of Tech Haven."
      icon={Compass}
      itemLabel="Statement"
      initialItems={initialMissionVision}
    />
  )
}

export default OurPurposes
