// Allowed category names. Add a new member here before using it in products.ts.
export enum CategoryName {
  MustHave = "瘋狂安麗",
  FrequentlyUsed = "一再回購",
  LookingGood = "外貿協會",
}

export enum CategoryDescription {
  MustHave = "用過一次就綁死(〃∀〃)",
  FrequentlyUsed = "好用會再買 (不排除喜新厭舊)",
  LookingGood = "顏值太暈(*´∀`)~♥實力夠用就好",
}

export const categoryNames = Object.values(CategoryName);
