import React from "react";
import AppsIcon from "@material-ui/icons/Apps";
import CardButton from "core/components/CardButton";
import NotInterestedOutlinedIcon from "@material-ui/icons/NotInterestedOutlined";

const DeactivateButton = () => {
  const [active, setActive] = React.useState(true);
  return (
    <CardButton
      dialogText={
        active
          ? "The app will be deactivated in the workspace."
          : "The app will be activated in the workspace"
      }
      label={active ? "Deactivate" : "Activate"}
      icon={active ? <NotInterestedOutlinedIcon /> : <AppsIcon />}
      onAffirmative={() => {
        setActive(!active);
      }}
    />
  );
};

export default DeactivateButton;
