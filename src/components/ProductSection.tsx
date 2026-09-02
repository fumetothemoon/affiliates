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
    marginBottom: "14px",
    display: "block",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "14px",
  },
  gallery: {
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

export default function ProductSection({ category, view }: ProductSectionProps) {
  const styles = useStyles();

  return (
    <section className={styles.section}>
      <Divider alignContent="center">
        <Text className={styles.label}>{category.category}</Text>
      </Divider>
      <div className={view === "gallery" ? styles.gallery : styles.list}>
        {category.items.map((item) => (
          <ProductCard key={item.id} item={item} view={view} />
        ))}
      </div>
    </section>
  );
}
