import axios from "axios"
import React, { useEffect, useState } from "react"
import { useTable, Column } from "react-table"
import optionData from "../../types"
import { Response } from "../../types"
import styles from "./optionstable.module.scss"
import Button from "../Button/Button"
import deleteIcom from "../../assets/icons/delete.png"
import editIcon from "../../assets/icons/edit.png"
import { Link } from "react-router-dom"

const OptionsTable = () => {
  const [options, setOptions] = useState<optionData[]>([])

  const fetchOptions = async () => {
    try {
      axios.defaults.withCredentials = true
      const response: Response = await axios(`http://localhost:8000/options/`, {
        method: "GET",
        //   credentials: 'include',
        withCredentials: true,
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8",
        //     Authorization: `Bearer ${cookies.get("access_token")}`,
        //   },
      })
      if (response.status == 200) {
        setOptions(response.data.options)
      }
      console.log(response.data.options)
    } catch (e) {
      console.log(e)
    }
  }
  const columns: Array<Column<{}>> = React.useMemo(
    () => [
      {
        Header: "№",
        accessor: "id",
      },
      {
        Header: "Название",
        accessor: "title",
      },
      {
        Header: "Описание",
        accessor: "description",
      },
      {
        Header: "Статус",
        accessor: "available",
        Cell: ({ value }) => {
          let status = ""
          value == true ? (status = "В наличии") : (status = "Нет в наличии")
          return <span>{status}</span>
        },
      },
      {
        Header: "Действие",
        accessor: "action",
        Cell: ({ cell }) => (
          <div className={styles.moder_action}>
            <>
              <Link
                to={`/planesDevelopment_frontend/options-list/${cell.row.values.id}`}
              >
                <img
                  // onClick={() => formApplication(row.values.id, 4)}
                  className={styles.moder_action__button}
                  src={editIcon}
                ></img>
              </Link>

              <img
                // onClick={() => formApplication(row.values.id, 5)}
                className={styles.moder_action__button}
                src={deleteIcom}
              ></img>
            </>
          </div>
        ),
      },
      {
        Header: "Изображение",
        accessor: "image",
        Cell: ({ value }) => {
          return <img style={{ width: 100 }} alt="aaa" src={value}></img>
        },
      },
      //   {
      //     Header: "Дата завершения",
      //     accessor: "completed_at",
      //     Cell: ({ value }) => (
      //       <span>
      //         {value ? moment(value).format("DD.MM.YYYY HH:mm") : "пока пусто"}
      //       </span>
      //     ),
      //   },
      //   {
      //     Header: "Заказчик",
      //     accessor: "customer",
      //   },
      //   {
      //     Header: "Информация",
      //     Cell: ({ cell }) => (
      //       <Link
      //         style={{
      //           textDecoration: "underline",
      //           color: "black",
      //         }}
      //         to={`/planesDevelopment_frontend/application/${cell.row.values.id}`}
      //       >
      //         Подробнее&gt;
      //       </Link>
      //       // <Button onClick={() => console.log("aaa")}>Открыть</Button>
      //     ),
      //   },
    ],
    []
  )
  useEffect(() => {
    fetchOptions()
  }, [])

  const data = options

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <>
      <div className={styles.content}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.addbutton}>
        <Link to={`/planesDevelopment_frontend/options-list/0`}>
          <Button>Добавить новую опцию</Button>
        </Link>
      </div>
    </>
  )
}

export default OptionsTable
