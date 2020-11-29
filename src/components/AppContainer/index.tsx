import styles from "./AppContainer.module.scss";

const AppContainer = ({ children }: Props) => (
  <div className={styles.root}>{children}</div>
);

interface Props {
  children?: React.ReactChild | React.ReactChild[];
}

export default AppContainer;
