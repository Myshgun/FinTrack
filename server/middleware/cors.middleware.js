const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
