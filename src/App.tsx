import { useState } from "react";
import { Button, makeStyles, tokens } from "@fluentui/react-components";
import { GridRegular, ListRegular } from "@fluentui/react-icons";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductSection from "./components/ProductSection";
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
  viewToggle: {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: "36px",
    width: "36px",
    height: "36px",
    padding: 0,
    borderRadius: "50%",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: "rgba(255,255,255,0.03)",
    color: tokens.colorBrandForeground2,
  },
});

export default function App() {
  const styles = useStyles();
  const [view, setView] = useState<ViewMode>("list");

  return (
    <div className={styles.page}>
      <Button
        className={styles.viewToggle}
        appearance="subtle"
        shape="circular"
        icon={view === "list" ? <GridRegular /> : <ListRegular />}
        onClick={() => setView((current) => (current === "list" ? "gallery" : "list"))}
        aria-label={
          view === "list" ? "Switch to gallery view" : "Switch to list view"
        }
      />
      <Header profile={profile} />
      {categories.map((category) => (
        <ProductSection key={category.category} category={category} view={view} />
      ))}
      <Footer profile={profile} />
    </div>
  );
}
