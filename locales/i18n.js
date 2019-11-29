const zhCn = require("./zh-cn.json");
const zhTw = require("./zh-tw.json");

module.exports = {
  locales: ["zh-cn", "zh-tw"],
  defaultLocale: "zh-cn",
  vueI18n: {
    fallbackLocale: "zh-cn",
    messages: {
      "zh-cn": zhCn,
      "zh-tw": zhTw
    }
  }
};
