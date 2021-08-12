export const users = [
  { name: { first: "Ken", last: "Gregory" }, email: "kjg@gmail.com" },
  {
    name: { first: "Bob", last: "Quigley" },
    email: "robertquigleysemimanager@gmail.com"
  },
  {
    name: { first: "Matt", last: "Damaskowski" },
    email: "mattydapunisher1999@gmail.com"
  },
  {
    name: { first: "Wolfgang", last: "Traumlisch" },
    email: "wolfgang@gmail.com"
  },
  {
    name: { first: "Snarl", last: "Boddington" },
    email: "iamnotbobquigley@aol.com"
  },
  {
    name: { first: "Johnny", last: "Boombohnny" },
    email: "johnnyboomz@yahoo.com"
  }
];

export const permissions = [
  {
    category: "CXM",
    description: "Remove assigned associates from a Relationship",
    active: true,
    inherited: false
  },
  {
    category: "CXM",
    description: "View and filter all Relationships in your location by owner",
    active: false,
    inherited: false
  },
  {
    category: "CXM",
    description: "View and filter all Opportunities in your location by owner",
    active: false,
    inherited: false
  },
  {
    category: "CXM",
    description: "View and filter all Activities in your location by owner",
    active: false,
    inherited: false
  },
  {
    category: "CXM",
    description: "Viewing store level Dashboard",
    active: true,
    inherited: false
  },
  {
    category: "Admin",
    description: "Administer the workspace",
    active: false,
    inherited: false
  },
  {
    category: "Point of Sale",
    description: "Override cart line price",
    active: true,
    inherited: true
  },
  {
    category: "Point of Sale",
    description: "Play Gilligans_Island.midi when Checkout is initiated",
    active: true,
    inherited: true
  }
];

export const inheritedPermissions = [
  { description: "Override cart line price", active: true },
  {
    description: "Play Gilligans_Island.midi when Checkout is initiated",
    active: true
  }
];
