import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import axios from "axios";
import { Response } from "../../types";

import styles from "./ApplicationsHistoryTable.module.scss";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ApplicationsHistoryTable = () => {
  const [application, setApplication] = useState([]);

  const fetchAppsData = async () => {
    try {
      console.log(cookies.get("access_token"));
      console.log(cookies.get("session_id"));
      axios.defaults.withCredentials = true;
      const response: Response = await axios(
        `http://127.0.0.1:8000/applications/`,
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
    console.log(application);
  }, []);

  const data = React.useMemo(() => application, []);
  const columns: Array<Column<{}>> = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "status",
        accessor: "status",
      },
      {
        Header: "created_at",
        accessor: "created_at",
      },
      {
        Header: "formed_at",
        accessor: "formed_at",
      },
      {
        Header: "completed_at",
        accessor: "completed_at",
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
