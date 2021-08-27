import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import StickyListSubheader from "./StickyListSubheader";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  listItemTextPrimary: {
    display: "flex"
  },
  listItemText: {
    flexGrow: 1
  }
}));

interface CardDataProps {
  label: string;
  value: any;
}

const CardData = ({ label, value }: CardDataProps) => {
  const classes = useStyles();
  return (
    <Paper>
      <List
        className={classes.root}
        dense
        subheader={
          <StickyListSubheader component="div" id={`card-editor-${label}`}>
            {label}
          </StickyListSubheader>
        }
      >
        <ListItem>
          <ListItemText classes={{ primary: classes.listItemTextPrimary }}>
            <span className={classes.listItemText}>{value}</span>
          </ListItemText>
        </ListItem>
      </List>
    </Paper>
  );
};

export default CardData;
