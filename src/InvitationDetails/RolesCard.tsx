import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import StickyListSubheader from "core/components/StickyListSubheader";
import { roles } from "core/constants/data";

interface RolesCardProps {
  onRoleClick: () => void;
}

const RolesCard = ({ onRoleClick }: RolesCardProps) => {
  const sortedRoles = React.useMemo(
    () =>
      roles.slice(0).sort((a, b) => a.description.localeCompare(b.description)),
    []
  );

  return (
    <Paper>
      <List
        subheader={
          <StickyListSubheader component="div" id={`invitation-details-roles`}>
            Roles
          </StickyListSubheader>
        }
      >
        {sortedRoles.map(({ description: role }) => (
          <ListItem key={role} button onClick={onRoleClick}>
            <ListItemText id={`role-${role}`} primary={role} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RolesCard;
