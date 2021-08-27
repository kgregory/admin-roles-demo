const getFullName = (
  name?: {
    prefix?: string | null;
    first?: string | null;
    middle?: string | null;
    last?: string | null;
    suffix?: string | null;
  } | null,
  defaultName: string | null = null
): string | null =>
  [name?.prefix, name?.first, name?.middle, name?.last, name?.suffix]
    .filter((part) => part != null)
    .join(" ") || defaultName;

export default getFullName;
