const distanceNormalize = (distance: number) => {
  if (distance < 0.5) {
    return "Nearby";
  } else if (distance < 1) {
    return "1mi away";
  } else if (distance < 2) {
    return "2mi away";
  } else if (distance < 5) {
    return "5mi away";
  } else {
    return "Far away";
  }
};

export default distanceNormalize;
