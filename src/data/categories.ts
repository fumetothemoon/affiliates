// Allowed category names. Add a new member here before using it in products.ts.
export enum CategoryName {
  Test = "test category",
  MustHave = "超好用",
  Usable = "堪用",
  LookingGood = "外貿協會",
}

export const categoryNames = Object.values(CategoryName);
