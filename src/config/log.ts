import morgan from "morgan";
import path from "path";
import fs from "fs";

const logs = morgan("combined", {
  skip: function (req, res) {
    return res.statusCode < 400;
  },
  stream: fs.createWriteStream(
    path.join(process.cwd(), "/storage/logs/access.log"),
    {
      flags: "a",
    }
  ),
});

export default logs;
