import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import ContactsApi from "./api/contactApi";
import { UsersTable } from "./components/Table";
import { Filters } from "./components/Filters";
import { Snackbar } from "@material-ui/core";

function App() {
  const handleCallToBackend = async () => {
    setError("");
    setPending(true);
    try {
      const { data } = await ContactsApi();
      const users = data.results;

      setUsers(users);
    } catch (error) {
      setError("something went wrong");
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

  return (
    <div className="App">
      {isPending ? (
        <CircularProgress />
      ) : (
        <>
          <Filters />
          <UsersTable users={users} />
        </>
      )}

      <Snackbar
        open={error ? error.length > 0 : false}
        message={error}
        action={
          <Button color="secondary" size="small" onClick={handleCallToBackend}>
            retry
          </Button>
        }
      />
    </div>
  );
}

export default App;
