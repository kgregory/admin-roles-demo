import React from "react";
import UserDetails from "./UserDetails";
import RoleDetails from "./RoleDetails";
import InvitationDetails from "./InvitationDetails";
import AppDetails from "./AppDetails";

interface DemoState {
  view: "userdetails" | "roledetails" | "invitationdetails" | "appdetails";
}

const initialState: DemoState = {
  view: "userdetails"
};

const reducer = (state: DemoState, action: { type: string; view: string }) => {
  switch (action.type) {
    case "setView":
      window.scroll(0, 0);
      return { view: action.view };
    default:
      return state;
  }
};

export default function AdminAppDemo() {
  const [state, dispatch] = React.useReducer(reducer, initialState, (s) => s);

  const onChangeView = React.useCallback(
    (view) => dispatch({ type: "setView", view }),
    []
  );

  switch (state.view) {
    case "userdetails":
      return <UserDetails onChangeView={onChangeView} />;
    case "roledetails":
      return <RoleDetails onChangeView={onChangeView} />;
    case "invitationdetails":
      return <InvitationDetails onChangeView={onChangeView} />;
    case "appdetails":
      return <AppDetails onChangeView={onChangeView} />;
    default:
      return <div>No</div>;
  }
}
