export type FilterType = "radio" | "checkbox" | "slider" | "rating";

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  options?: string[]; // radio, checkbox
  min?: number;
  max?: number;
  step?: number;
  unit?: string; // ₫, giờ, etc
}

export const filterConfig: FilterConfig[] = [
  {
    key: "type",
    label: "Loại",
    type: "checkbox",
    options: ["class", "material", "tool"],
  },
  {
    key: "category",
    label: "Chủ đề",
    type: "checkbox",
    options: [
      "Language",
      "Programming",
      "Marketing",
      "Design",
      "Data Science",
      "Language",
      "Programming",
      "Marketing",
      "Design",
      "Data Science",
    ],
  },
  {
    key: "level",
    label: "Trình độ",
    type: "radio",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    key: "price",
    label: "Khoảng giá",
    type: "slider",
    min: 0,
    max: 3000000,
    step: 50000,
    unit: "₫",
  },
  {
    key: "rating",
    label: "Đánh giá",
    type: "rating",
  },
];
