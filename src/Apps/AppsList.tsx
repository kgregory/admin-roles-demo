import { createStyles, makeStyles } from "@material-ui/core/styles";
import type { Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SortIcon from "@material-ui/icons/Sort";
import { apps } from "core/constants/data";
import getDateTimeDifferenceText from "core/utils/getDateTimeDifferenceText";
import stableSort from "core/utils/stableSort";
import getComparator from "core/utils/getComparator";
import AppActiveChip from "./AppActiveChip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    title: {
      flex: "1 1 100%"
    },
    avatar: { background: theme.palette.secondary.main }
  })
);

interface AppsListProps {
  onClick: () => void;
}

const AppsList = ({ onClick }: AppsListProps) => {
  const classes = useStyles();
  return (
    <>
      <Paper square>
        <Toolbar className={classes.root}>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Apps
          </Typography>
          <IconButton color="action">
            <SortIcon />
          </IconButton>
        </Toolbar>
        <List>
          {stableSort(apps, getComparator("asc", "name"))
            .slice(0)
            .map((app) => {
              const dateDifference = getDateTimeDifferenceText(app.activeDate);
              const titleSuffix =
                dateDifference != null ? ` — ${dateDifference}` : "";

              return (
                <ListItem key={app.name} button onClick={onClick}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>{app.initials}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${app.name}${titleSuffix}`}
                    secondary={
                      !app.isEnabledOnPlatform
                        ? "This app is disabled on the platform"
                        : (app.createdDate != null && app.createdDate) ||
                          undefined
                    }
                  />
                  <AppActiveChip
                    isEnabledOnPlatform={app.isEnabledOnPlatform}
                    isActive={app.isActive}
                  />
                </ListItem>
              );
            })}
        </List>
      </Paper>
    </>
  );
};

export default AppsList;
