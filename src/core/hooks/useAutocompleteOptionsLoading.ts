import React from "react";
import delay from "/src/core/utils/delay";
import useIsMounted from "./useIsMounted";

const useAutocompleteOptionsLoading = () => {
  const isMounted = useIsMounted();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      await delay(3000);
      if (isMounted) {
        setLoading(false);
      }
    })();
  }, [isMounted]);

  return loading;
};

export default useAutocompleteOptionsLoading;
