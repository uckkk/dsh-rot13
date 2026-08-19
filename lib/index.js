// dsh-rot13 — ROT13 凯撒位移（字母旋转 13 位）。纯 Node。
import { defineTool } from "@deepseek-ai/dsh-tools";

const name = "ROT13";
const inject = ["tools"];

function rot13(text) {
  return String(text).replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

async function apply(ctx, _config) {
  ctx.tools.register(defineTool({
    name: "rot13",
    description: "对文本做 ROT13 位移（字母旋转 13 位；对 ROT13 再次调用即还原）。常用于隐藏剧透/答案。",
    parameters: { text: { type: "string", required: true, description: "要处理的文本。" } },
    output: {
      schema: {
        type: "object", additionalProperties: false,
        properties: { output: { type: "string", required: true } },
      },
      render: (_a, v) => [{ type: "text", text: v.output }],
    },
    execute: async (args) => ({ output: rot13(args.text) }),
  }));
}

export { apply, inject, name };
