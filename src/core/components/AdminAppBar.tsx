import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import type { DemoView } from "core/types";

const useAdminAppBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

interface AdminAppBarProps {
  child?: boolean;
  children: React.ReactNode;
  onChangeView: (view: DemoView) => void;
}

const AdminAppBar = ({
  child = false,
  children,
  onChangeView
}: AdminAppBarProps) => {
  const classes = useAdminAppBarStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (isOpen: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            {child ? <ArrowBackIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {children}
          </Typography>
          <IconButton color="inherit" aria-label="Home">
            <HomeIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="overflow">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List
            subheader={
              <ListSubheader component="div" id="demo-drawer-subheader">
                Demo Views
              </ListSubheader>
            }
          >
            {[
              { text: "Add Role Dialog", view: "addrole" },
              { text: "App Details", view: "appdetails" },
              { text: "User Details", view: "userdetails" },
              { text: "Invitation Details", view: "invitationdetails" },
              { text: "Role Details", view: "roledetails" }
            ].map(({ text, view }, index) => (
              <ListItem button key={text} onClick={() => onChangeView(view)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default AdminAppBar;
