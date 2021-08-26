import React from "react";
import delay from "./delay";

const useAutocompleteOptionsLoading = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      await delay(2000);
      setLoading(false);
    })();
  }, []);

  return loading;
};

export default useAutocompleteOptionsLoading;
