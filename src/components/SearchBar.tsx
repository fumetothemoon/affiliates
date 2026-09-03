import { Button, Input, makeStyles, tokens } from "@fluentui/react-components";
import type { InputProps } from "@fluentui/react-components";
import { DismissRegular, SearchRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  bar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  },
  input: {
    flex: 1,
  },
  close: {
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
});

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
};

export default function SearchBar({ value, onChange, onClose }: SearchBarProps) {
  const styles = useStyles();

  const handleChange: InputProps["onChange"] = (_event, data) => {
    onChange(data.value);
  };

  return (
    <div className={styles.bar}>
      <Input
        className={styles.input}
        contentBefore={<SearchRegular />}
        placeholder="搜尋商品名稱"
        value={value}
        onChange={handleChange}
        autoFocus
      />
      <Button
        className={styles.close}
        appearance="subtle"
        shape="circular"
        icon={<DismissRegular />}
        onClick={onClose}
        aria-label="Close search"
      />
    </div>
  );
}
