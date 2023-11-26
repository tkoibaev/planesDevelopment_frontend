import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import axios from "axios";
import { Response } from "../../types";
import moment from "moment";

import styles from "./ApplicationsHistoryTable.module.scss";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const cookies = new Cookies();

const ApplicationsHistoryTable = () => {
  const [application, setApplication] = useState([]);

  const fetchAppsData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response: Response = await axios(
        `http://localhost:8000/applications/`,
        {
          method: "GET",
          //   credentials: 'include',
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${cookies.get("access_token")}`,
          },
        }
      );
      if (response.status == 200) {
        setApplication(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAppsData();
  }, []);

  const data = application;
  const columns: Array<Column<{}>> = React.useMemo(
    () => [
      {
        Header: "№",
        accessor: "id",
      },
      {
        Header: "Статус",
        accessor: "status",
        Cell: ({ value }) => {
          let statusText = "";
          switch (value) {
            case 1:
              statusText = "Черновик";
              break;
            case 2:
              statusText = "Удален";
              break;
            case 3:
              statusText = "В работе";
              break;
            case 4:
              statusText = "Завершен";
              break;
            case 5:
              statusText = "Отклонен";
              break;
            default:
              statusText = "";
          }
          return <span>{statusText}</span>;
        },
      },
      {
        Header: "Дата создания",
        accessor: "created_at",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Дата формирования",
        accessor: "formed_at",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Дата завершения",
        accessor: "completed_at",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Действие",
        Cell: ({ cell }) => (
          <Link
            style={{
              textDecoration: "underline",
              color: "black",
            }}
            to={`/planesDevelopment_frontend/application/${cell.row.values.id}`}
          >
            Подробнее&gt;
          </Link>
          // <Button onClick={() => console.log("aaa")}>Открыть</Button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={styles.content}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsHistoryTable;
