export const permissions = [
  {
    description: "Remove assigned associates from a Relationship",
    active: true
  },
  {
    description: "View and filter all Relationships in your location by owner",
    active: false
  },
  {
    description: "View and filter all Opportunities in your location by owner",
    active: false
  },
  {
    description: "View and filter all Activities in your location by owner",
    active: false
  },
  { description: "Viewing store level Dashboard", active: true },
  { description: "Administer the workspace", active: false }
];

export const inheritedPermissions = [
  { description: "Override cart line price", active: true },
  {
    description: "Play Gilligans_Island.midi when Checkout is initiated",
    active: true
  }
];

export const roles = [
  { description: "Workspace Administrator" },
  { description: "Manager" },
  { description: "Sales Associate" },
  {
    description:
      "Semi-Manager (ONLY ASSIGN TO BOB QUIGLEY OR YOU WILL BE FIRED)"
  }
];
