// Product catalog configuration
import { CategoryName } from "./categories";
import type { ProductCategory } from "./types";

export const categories: ProductCategory[] = [
  {
    category: CategoryName.Test,
    items: [
      {
        id: "1",
        name: "test item name",
        note: "test note",
        image: "",
        link: "",
      },
    ],
  },
  {
    category: CategoryName.MustHave,
    items: [
      {
        id: "1",
        name: "腳踏美甲燈",
        note: "延甲神器 解放雙手",
        image:
          "https://down-tw.img.susercontent.com/file/tw-11134207-81zto-mf3sscbpbwuk20.webp",
        link: "https://s.shopee.tw/2gAphbHY1U",
      },
    ],
  },
];
