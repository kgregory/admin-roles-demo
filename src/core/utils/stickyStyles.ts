import type { Theme } from "@material-ui/core/styles";
import toolbarRelativeStyles from "./toolbarRelativeStyles";

const stickyStyles = (
  theme: Theme,
  {
    sticky = true,
    backgroundColor = theme.palette.background.paper,
    stuckToolbars = 1,
    zIndex = 11
  } = {}
) => {
  return sticky
    ? {
        zIndex,
        position: "sticky",
        backgroundColor,
        ...toolbarRelativeStyles(
          "top",
          theme,
          (value) => value * stuckToolbars - 1 * stuckToolbars
        )
      }
    : {};
};

export default stickyStyles;
