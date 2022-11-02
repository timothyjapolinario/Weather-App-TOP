const getUTCTimeNow = function getCurrentTimeOfUTC() {
  const utcStr = new Date().toUTCString().split(" ")[4];
  const utcTimeNow = utcStr.slice(0, -3);
  return utcTimeNow;
};
const getCurrentTimeFromUTC = function subtractTimeZoneFromUTC(timeZone) {
  const utc = getUTCTimeNow();
  const utcHour = parseInt(utc.slice(0, 2));
  const timeZoneHour = parseInt(timeZone.slice(0, 3));
  let currentTime = utcHour + timeZoneHour;
  if (currentTime < 0) {
    currentTime *= -1;
  }

  return currentTime + utc.slice(2);
};

export { getCurrentTimeFromUTC };
