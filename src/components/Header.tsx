import { Avatar, Text, makeStyles, tokens } from "@fluentui/react-components";
import type { Profile } from "../types";

const useStyles = makeStyles({
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "32px",
  },
  avatarRing: {
    padding: "3px",
    borderRadius: "50%",
    marginBottom: "20px",
    backgroundImage:
      "conic-gradient(from 180deg, #d9dee7, #6c7386, #eef1f6, #7a8296, #d9dee7)",
    boxShadow: "0 0 30px rgba(185,198,255,0.18)",
  },
  chromeName: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 800,
    fontSize: "26px",
    letterSpacing: "0.5px",
    marginBottom: "6px",
    backgroundImage:
      "linear-gradient(180deg, #ffffff 10%, #b7bfcc 45%, #7d8494 55%, #eef1f6 90%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.6))",
  },
  tagline: {
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    fontSize: "14px",
    lineHeight: "1.6",
  },
});

type HeaderProps = {
  profile: Profile;
};

export default function Header({ profile }: HeaderProps) {
  const styles = useStyles();

  return (
    <header className={styles.wrap}>
      <div className={styles.avatarRing}>
        <Avatar
          size={96}
          name={profile.handle}
          image={profile.avatarUrl ? { src: profile.avatarUrl } : undefined}
        />
      </div>
      <Text as="h1" className={styles.chromeName}>
        {profile.handle}
      </Text>
      <Text className={styles.tagline}>
        {profile.tagline}
        <br />
        {profile.taglineSub} <span aria-hidden="true">✦</span>
      </Text>
    </header>
  );
}
