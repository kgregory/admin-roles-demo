import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CardButton from "core/components/CardButton";

const DeleteButton = () => (
  <CardButton
    dialogText="This invitation will be deleted."
    label="Delete"
    icon={<DeleteIcon />}
  />
);

export default DeleteButton;
