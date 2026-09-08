import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Text,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import { ArrowUpRight16Regular, DismissRegular } from "@fluentui/react-icons";
import { menuItems } from "../data/menu";

const useStyles = makeStyles({
  header: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  list: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "16px 4px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    textDecoration: "none",
    color: tokens.colorNeutralForeground1,
  },
  rowDisabled: {
    color: tokens.colorNeutralForeground3,
    cursor: "default",
  },
  label: {
    fontSize: "15px",
    fontWeight: 500,
  },
  arrow: {
    flexShrink: 0,
    color: tokens.colorBrandForeground2,
  },
  badge: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.5px",
    color: "#141414",
    backgroundImage:
      "linear-gradient(135deg, #6b6e76 0%, #e7e9ee 20%, #ffffff 32%, #b3b6bd 46%, #74777f 60%, #d9dbe1 76%, #f6f7f9 90%, #9a9da5 100%)",
    boxShadow:
      "inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -1px 2px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.5)",
    textShadow: "0 1px 0 rgba(255,255,255,0.5)",
    border: "1px solid rgba(0,0,0,0.25)",
  },
});

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  const styles = useStyles();

  return (
    <OverlayDrawer
      position="start"
      size="small"
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) {
          onClose();
        }
      }}
    >
      <DrawerHeader className={styles.header}>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<DismissRegular />}
              onClick={onClose}
              aria-label="Close menu"
            />
          }
        >
          選單
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody>
        <div className={styles.list}>
          {menuItems.map((item) =>
            item.link ? (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={styles.row}
              >
                <Text className={styles.label}>{item.label}</Text>
                <ArrowUpRight16Regular
                  className={styles.arrow}
                  aria-hidden="true"
                />
              </a>
            ) : (
              <div
                key={item.id}
                className={mergeClasses(styles.row, styles.rowDisabled)}
              >
                <Text className={styles.label}>{item.label}</Text>
                <span className={styles.badge}>COMING SOON</span>
              </div>
            ),
          )}
        </div>
      </DrawerBody>
    </OverlayDrawer>
  );
}
