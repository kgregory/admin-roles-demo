import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import stickyStyles from "./stickyStyles";

/**
 * push the sticky list subheader beneath the app bar
 * we've created a `sticky` class with `top` adjusted to 1 less than the app bar's height
 */
const useStyles = makeStyles((theme) => ({
  sticky: (stuckToolbars) => ({
    ...stickyStyles(theme, { stuckToolbars })
  })
}));

/**
 * a wrapper around the material-ui ListSubheader with an overridden `sticky` class
 */
const StickyListSubheader = (props) => {
  const { stuckToolbars = 1, ...other } = props;
  const classes = useStyles(stuckToolbars);
  return <ListSubheader {...other} classes={{ sticky: classes.sticky }} />;
};

export default StickyListSubheader;
