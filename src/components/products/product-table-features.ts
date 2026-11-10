import {
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/react-table"

export const features = tableFeatures({
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
})
