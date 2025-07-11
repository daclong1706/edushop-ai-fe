export interface Product {
  id: string;
  name: string;
  type: "class" | "material" | "tool";
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  longDescription: string;
  instructor: string;
  duration: string;
  rating: number;
  students: number;
  language: string;
  tags: string[];
  features: string[];
}
