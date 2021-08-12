import React from "react";
import { format, parseISO, formatDuration, intervalToDuration } from "date-fns";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EmailIcon from "@material-ui/icons/Email";

const getFullName = (
  name?: {
    prefix?: string | null;
    first?: string | null;
    middle?: string | null;
    last?: string | null;
    suffix?: string | null;
  } | null,
  defaultName: string | null = null
): string | null =>
  [name?.prefix, name?.first, name?.middle, name?.last, name?.suffix]
    .filter((part) => part != null)
    .join(" ") || defaultName;

const getDateTimeDifferenceDisplayText = (
  date?: string | number | Date | null
): string | null => {
  if (date == null) {
    return null;
  }

  const start = new Date(date);
  const duration = intervalToDuration({
    start,
    end: new Date()
  });

  // present the largest span of time or `Today`
  const delimiter = ",";
  const [lastActive] = formatDuration(duration, {
    format: ["years", "months", "days"],
    delimiter
  }).split(delimiter);
  const lastActiveText = lastActive !== "" ? `${lastActive} ago` : "Today";

  return lastActiveText;
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main
  },
  icon: {
    marginLeft: theme.spacing(1)
  },
  content: {
    wordBreak: "break-word"
  }
}));

const ContactCard = ({
  createdAt,
  lastActivity,
  name = { first: "Unnamed", last: "User" },
  email
}) => {
  const classes = useStyles();
  const dateDifference = getDateTimeDifferenceDisplayText(lastActivity);
  const titleSuffix = dateDifference != null ? ` — ${dateDifference}` : "";

  const initials = React.useMemo(() => {
    const { first, last } = name || {};
    const firstInitial = (first || "").match(/^[a-z]/gi) || [];
    const lastInitial = (last || "").match(/^[a-z]/gi) || [];
    const userInitials = [...firstInitial, ...lastInitial]
      .join("")
      .toUpperCase();
    return userInitials !== "" ? userInitials : undefined;
  }, [name]);

  const fullName = React.useMemo(() => getFullName(name) || undefined, [name]);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{initials}</Avatar>}
        title={`${fullName}${titleSuffix}`}
        subheader={
          createdAt != null
            ? format(parseISO(createdAt), "MM/dd/yyyy")
            : undefined
        }
        classes={{ content: classes.content }}
      />
      {email && (
        <CardContent>
          <List disablePadding>
            <ListItem disableGutters>
              <ListItemIcon>
                <EmailIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Link href={`mailto:${email}`} color="secondary">
                    {email}
                  </Link>
                }
                primaryTypographyProps={{ noWrap: true }}
              />
            </ListItem>
          </List>
        </CardContent>
      )}
    </Card>
  );
};

export default ContactCard;
