const {
  gradeSchema,
  sendJson,
  handleOptions,
  readBody,
  callOpenAI,
  buildGraderInstructions
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
      playerPrompt: String(body.prompt || ""),
      essay: String(body.essay || ""),
      alias: String(body.alias || "作文勇士")
    });
    const result = await callOpenAI({
      instructions: buildGraderInstructions(),
      input,
      schema: gradeSchema,
      schemaName: "gaokao_essay_grade",
      maxOutputTokens: 1200
    });
    sendJson(res, 200, result);
  } catch (error) {
    sendJson(res, Number(error.status || 500), { error: error.message || "server error" });
  }
};
