import React from "react";
import { format, parseISO, formatDuration, intervalToDuration } from "date-fns";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

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

interface DetailsCardProps {
  name: string;
  createdAt: string;
  lastActivity: string;
}

const DetailsCard = ({ name, createdAt, lastActivity }: DetailsCardProps) => {
  const classes = useStyles();
  const dateDifference = getDateTimeDifferenceDisplayText(lastActivity);
  const titleSuffix = dateDifference != null ? ` — ${dateDifference}` : "";

  const initials = React.useMemo(() => {
    /** this is awful, i am sorry */
    const words = name.split(" ");
    const first = words[0];
    const last = words[words.length - 1];
    const firstInitial = (first || "").match(/^[a-z]/gi) || [];
    const lastInitial = (last || "").match(/^[a-z]/gi) || [];
    const userInitials = [...firstInitial, ...lastInitial]
      .join("")
      .toUpperCase();
    return userInitials !== "" ? userInitials : undefined;
  }, [name]);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{initials}</Avatar>}
        title={`${name}${titleSuffix}`}
        subheader={
          createdAt != null
            ? format(parseISO(createdAt), "MM/dd/yyyy")
            : undefined
        }
        classes={{ content: classes.content }}
      />
    </Card>
  );
};

export default DetailsCard;
