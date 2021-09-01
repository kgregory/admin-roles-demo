import { createStyles, makeStyles } from "@material-ui/core/styles";
import type { Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: { marginLeft: theme.spacing(1) }
  })
);

function AppActiveChip(app) {
  const classes = useStyles();
  return app.isEnabledOnPlatform && app.isActive ? (
    <Chip
      icon={<CheckOutlinedIcon />}
      label="Active"
      variant="outlined"
      color="secondary"
      className={classes.chip}
    />
  ) : (
    (!app.isEnabledOnPlatform && (
      <Chip label="Disabled" variant="outlined" className={classes.chip} />
    )) ||
      null
  );
}

export default AppActiveChip;
