import ListSubheader from "@material-ui/core/ListSubheader";
import type { ListSubheaderProps } from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import stickyStyles from "../utils/stickyStyles";

interface StickyListSubheaderProps extends ListSubheaderProps {
  stuckToolbars?: number;
}

const useStyles = makeStyles((theme) => ({
  sticky: ({
    stuckToolbars
  }: Pick<StickyListSubheaderProps, "stuckToolbars">) => ({
    ...stickyStyles(theme, { stuckToolbars })
  })
}));

const StickyListSubheader = ({
  stuckToolbars,
  ...props
}: StickyListSubheaderProps) => {
  const classes = useStyles({ stuckToolbars });
  return (
    <ListSubheader
      {...props}
      classes={{ ...props.classes, sticky: classes.sticky }}
    />
  );
};

export default StickyListSubheader;
