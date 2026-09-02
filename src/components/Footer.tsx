import { Text, makeStyles, tokens } from "@fluentui/react-components";
import type { Profile } from "../data/types";

const useStyles = makeStyles({
  footer: {
    marginTop: "44px",
    textAlign: "center",
  },
  handle: {
    display: "block",
    fontFamily: "'Unbounded', sans-serif",
    fontSize: "12px",
    color: tokens.colorBrandForeground2,
    letterSpacing: "1px",
    marginBottom: "8px",
  },
  note: {
    display: "block",
    fontSize: "11px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.7",
  },
});

type FooterProps = {
  profile: Profile;
};

export default function Footer({ profile }: FooterProps) {
  const styles = useStyles();

  return (
    <footer className={styles.footer}>
      <Text className={styles.handle}>{profile.handle}</Text>
      <Text className={styles.note}>{profile.footerNote}</Text>
    </footer>
  );
}
