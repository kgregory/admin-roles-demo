import type { Theme } from "@material-ui/core/styles";
import type { CSSProperties } from "@material-ui/core/styles/withStyles";

/**
 * TypeGuard to determine if `propName` is a property of the unknown `data`
 */
const isPropertyOfUnknown = <K extends PropertyKey>(
  propName: K,
  data: Record<string, any>
): data is Record<K, unknown> => propName in data;

/**
 * toolbarRelativeStyles
 * Construct a style object that sets the specified property to a value based on material-ui toolbar height
 */
const toolbarRelativeStyles = (
  property: string,
  theme: Theme,
  modifier: (value: unknown) => unknown | CSSProperties = (value) => value
): CSSProperties =>
  Object.keys(theme.mixins.toolbar).reduce((style, key) => {
    const value: unknown | CSSProperties = theme.mixins.toolbar[key];
    if (key === "minHeight") {
      // base `minHeight` property
      return { ...style, [property]: modifier(value) };
    }
    if (
      typeof value === "object" &&
      value !== null &&
      isPropertyOfUnknown("minHeight", value)
    ) {
      // inner CSSProperties object containing its own `minHeight` property
      return { ...style, [key]: { [property]: modifier(value.minHeight) } };
    }
    return style;
  }, {});

export default toolbarRelativeStyles;
