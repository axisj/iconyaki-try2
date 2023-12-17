import styles from "./iconyaki.module.css";

interface IconYakiProps {
  iconStr: string;
  viewBox: string;
  role?: string;
  className?: string;
}
const withIconYaki = ({ iconStr, viewBox, role = "iconyaki", className = "iconyaki" }: IconYakiProps) => {
  return function Icon({ size = 24, color = "currentColor", fill = "", strokeWidth = 0 }) {
    return (
      <span className={styles.iconyaki}>
        <svg
          role={role}
          className={className}
          viewBox={viewBox}
          width={size}
          height={size}
          strokeWidth={strokeWidth}
          fill={fill ? fill : "none"}
          stroke={fill === "none" ? color : ""}
          dangerouslySetInnerHTML={{ __html: iconStr }}
        />
      </span>
    );
  };
};

export default withIconYaki;
