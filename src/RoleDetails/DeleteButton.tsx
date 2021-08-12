import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CardButton from "../CardButton";

const DeleteButton = () => (
  <CardButton
    dialogText="This role will be deleted and removed from any users that currently have this role."
    label="Delete"
    icon={<DeleteIcon />}
  />
);

export default DeleteButton;
