import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import { useEffect, useState, useCallback } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import ContactsApi from "./api/contactApi";
import { UsersTable } from "./components/Table";
import { Filters } from "./components/Filters";
import { Snackbar } from "@material-ui/core";

function App() {
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const handleCallToBackend = useCallback(async () => {
    setError("");
    setPending(true);
    try {
      const { data } = await ContactsApi(nationality, gender);
      const users = data.results;

      setUsers(users);
    } catch (error) {
      setError("something went wrong");
    } finally {
      setPending(false);
    }
  }, [gender, nationality]);
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleCallToBackend();
  }, [handleCallToBackend]);

  return (
    <div className="App">
      {isPending ? (
        <CircularProgress />
      ) : (
        <>
          <Filters
            setGender={setGender}
            setNationality={setNationality}
            gender={gender}
            nationality={nationality}
          />
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
