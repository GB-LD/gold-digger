export default function sendResponse(res, statusCode, fileType, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", fileType);
  res.end(payload);
}
