const fs = require("fs");
const path = require("path");

const appDir = path.join(__dirname, "../../app");

function scanDirectory(dir, routePrefix = "") {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file.startsWith("[") && file.endsWith("]")) {
        // Dynamic route
        console.log(`${routePrefix}/${file.replace(/[\[\]]/g, ":")}`);
      } else {
        scanDirectory(fullPath, `${routePrefix}/${file}`);
      }
    } else if (file === "page.js") {
      console.log(routePrefix || "/");
    }
  });
}

scanDirectory(appDir);
