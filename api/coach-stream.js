const {
  sendJson,
  handleOptions,
  readBody,
  streamOpenAIText,
  buildCoachStreamInstructions
} = require("./_shared");

module.exports = async function handler(req, res) {
  if (handleOptions(req, res)) return;
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "method not allowed" });
    return;
  }

  try {
    const body = await readBody(req);
    const input = JSON.stringify({
      question: body.question,
      playerPrompt: String(body.userPrompt || ""),
      essay: String(body.essay || ""),
      instruction: String(body.instruction || ""),
      action: String(body.action || "custom"),
      mode: String(body.mode || "stable"),
      shouldRewrite: Boolean(body.shouldRewrite),
      history: Array.isArray(body.history) ? body.history.slice(-10) : [],
      alias: String(body.alias || "作文勇士")
    });
    await streamOpenAIText({
      res,
      instructions: buildCoachStreamInstructions(),
      input,
      maxOutputTokens: 2600
    });
  } catch (error) {
    sendJson(res, Number(error.status || 500), { error: error.message || "server error" });
  }
};
