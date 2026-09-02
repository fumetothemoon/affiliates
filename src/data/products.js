// Product catalog configuration
// To add a product, copy a complete { } entry in the appropriate category's items array and update its content.
// To add a category, copy a complete { category: ..., items: [...] } entry.

/** @type {import('../types').ProductCategory[]} */
export const categories = [
  {
    category: "test category",
    items: [
      {
        id: "test-1",
        tag: "testTag",
        name: "test item name",
        note: "test note",
        image: "",
        link: "",
      },
    ],
  },
];
