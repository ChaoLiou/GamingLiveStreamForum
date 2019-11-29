import configs from "@/assets/json/configs";
export default {
  fviewers,
  fdate,
  fstring,
  fsource,
  fpreview,
  favatar,
  fscores
};

function fscores(scores, unit = 3) {
  if (!scores) {
    return;
  }
  const res = [];
  const scores_parts_reversed = [...`${scores}`].reverse();
  scores_parts_reversed.forEach((x, i) => {
    if (i && i % unit === 0) {
      res.unshift(",");
    }
    res.unshift(x);
  });
  return res.join("");
}

function fviewers(viewers, locale = "zh-cn") {
  if (!viewers) return "";
  const map = { "zh-tw": ["萬", "億"], "zh-cn": ["万", "亿"] }[locale];
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

function fstring(template, args) {
  let fsting_result = template;
  let rex_result = {};
  while (rex_result) {
    rex_result = /{(\d)}/.exec(fsting_result);
    if (rex_result) {
      const target = rex_result[0];
      const index = parseInt(rex_result[1]);
      if (args.length > index) {
        const arg = args[index];
        fsting_result = fsting_result.replace(target, arg);
      } else {
        break;
      }
    }
  }
  return fsting_result;
}

function fsource(stream) {
  let args = [];
  const config = configs[stream.src];
  switch (stream.src) {
    case "douyu":
      args = [config.aid, stream.roomId];
      break;
    default:
      break;
  }
  return config ? fstring(config.sourceTemplate, args) : "about:blank";
}

function fpreview(stream) {
  switch (stream.src) {
    case "bilibili":
      return stream.roomImg.replace("https:", "http:");
    case "now":
      return stream.roomImg.replace("/360x", "/");
    case "huya":
      return stream.roomImg.replace("w_338,h_190", "w_1280,h_720");
    default:
      return stream.roomImg;
  }
}

function favatar(stream) {
  switch (stream.src) {
    case "bilibili":
      return stream.avatar.replace("https:", "http:") + "@100w_100h.webp";
    default:
      return stream.avatar;
  }
}
