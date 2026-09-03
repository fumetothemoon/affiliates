import type { CategoryName, CategoryDescription } from "./categories";

export type productCategories = {
  id: string;
  name: string;
  note?: string;
  image: string;
  link: string;
};

export type ProductCategory = {
  category: CategoryName;
  description: CategoryDescription;
  items: productCategories[];
};

export type Profile = {
  handle: string;
  avatarUrl: string;
};

export type ViewMode = "list" | "gallery";
