// Product catalog configuration
import { CategoryName, CategoryDescription } from "./categories";
import type { ProductCategory } from "./types";

export const categories: ProductCategory[] = [
  {
    category: CategoryName.MustHave,
    description: CategoryDescription.MustHave,
    items: [
      {
        id: "1",
        name: "極光延長膠",
        note: "超級浮誇閃亮亮延長膠 小貴但愛 照片有些微色差實體可看我影片",
        image:
          "https://down-tw.img.susercontent.com/file/sg-11134201-7rdw6-m0487ztvuw2v68.webp",
        link: "https://s.shopee.tw/7VG76QG7Ff?share_channel_code=6",
      },
      {
        id: "2",
        name: "桶裝延長膠",
        note: "巨堅固 我買的是乳白果凍色 延甲完就超好看",
        image:
          "https://down-tw.img.susercontent.com/file/cn-11134207-820l4-mdwyhj6ogdfo55.webp",
        link: "https://s.shopee.tw/112dMUvv13?share_channel_code=6",
      },
      {
        id: "3",
        name: "末町功能膠",
        note: "末町家的功能膠都不錯 上層 建構 鏡面上層都很讚",
        image:
          "https://down-tw.img.susercontent.com/file/tw-11134207-7r98s-lzo60wij251057.webp",
        link: "https://s.shopee.tw/1VytcGvtnG?share_channel_code=6",
      },
      {
        id: "4",
        name: " 美甲噴槍",
        note: "噴霧細膩 拿來做單色跟漸層都超快超好看 重點是機身也巨美",
        image:
          "https://down-tw.img.susercontent.com/file/8fec7836a378f5b106df27d1e83f66b6.webp",
        link: "https://s.shopee.tw/6AkjUt8eud?share_channel_code=6",
      },
      {
        id: "5",
        name: "腳踏美甲燈",
        note: "延甲不用再手忙腳亂 新手延甲你會愛",
        image:
          "https://down-tw.img.susercontent.com/file/tw-11134207-81zto-mf3sscbpbwuk20.webp",
        link: "https://s.shopee.tw/2gAphbHY1U?share_channel_code=6",
      },
      {
        id: "6",
        name: "軟管黏鑽膠",
        note: "非常黏 用在封層外也ok 軟管設計好做造型",
        image:
          "https://down-tw.img.susercontent.com/file/tw-11134207-7rasg-m2ubim037eska3@resize_w900_nl.webp",
        link: "https://s.shopee.tw/20vADALL7M?share_channel_code=6",
      },
    ],
  },
  {
    category: CategoryName.FrequentlyUsed,
    description: CategoryDescription.FrequentlyUsed,
    items: [
      {
        id: "1",
        name: "磨甲機筆架",
        note: "手殘福音 不怕磨甲機滾來滾去摔到",
        image:
          "https://down-tw.img.susercontent.com/file/tw-11134207-7rbkc-ma0p0xzrkgu150.webp",
        link: "https://s.shopee.tw/20vAD8dOzo?share_channel_code=6",
      },
      {
        id: "2",
        name: "噴膠專用稀釋劑",
        note: "調和效果佳 製作漸層非常細膩 搭配噴槍使用",
        image:
          "https://down-tw.img.susercontent.com/file/0a9f21a40e93c23c8328737705175ff0.webp",
        link: "https://s.shopee.tw/4VcVBg8gb9?share_channel_code=6",
      },
    ],
  },
  {
    category: CategoryName.LookingGood,
    description: CategoryDescription.LookingGood,
    items: [
      {
        id: "1",
        name: "極光美甲筆",
        note: "極光冰透筆身+銀色筆蓋 好看到S",
        image:
          "https://down-tw.img.susercontent.com/file/3ac6914ba405824985bab29394c73485.webp",
        link: "https://s.shopee.tw/1BM3YpGXEc?share_channel_code=6",
      },
    ],
  },
];
