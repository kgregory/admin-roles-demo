import React from "react";
import delay from "../utils/delay";

const useAutocompleteOptionsLoading = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      await delay(3000);
      setLoading(false);
    })();
  }, []);

  return loading;
};

export default useAutocompleteOptionsLoading;