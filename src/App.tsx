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
  quote: {
    position: "relative",
    margin: "28px 0 30px",
    padding: "24px 22px 22px",
    borderLeft: `3px solid ${tokens.colorBrandForeground2}`,
    backgroundColor: "rgba(255,255,255,0.045)",
    borderRadius: "0 16px 16px 0",
    boxShadow: "0 14px 30px rgba(0,0,0,0.16)",
  },
  quoteMark: {
    position: "absolute",
    top: "-12px",
    left: "14px",
    fontFamily: "Georgia, serif",
    fontSize: "54px",
    lineHeight: 1,
    color: tokens.colorBrandForeground2,
  },
  quoteTitle: {
    display: "block",
    marginBottom: "14px",
    color: tokens.colorNeutralForeground1,
    fontSize: "16px",
    fontWeight: 600,
    letterSpacing: "0.04em",
  },
  quoteText: {
    display: "block",
    color: tokens.colorNeutralForeground2,
    fontFamily: "Georgia, 'Noto Serif TC', serif",
    fontSize: "13px",
    lineHeight: "1.8",
  },
  quoteItem: {
    display: "block",
    marginTop: "7px",
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
      <blockquote className={styles.quote}>
        <span className={styles.quoteMark} aria-hidden="true">
          “
        </span>
        <Text className={styles.quoteTitle}>情勒小語</Text>
        <Text className={styles.quoteText}>
          <span className={styles.quoteItem}>
            {"因為我用我自己的錢跟時間幫大家試用 所以當然要開分潤"}
          </span>
          <span className={styles.quoteItem}>{"d(`･∀･)b"}</span>
          <span className={styles.quoteItem}>
            {"購買時不會多花你任何費用 但會幫助我持續分享更多內容"}
          </span>
          <span className={styles.quoteItem}>
            {"個人開發需要您的愛戴 斯咪媽ㄙㄟˋ (♡˙︶˙♡)"}
          </span>
        </Text>
      </blockquote>
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
