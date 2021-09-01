import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";

function AppActiveIcon(app) {
  return app.isEnabledOnPlatform && app.isActive ? (
    <CheckOutlinedIcon />
  ) : (
    (!app.isEnabledOnPlatform && <IndeterminateCheckBoxOutlinedIcon />) || null
  );
}

export default AppActiveIcon;
