import type { ContactUsValues } from "@/types/contactUsSchema"

const dayAbbreviations: Record<ContactUsValues["workingDays"][number], string> =
  {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  }

const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const

export const formatWorkingDays = (
  selectedDays: ContactUsValues["workingDays"]
): string => {
  const sortedDays = dayOrder.filter((day) => selectedDays.includes(day))

  if (sortedDays.length === 0) {
    return "No working days selected"
  }

  const ranges: string[] = []

  let start = 0

  for (let i = 1; i <= sortedDays.length; i++) {
    const isConsecutive =
      i < sortedDays.length &&
      dayOrder.indexOf(sortedDays[i]) ===
        dayOrder.indexOf(sortedDays[i - 1]) + 1

    if (isConsecutive) {
      continue
    }

    const firstDay = sortedDays[start]
    const lastDay = sortedDays[i - 1]

    if (start === i - 1) {
      ranges.push(dayAbbreviations[firstDay])
    } else {
      ranges.push(
        `${dayAbbreviations[firstDay]} – ${dayAbbreviations[lastDay]}`
      )
    }

    start = i
  }

  return ranges.join(", ")
}

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number)

  const period = hours >= 12 ? "PM" : "AM"
  const formattedHours = hours % 12 || 12

  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`
}

export const formatBusinessHours = (
  values: Pick<ContactUsValues, "workingDays" | "openingTime" | "closingTime">
): string => {
  const days = formatWorkingDays(values.workingDays)
  const opening = formatTime(values.openingTime)
  const closing = formatTime(values.closingTime)

  return `${days}, ${opening} – ${closing}`
}
