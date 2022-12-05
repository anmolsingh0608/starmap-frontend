import React from "react";

const globalState = {
    text: "foo",
  };
const RoleContext = React.createContext(globalState);

export default RoleContext;