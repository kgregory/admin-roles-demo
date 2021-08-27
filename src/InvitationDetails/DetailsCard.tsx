import React from "react";
import { formatDuration, intervalToDuration, isAfter } from "date-fns";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import EmailIcon from "@material-ui/icons/Email";

const getDateTimeDifferenceDisplayText = (args: {
  start?: string | number | Date | null;
  end?: string | number | Date | null;
}): string | null => {
  if (args.start == null && args.end == null) {
    return null;
  }

  const start = args.start == null ? new Date() : new Date(args.start);
  const end = args.end == null ? new Date() : new Date(args.end);

  const duration = intervalToDuration({ start, end });

  // present the largest span of time or `Today`
  const delimiter = ",";
  const [displayText] = formatDuration(duration, {
    format: ["years", "months", "days"],
    delimiter
  }).split(delimiter);

  if (isAfter(end, start)) {
    return displayText !== "" ? `Expires in ${displayText}` : "Expired Today";
  }

  return displayText !== "" ? `Expired ${displayText} ago` : "Expired Today";
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
  email: string;
  expirationDate: string;
}

const DetailsCard = ({ email, expirationDate }: DetailsCardProps) => {
  const classes = useStyles();
  const dateDifference = getDateTimeDifferenceDisplayText({
    end: expirationDate
  });

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <EmailIcon />
          </Avatar>
        }
        title={email}
        subheader={dateDifference}
        classes={{ content: classes.content }}
      />
    </Card>
  );
};

export default DetailsCard;
