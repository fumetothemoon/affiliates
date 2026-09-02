import { Text, makeStyles, tokens } from "@fluentui/react-components";
import { ArrowUpRight16Regular } from "@fluentui/react-icons";
import type { productCategories } from "../data/types";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "14px",
    padding: "12px",
    textDecoration: "none",
    borderRadius: "16px",
    backgroundImage: "linear-gradient(180deg, #1a1a22, #131318)",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    transitionProperty: "border-color, transform, background",
    transitionDuration: "0.2s",
    ":hover": {
      border: "1px solid rgba(185,198,255,0.45)",
      transform: "translateY(-2px)",
      backgroundImage: "linear-gradient(180deg, #1d1d26, #15151b)",
    },
  },
  thumb: {
    flexShrink: 0,
    width: "64px",
    height: "64px",
    borderRadius: "12px",
    backgroundColor: "#0e0e12",
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    display: "block",
    fontSize: "15px",
    fontWeight: 500,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  note: {
    display: "block",
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  arrow: {
    flexShrink: 0,
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground2,
  },
});

type ProductCardProps = {
  item: productCategories;
};

export default function ProductCard({ item }: ProductCardProps) {
  const styles = useStyles();

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={styles.card}
    >
      <div
        className={styles.thumb}
        style={
          item.image ? { backgroundImage: `url(${item.image})` } : undefined
        }
      />
      <div className={styles.info}>
        <Text className={styles.name}>{item.name}</Text>
        <Text className={styles.note}>{item.note}</Text>
      </div>
      <div className={styles.arrow}>
        <ArrowUpRight16Regular aria-hidden="true" />
      </div>
    </a>
  );
}
