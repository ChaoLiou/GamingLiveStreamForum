const grs = require("git-rev-sync");
const fs = require("fs");
fs.writeFileSync(
  "./build/rev.json",
  JSON.stringify({
    version: grs.short(),
    build_dt:
      new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString()
  }),
  {
    encoding: "utf8",
    flag: "w"
  }
);
