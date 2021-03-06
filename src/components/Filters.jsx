import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
}));

const GENDER_OPTIONS = [
  { label: "All gender", value: "" },
  { label: "Female", value: "female" },
  { label: "Male ", value: "male" },
];

const NATIONALITY_OPTIONS = [
  { label: "All countries ", value: "" },
  { label: "Usa ", value: "us" },
  { label: "Great Britain ", value: "gb" },
];

export const Filters = ({ setGender, setNationality, nationality, gender }) => {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          {GENDER_OPTIONS.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>nationality</InputLabel>
        <Select
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        >
          {NATIONALITY_OPTIONS.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
