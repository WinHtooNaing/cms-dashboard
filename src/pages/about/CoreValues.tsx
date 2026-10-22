import { HeartHandshake } from "lucide-react"

import AboutContentManager, {
  type AboutContentItem,
} from "@/components/about/AboutContentManager"

const initialCoreValues: AboutContentItem[] = [
  {
    id: "1",
    title: "Quality & Trust",
    description:
      "We prioritize reliable products and transparent information so customers can shop with confidence.",
  },
  {
    id: "2",
    title: "Customer First",
    description:
      "We put our customers first by making product discovery simple and providing helpful support.",
  },
  {
    id: "3",
    title: "Innovation",
    description:
      "We embrace modern technology and continuously improve our shopping experience.",
  },
  {
    id: "4",
    title: "Community",
    description:
      "We aim to build lasting relationships with our customers and contribute to a connected technology community.",
  },
]

const CoreValuesPage = () => {
  return (
    <AboutContentManager
      title="Core Values"
      description="Manage the principles and values that define the Tech Haven brand."
      icon={HeartHandshake}
      itemLabel="Core Value"
      initialItems={initialCoreValues}
    />
  )
}

export default CoreValuesPage
