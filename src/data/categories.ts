// Allowed category names. Add a new member here before using it in products.ts.
export enum CategoryName {
  MustHave = "超好用",
  Usable = "堪用",
  LookingGood = "外貿協會",
}

export enum CategoryDescription {
  MustHave = "用過一次就回不去...",
  Usable = "好用可以用 會回購 (除非被我遇到更好的選擇",
  LookingGood = "顏值扛住了實力",
}

export const categoryNames = Object.values(CategoryName);
