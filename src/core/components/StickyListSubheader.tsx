import ListSubheader from "@material-ui/core/ListSubheader";
import type { ListSubheaderProps } from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import stickyStyles from "../utils/stickyStyles";

const useStyles = makeStyles((theme) => ({
  sticky: {
    ...stickyStyles(theme)
  }
}));

const StickyListSubheader = (props: ListSubheaderProps) => {
  const classes = useStyles();
  return (
    <ListSubheader
      {...props}
      classes={{ ...props.classes, sticky: classes.sticky }}
    />
  );
};

export default StickyListSubheader;
