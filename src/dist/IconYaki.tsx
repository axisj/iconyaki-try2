import styles from "./iconyaki.module.css";
interface IconYakiProps {
  iconStr: string;
  viewBox: string;
  role?: string;
  className?: string;
}
const withIconYaki = ({ iconStr, viewBox, role = "iconyaki", className = "iconyaki" }: IconYakiProps) => {
  const Icon = ({ size = 24, color = "currentColor", fill = "", strokeWidth = 1 }) => {
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
          stroke={fill === "none" ? color : "currentColor"}
          dangerouslySetInnerHTML={{ __html: iconStr }}
        />
      </span>
    );
  };

  return Icon;
};

export default withIconYaki;
