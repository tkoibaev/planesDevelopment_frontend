import React from "react"
import OptionsTable from "../../components/OptionsTable/OptionsTable"
import styles from "./optionslist.module.scss"
const OptionsList = () => {
  return (
    <div className={styles.optionslist_page}>
      <OptionsTable />
    </div>
  )
}

export default OptionsList
