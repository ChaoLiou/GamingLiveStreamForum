export default {
  groupby,
  random,
  randomString
};

function groupby(list, key) {
  const result = [];
  list.forEach(item => {
    const temp = result.find(x => x.key === item[key]);
    if (temp) {
      temp.list.push(item);
    } else {
      result.push({ key: item[key], list: [item] });
    }
  });
  return result;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 *
 * @param {*} length
 * @param {*} chars 'aA' for alphabet, '#' for numeric and '!' for marks
 */
function randomString(length, chars) {
  var mask = "";
  if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
  if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (chars.indexOf("#") > -1) mask += "0123456789";
  if (chars.indexOf("!") > -1) mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
  var result = "";
  for (var i = length; i > 0; --i)
    result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}
