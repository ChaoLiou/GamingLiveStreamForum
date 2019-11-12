export default {
  fviewers,
  fdate
};

function fviewers(viewers) {
  if (!viewers) return "";
  const map = ["萬", "億"];
  const unit = 10000;
  let viewers_double = viewers;
  let viewers_integer = Math.floor(viewers_double);
  let index = 0;
  while (viewers_integer / unit >= 1) {
    viewers_double = viewers_double / unit;
    viewers_integer = Math.floor(viewers_double);
    index++;
  }
  return `${
    index > 0 ? parseFloat(viewers_double.toFixed(1)) + map[index - 1] : viewers
  }`;
}

function fdate(date) {
  const dateObj = new Date(date);
  return `${dateObj.getMonth() + 1} 月 ${dateObj.getDate()} 日`;
}
