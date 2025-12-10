export default async function parseJSONBody(reqBody) {
  let body = "";
  try {
    for await (const chunk of reqBody) {
      body += chunk;
    }
    return JSON.parse(body);
  } catch (error) {
    throw new Error(`Invalid JSON format: ${error}`);
  }
}
