import { Divider, Text, makeStyles, tokens } from "@fluentui/react-components";
import ProductCard from "./ProductCard";
import type { ProductCategory } from "../types";

const useStyles = makeStyles({
  section: {
    marginTop: "36px",
  },
  label: {
    fontSize: "13px",
    color: tokens.colorBrandForeground2,
    marginBottom: "14px",
    display: "block",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
});

type ProductSectionProps = {
  category: ProductCategory;
};

export default function ProductSection({ category }: ProductSectionProps) {
  const styles = useStyles();

  return (
    <section className={styles.section}>
      <Divider alignContent="center">
        <Text className={styles.label}>{category.category}</Text>
      </Divider>
      <div className={styles.list} style={{ marginTop: "14px" }}>
        {category.items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
