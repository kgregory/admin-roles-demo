import { formatDuration, intervalToDuration } from "date-fns";

const getDateTimeDifferenceText = (
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

export default getDateTimeDifferenceText;
