import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

const AutocompleteComboboxField = ({
  error,
  errorMessage,
  id,
  loading,
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      {...props}
      autoFocus
      disabled={loading}
      error={error}
      id={id}
      helperText={error ? errorMessage : props.helperText}
      fullWidth
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <>
            {loading ? <CircularProgress size={20} /> : null}
            {props.InputProps.endAdornment}
          </>
        )
      }}
      /** lastpass icon doesn't help here */
      inputProps={{ ...props.inputProps, "data-lpignore": true }}
    />
  );
};

export default AutocompleteComboboxField;
