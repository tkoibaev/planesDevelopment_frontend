import React from "react"
import OptionEdit from "../../components/OptionEdit/OptionEdit"
import styles from "./optionadminpanel.module.scss"

const OptionAdminPanel = () => {
  return (
    <div className={styles["option-edit_page"]}>
      <OptionEdit />
    </div>
  )
}

export default OptionAdminPanel
