import cookie from "cookie";
import { IncomingMessage } from "http";

export const parseCookies = (req?: IncomingMessage) => {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || "");
};
