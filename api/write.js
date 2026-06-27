const {
  writeSchema,
  sendJson,
  handleOptions,
  readBody,
  callOpenAI,
  buildWriterInstructions
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
      writingMode: String(body.mode || "stable"),
      alias: String(body.alias || "作文勇士")
    });
    const result = await callOpenAI({
      instructions: buildWriterInstructions(),
      input,
      schema: writeSchema,
      schemaName: "gaokao_essay_write",
      maxOutputTokens: 2600
    });
    sendJson(res, 200, result);
  } catch (error) {
    sendJson(res, Number(error.status || 500), { error: error.message || "server error" });
  }
};
