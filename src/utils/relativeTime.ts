const relativeTime = (from: Date, to: Date) => {
  const relativeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  const diff = from.getTime() - to.getTime();

  const minutes = Math.floor(diff / 1000 / 60);

  if (Math.abs(minutes) < 60) {
    return relativeFormatter.format(minutes, "minute");
  } else {
    return relativeFormatter.format(Math.floor(minutes / 60), "hour");
  }
};

export default relativeTime;
