import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const COLUMN_HEADERS = ["name", "email", "cell", "gender", "nationality"];

export const UsersTable = ({ users }) => {
  return (
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
  );
};
