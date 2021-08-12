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

export const roles = [
  { description: "Workspace Administrator" },
  { description: "Manager" },
  { description: "Sales Associate" },
  {
    description:
      "Semi-Manager (ONLY ASSIGN TO BOB QUIGLEY OR YOU WILL BE FIRED)"
  }
];

export const users = [
  {
    name: { first: "Ken", last: "Gregory" },
    email: "kjg@gmail.com",
    createdAt: new Date("1980-07-25T23:50:00").toISOString(),
    lastActivity: new Date().toISOString(),
    userId: "KJG"
  },
  {
    name: { first: "Bob", last: "Quigley" },
    email: "robertquigleysemimanager@gmail.com",
    createdAt: new Date("1955-06-25T23:50:00").toISOString(),
    lastActivity: new Date().toISOString(),
    userId: "BQ"
  },
  {
    name: { first: "Matt", last: "Damaskowski" },
    email: "mattydapunisher1999@gmail.com",
    createdAt: new Date("1990-03-25T23:50:00").toISOString(),
    lastActivity: new Date().toISOString(),
    userId: "MDP"
  },
  {
    name: { first: "Wolfgang", last: "Traumlisch" },
    email: "wolfgang@gmail.com",
    createdAt: new Date("1950-02-25T23:50:00").toISOString(),
    lastActivity: new Date().toISOString(),
    userId: "WAT"
  },
  {
    name: { first: "Snarl", last: "Boddington" },
    email: "iamnotbobquigley@aol.com",
    createdAt: new Date("1960-01-25T23:50:00").toISOString(),
    lastActivity: new Date().toISOString(),
    userId: "SZB"
  },
  {
    name: { first: "Johnny", last: "Boombohnny" },
    email: "johnnyboomz@yahoo.com",
    createdAt: new Date("1970-12-25T23:50:00").toISOString(),
    lastActivity: new Date().toISOString(),
    userId: "JBB"
  }
];

export const userGroups = [
  { description: "Managers" },
  { description: "Associates With Keys" },
  { description: "Associates" },
  { description: "All Employees" },
  { description: "Senior Managers" },
  { description: "Salespeople" },
  { description: "Everyone except for Bob Quigley" },
  { description: "Bob Quigley and those like him" }
];
