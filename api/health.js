const { MODEL, BASE_URL, API_KEY, modelCandidates, sendJson, handleOptions } = require("./_shared");

module.exports = async function handler(req, res) {
  if (handleOptions(req, res)) return;
  sendJson(res, 200, {
    aiEnabled: Boolean(API_KEY),
    model: MODEL,
    fallbackModels: modelCandidates().slice(1),
    baseUrl: BASE_URL.replace(/^https?:\/\//, "")
  });
};
