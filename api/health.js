const { MODEL, BASE_URL, API_KEY, sendJson, handleOptions } = require("./_shared");

module.exports = async function handler(req, res) {
  if (handleOptions(req, res)) return;
  sendJson(res, 200, {
    aiEnabled: Boolean(API_KEY),
    model: MODEL,
    baseUrl: BASE_URL.replace(/^https?:\/\//, "")
  });
};
