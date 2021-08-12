import toolbarRelativeStyles from "./toolbarRelativeStyles";

const stickyStyles = (
  theme,
  {
    sticky = true,
    backgroundColor = theme.palette.background.paper,
    stuckToolbars = 1
  } = {}
) => {
  return sticky
    ? {
        zIndex: 11,
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
