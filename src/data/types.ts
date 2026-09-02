import type { CategoryName } from "./categories";

export type productCategories = {
  id: string;
  name: string;
  note?: string;
  image: string;
  link: string;
};

export type ProductCategory = {
  category: CategoryName;
  items: productCategories[];
};

export type Profile = {
  handle: string;
  avatarUrl: string;
  tagline: string;
  taglineSub: string;
  footerNote: string;
};

export type ViewMode = "list" | "gallery";
