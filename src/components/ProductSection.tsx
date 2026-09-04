import { Divider, Text, makeStyles, tokens } from "@fluentui/react-components";
import ProductCard from "./ProductCard";
import type { ProductCategory, ViewMode } from "../data/types";

const useStyles = makeStyles({
  section: {
    marginTop: "36px",
  },
  label: {
    fontSize: "13px",
    color: tokens.colorBrandForeground2,
    display: "block",
  },
  description: {
    display: "block",
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    fontSize: "12px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginTop: "14px",
  },
});

type ProductSectionProps = {
  category: ProductCategory;
  view: ViewMode;
};

export default function ProductSection({
  category,
  view,
}: ProductSectionProps) {
  const styles = useStyles();

  return (
    <section className={styles.section}>
      <Divider alignContent="center">
        <Text className={styles.label}>{category.category}</Text>
      </Divider>
      <Text className={styles.description}>{category.description}</Text>
      <div className={view === "grid" ? styles.grid : styles.list}>
        {category.items.map((item) => (
          <ProductCard key={item.id} item={item} view={view} />
        ))}
      </div>
    </section>
  );
}
