import React from "react";
import ApplicationsHistoryTable from "../../components/ApplicationsHistoryTable/ApplicationsHistoryTable";

import styles from "./ApplicationsHistoryPage.module.scss";
const ApplicationsHistoryPage = () => {
  return (
    <div className={styles.historypage}>
      <ApplicationsHistoryTable />
    </div>
  );
};

export default ApplicationsHistoryPage;
