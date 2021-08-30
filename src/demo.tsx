import React from "react";
import useDialog from "core/hooks/useDialog";
import type { DemoView } from "core/types";
import UserDetails from "./UserDetails";
import RoleDetails from "./RoleDetails";
import InvitationDetails from "./InvitationDetails";
import AppDetails from "./AppDetails";
import AddRole from "./AddRole";

interface DemoState {
  view: DemoView;
}

const initialState: DemoState = {
  view: "userdetails"
};

const reducer: React.Reducer<DemoState, { type: string; view: DemoView }> = (
  state: DemoState,
  action
) => {
  // sorry, this is a demo and I'm hacking this together
  if (action.type === "setView" && action.view !== "addrole") {
    window.scroll(0, 0);
    return { view: action.view };
  }
  return state;
};

interface ViewProps extends DemoState {
  onChangeView: (view: DemoView) => void;
}

const View = ({ view, onChangeView }: ViewProps) => {
  switch (view) {
    case "userdetails":
      return <UserDetails onChangeView={onChangeView} />;
    case "roledetails":
      return <RoleDetails onChangeView={onChangeView} />;
    case "invitationdetails":
      return <InvitationDetails onChangeView={onChangeView} />;
    case "appdetails":
      return <AppDetails onChangeView={onChangeView} />;
    default:
      return <div>No, that's not permitted. You shouldn't be seeing this.</div>;
  }
};

export default function AdminAppDemo() {
  const addRoleDialog = useDialog();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onChangeView = React.useCallback(
    (view) => {
      if (view === "addrole") {
        addRoleDialog.onOpen();
      } else {
        dispatch({ type: "setView", view });
      }
    },
    [addRoleDialog]
  );

  return (
    <>
      <View view={state.view} onChangeView={onChangeView} />
      <AddRole {...addRoleDialog} dialogState={"initial"} />
    </>
  );
}
