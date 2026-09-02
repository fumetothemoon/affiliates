import { makeStyles } from "@fluentui/react-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductSection from "./components/ProductSection";
import { profile } from "./data/profile.js";
import { categories } from "./data/products.js";

const useStyles = makeStyles({
  page: {
    width: "100%",
    maxWidth: "420px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
});

export default function App() {
  const styles = useStyles();

  return (
    <div className={styles.page}>
      <Header profile={profile} />
      {categories.map((category) => (
        <ProductSection key={category.category} category={category} />
      ))}
      <Footer profile={profile} />
    </div>
  );
}
