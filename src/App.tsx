import { useEffect, useMemo, useState } from "react";
import { Button, Text, makeStyles, tokens } from "@fluentui/react-components";
import {
  GridRegular,
  ListRegular,
  LocalLanguageRegular,
  SearchRegular,
  ShoppingBagRegular,
} from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import MenuDrawer from "./components/MenuDrawer";
import ProductSection from "./components/ProductSection";
import SearchBar from "./components/SearchBar";
import { profile } from "./data/profile";
import { categories } from "./data/products";
import type { ViewMode } from "./data/types";
import {
  LANGUAGE_STORAGE_KEY,
  type SupportedLanguage,
} from "./i18n";

const useStyles = makeStyles({
  page: {
    width: "100%",
    maxWidth: "420px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  menuButton: {
    position: "absolute",
    top: 0,
    left: 0,
    minWidth: "36px",
    width: "36px",
    height: "36px",
    padding: 0,
    borderRadius: "50%",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: "rgba(255,255,255,0.03)",
    color: tokens.colorBrandForeground2,
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
  const { t, i18n } = useTranslation();
  const [view, setView] = useState<ViewMode>("grid");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang =
      i18n.language === "en" ? "en" : "zh-Hant";
  }, [i18n.language]);

  const toggleLanguage = () => {
    const nextLanguage: SupportedLanguage =
      i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(nextLanguage);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // ignore write failures (storage blocked/unavailable)
    }
  };

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
      <Intro />
      <Button
        className={styles.menuButton}
        appearance="subtle"
        shape="circular"
        icon={<ShoppingBagRegular />}
        onClick={() => setMenuOpen(true)}
        aria-label={t("toolbar.openMenu")}
      />
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
              aria-label={t("toolbar.searchProducts")}
            />
            <Button
              className={styles.iconButton}
              appearance="subtle"
              shape="circular"
              icon={view === "list" ? <GridRegular /> : <ListRegular />}
              onClick={() =>
                setView((current) => (current === "list" ? "grid" : "list"))
              }
              aria-label={
                view === "list"
                  ? t("toolbar.switchToGrid")
                  : t("toolbar.switchToList")
              }
            />
            <Button
              className={styles.iconButton}
              appearance="subtle"
              shape="circular"
              icon={<LocalLanguageRegular aria-hidden="true" />}
              onClick={toggleLanguage}
              aria-label={t("language.toggle")}
            />
          </>
        )}
      </div>
      {noResults ? (
        <Text className={styles.noResults}>{t("noResults")}</Text>
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
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
