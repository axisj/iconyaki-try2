import styles from "./iconyaki.module.css";

interface IconYakiProps {
  iconStr: string;
  viewBox: string;
  role?: string;
  className?: string;
}

export interface IconProps {
  size?: number;
}

const withIconYaki = ({ iconStr, viewBox, role = "iconyaki", className = "iconyaki" }: IconYakiProps) => {
  return function Icon({ size }: IconProps) {
    return (
      <span className={styles.iconyaki}>
        <svg
          role={role}
          className={className}
          viewBox={viewBox}
          style={{ fontSize: size }}
          strokeWidth={0}
          dangerouslySetInnerHTML={{ __html: iconStr }}
        />
      </span>
    );
  };
};

export default withIconYaki;
