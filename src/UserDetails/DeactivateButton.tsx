import React from "react";
import createSvgIcon from "@material-ui/icons/utils/createSvgIcon";
import PersonIcon from "@material-ui/icons/Person";
import CardButton from "core/components/CardButton";

const PersonOffIcon = createSvgIcon(
  <path d="M8.65 5.82C9.36 4.72 10.6 4 12 4c2.21 0 4 1.79 4 4 0 1.4-.72 2.64-1.82 3.35L8.65 5.82zM20 17.17c-.02-1.1-.63-2.11-1.61-2.62-.54-.28-1.13-.54-1.77-.76L20 17.17zm1.19 4.02L2.81 2.81 1.39 4.22l8.89 8.89c-1.81.23-3.39.79-4.67 1.45-1 .51-1.61 1.54-1.61 2.66V20h13.17l2.61 2.61 1.41-1.42z" />,
  "PersonOff"
);

const DeactivateButton = () => {
  const [active, setActive] = React.useState(true);
  return (
    <CardButton
      dialogText={
        active ? "The user will be deactivated." : "The user will be activated."
      }
      label={active ? "Deactivate" : "Activate"}
      icon={active ? <PersonOffIcon /> : <PersonIcon />}
      onAffirmative={() => {
        setActive(!active);
      }}
    />
  );
};

export default DeactivateButton;
