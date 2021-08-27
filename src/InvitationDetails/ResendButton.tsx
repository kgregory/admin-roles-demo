import React from "react";
import SendIcon from "@material-ui/icons/Send";
import CardButton from "core/components/CardButton";

const DeactivateButton = () => (
  <CardButton label="Resend Email" icon={<SendIcon />} />
);

export default DeactivateButton;
