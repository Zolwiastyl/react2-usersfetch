import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import ContactsApi from "./api/contactApi";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
} from "@material-ui/core";

function App() {
  const handleCallToBackend = async () => {
    setPending(true);
    try {
      const { data } = await ContactsApi();
      const users = data.results;
      console.debug(users);
      console.debug(data);
      setUsers(users);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    handleCallToBackend();
  }, []);
  const columns = [
    {
      field: "name",
      headerName: "name",
      valueGetter: (params) =>
        `${params.getValue(params.id, "first") || ""} ${
          params.getValue(params.id, "last") || ""
        }`,
    },
    { field: "email", headerName: "email" },
    { field: "cell", headerName: "cell" },
    { field: "gender", headerName: "gender" },
    { field: "nationality", headerName: "nationality" },
  ];
  const COLUMN_HEADERS = ["name", "email", "cell", "gender", "nationality"];

  return (
    <div className="App">
      {isPending && <CircularProgress />}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {COLUMN_HEADERS.map((field) => (
                <TableCell key={field}>{field}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length
              ? users.map(({ cell, name, email, gender, nat }) => (
                  <TableRow key={cell}>
                    <TableCell>{`${name.first || ""} ${
                      name.last || ""
                    }`}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{cell}</TableCell>
                    <TableCell>{gender}</TableCell>
                    <TableCell>{nat}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
