import {
  columnFilteringFeature,
  createFilteredRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table"

export const features = tableFeatures({
  // Features
  columnFilteringFeature,
  rowSortingFeature,

  // Row Models
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),

  // Filter Functions
  filterFns: {
    includesString: filterFn_includesString,
  },

  // Sorting Functions
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
  },
})

export type OrderTableFeatures = typeof features