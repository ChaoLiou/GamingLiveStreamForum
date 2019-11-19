export default {
  groupby,
  random
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
