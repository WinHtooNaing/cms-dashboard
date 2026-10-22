import { BadgeCheck } from "lucide-react"

import AboutContentManager, {
  type AboutContentItem,
} from "@/components/about/AboutContentManager"

const initialBenefits: AboutContentItem[] = [
  {
    id: "quality-products",
    title: "Quality Products",
    description:
      "We focus on offering carefully selected technology products with clear specifications to help customers make informed decisions.",
  },
  {
    id: "convenient-shopping",
    title: "Convenient Shopping",
    description:
      "Our organized categories and straightforward product pages make it easier to discover and compare technology products.",
  },
  {
    id: "helpful-support",
    title: "Helpful Support",
    description:
      "We aim to provide helpful guidance and accessible contact information so customers can get assistance when they need it.",
  },
  {
    id: "modern-technology",
    title: "Modern Technology",
    description:
      "We use modern web technology to deliver a smooth, accessible, and responsive shopping experience across devices.",
  },
]

const WhyChooseUs = () => {
  return (
    <AboutContentManager
      title="Why Choose Us"
      description="Manage the benefits that explain why customers should choose Tech Haven."
      icon={BadgeCheck}
      itemLabel="Benefit"
      initialItems={initialBenefits}
    />
  )
}

export default WhyChooseUs
