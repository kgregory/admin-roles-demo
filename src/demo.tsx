import React from "react";
import UserDetails from "./UserDetails";
import RoleDetails from "./RoleDetails";

interface DemoState {
  view: "userdetails" | "roledetails";
}

const initialState: DemoState = {
  view: "userdetails"
};

const reducer = (state: DemoState, action) => {
  switch (action.type) {
    case "setView":
      window.scroll(0, 0);
      return { view: action.view };
    default:
      throw new Error("unsupported action");
  }
};

export default function AdminAppDemo() {
  const [state, dispatch] = React.useReducer<typeof reducer>(
    reducer,
    initialState
  );

  const onChangeView = React.useCallback(
    (view) => dispatch({ type: "setView", view }),
    []
  );

  switch (state.view) {
    case "userdetails":
      return <UserDetails onChangeView={onChangeView} />;
    case "roledetails":
      return <RoleDetails onChangeView={onChangeView} />;
    default:
      return <div>No</div>;
  }
}
