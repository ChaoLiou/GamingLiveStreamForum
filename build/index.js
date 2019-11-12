const grs = require("git-rev-sync");
const fs = require("fs");
fs.writeFileSync(
  "./build/rev.json",
  JSON.stringify({
    short: grs.short(),
    long: grs.long(),
    build_dt:
      new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString()
  }),
  {
    encoding: "utf8",
    flag: "w"
  }
);
