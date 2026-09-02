export type productCategories = {
  id: string;
  tag?: string;
  name: string;
  note?: string;
  image: string;
  link: string;
};

export type ProductCategory = {
  category: string;
  items: productCategories[];
};

export type Profile = {
  handle: string;
  avatarUrl: string;
  tagline: string;
  taglineSub: string;
  footerNote: string;
};
