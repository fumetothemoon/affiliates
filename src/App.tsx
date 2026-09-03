import { useMemo, useState } from "react";
import { Button, Text, makeStyles, tokens } from "@fluentui/react-components";
import { GridRegular, ListRegular, SearchRegular } from "@fluentui/react-icons";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductSection from "./components/ProductSection";
import SearchBar from "./components/SearchBar";
import { profile } from "./data/profile";
import { categories } from "./data/products";
import type { ViewMode } from "./data/types";

const useStyles = makeStyles({
  page: {
    width: "100%",
    maxWidth: "420px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  iconButton: {
    flexShrink: 0,
    minWidth: "36px",
    width: "36px",
    height: "36px",
    padding: 0,
    borderRadius: "50%",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: "rgba(255,255,255,0.03)",
    color: tokens.colorBrandForeground2,
  },
  noResults: {
    display: "block",
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    marginTop: "36px",
  },
});

export default function App() {
  const styles = useStyles();
  const [view, setView] = useState<ViewMode>("gallery");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return categories;
    }
    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.name.toLowerCase().includes(normalizedQuery),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  const noResults = query.trim().length > 0 && filteredCategories.length === 0;

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <div className={styles.page}>
      <Header profile={profile} />
      <div className={styles.toolbar}>
        {searchOpen ? (
          <SearchBar value={query} onChange={setQuery} onClose={closeSearch} />
        ) : (
          <>
            <Button
              className={styles.iconButton}
              appearance="subtle"
              shape="circular"
              icon={<SearchRegular aria-hidden="true" />}
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
            />
            <Button
              className={styles.iconButton}
              appearance="subtle"
              shape="circular"
              icon={view === "list" ? <GridRegular /> : <ListRegular />}
              onClick={() =>
                setView((current) => (current === "list" ? "gallery" : "list"))
              }
              aria-label={
                view === "list"
                  ? "Switch to gallery view"
                  : "Switch to list view"
              }
            />
          </>
        )}
      </div>
      {noResults ? (
        <Text className={styles.noResults}>找不到符合的商品</Text>
      ) : (
        filteredCategories.map((category) => (
          <ProductSection
            key={category.category}
            category={category}
            view={view}
          />
        ))
      )}
      <Footer />
    </div>
  );
}
