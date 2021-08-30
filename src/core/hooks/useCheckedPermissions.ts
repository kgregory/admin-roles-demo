import React from "react";

/** sorry, this is a demo and I'm hacking this together */
const useCheckedPermissions = (
  items: { active: boolean; description: string }[]
) => {
  const [originalChecked, setOriginalChecked] = React.useState(
    items.map(({ active }) => active)
  );
  const [checked, setChecked] = React.useState(originalChecked);
  const [count, setCount] = React.useState(0);

  return React.useMemo(
    () => ({
      checked,
      count,
      originalChecked,
      setChecked,
      setCount,
      setOriginalChecked,
      handleToggle: (value: string) => () => {
        const currentIndex = items.findIndex(
          ({ description }) => description === value
        );
        const newChecked = [...checked];
        newChecked[currentIndex] = !newChecked[currentIndex];
        setChecked(newChecked);
        setCount((c) =>
          newChecked[currentIndex] !== originalChecked[currentIndex]
            ? (c += 1)
            : (c -= 1)
        );
      }
    }),
    [checked, count, items, originalChecked]
  );
};

export default useCheckedPermissions;
