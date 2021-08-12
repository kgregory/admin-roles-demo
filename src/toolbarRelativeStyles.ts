/**
 * we do this because the app bar's height is dynamic based on the viewport size
 */
const toolbarRelativeStyles = (property, theme, modifier = (value) => value) =>
  Object.keys(theme.mixins.toolbar).reduce((style, key) => {
    const value = theme.mixins.toolbar[key];
    if (key === "minHeight") {
      return { ...style, [property]: modifier(value) };
    }
    if (value.minHeight !== undefined) {
      return { ...style, [key]: { [property]: modifier(value.minHeight) } };
    }
    return style;
  }, {});

export default toolbarRelativeStyles;
