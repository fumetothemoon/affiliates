import { Text, makeStyles, tokens } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  footer: {
    marginTop: "44px",
    textAlign: "center",
  },
  note: {
    display: "block",
    fontSize: "11px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.7",
    textAlign: "center",
  },
  copyright: {
    display: "block",
    fontSize: "10px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.7",
    textAlign: "center",
    marginTop: "6px",
  },
  handle: {
    display: "block",
    fontFamily: "'Unbounded', sans-serif",
    fontSize: "12px",
    color: tokens.colorBrandForeground2,
    letterSpacing: "1px",
    marginBottom: "8px",
    textAlign: "center",
  },
});

export default function Footer() {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <Text className={styles.note}>{t("footer.note")}</Text>
      <Text className={styles.copyright}>
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </Text>
      <Text className={styles.handle}>{"@fumetothemoon"}</Text>
    </footer>
  );
}
