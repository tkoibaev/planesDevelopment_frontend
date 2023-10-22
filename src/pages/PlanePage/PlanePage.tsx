import PlaneInfo from "./PlaneInfo/PlaneInfo";

import styles from "./planepage.module.scss";
import { useParams } from "react-router-dom";

const PlanePage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  return (
    <div className={styles.planepage}>
      <div className={styles.container}>
        <PlaneInfo id={id} />
      </div>
    </div>
  );
};

export default PlanePage;
