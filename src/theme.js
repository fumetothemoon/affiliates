import { createDarkTheme } from "@fluentui/react-components";

// Silver-gray and ice-blue shades, dark to light, used to create the Fluent UI brand ramp.
const chromeBrand = {
  10: "#050506",
  20: "#0e0f13",
  30: "#16171c",
  40: "#1d1f26",
  50: "#252832",
  60: "#2e313d",
  70: "#383c4a",
  80: "#444a5a",
  90: "#545c70",
  100: "#666f86",
  110: "#7c86a1",
  120: "#94a0bd",
  130: "#adb8d4",
  140: "#c6cee6",
  150: "#dee3f2",
  160: "#f4f6fb",
};

export const chromeDarkTheme = {
  ...createDarkTheme(chromeBrand),
  colorBrandForeground1: chromeBrand[130],
  colorBrandForeground2: chromeBrand[140],
  colorNeutralBackground1: "#0a0a0e",
  colorNeutralBackground2: "#121218",
  colorNeutralBackground3: "#16161d",
  colorNeutralForeground1: "#e9edf3",
  colorNeutralForeground2: "#b9c0cf",
  colorNeutralForeground3: "#8d94a6",
  colorNeutralStroke1: "rgba(255,255,255,0.12)",
  colorNeutralStroke2: "rgba(255,255,255,0.08)",
};
