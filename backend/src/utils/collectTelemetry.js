// middleware/collectTelemetry.js
import requestIp from "request-ip";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite"; // local DB; consider maxmind for production

export function collectTelemetry(req) {
  // IP detection
  const ip =
    requestIp.getClientIp(req) ||
    req.ip ||
    req.connection?.remoteAddress ||
    null;

  // prefer the left-most value in X-Forwarded-For if behind proxies:
  const rawXff = req.headers["x-forwarded-for"];
  let xff;
  if (rawXff) {
    xff = String(rawXff)
      .split(",")
      .map((s) => s.trim())[0];
  }
  const clientIp = xff && xff !== "unknown" ? xff : ip;
  // UA parsing
  const uaRaw = req.headers["user-agent"] || "";
  const parser = new UAParser(uaRaw);
  const ua = parser.getResult();

  // Geo
  const geo = geoip.lookup(clientIp) || null; // { range, country, region, city, ll, metro, zip }

  const location = geo
    ? {
        country: geo.country,
        region: geo.region,
        city: geo.city,
        lat: geo.ll?.[0],
        lon: geo.ll?.[1],
        timezone: null,
        provider: "geoip-lite",
      }
    : null;
  // language
  const language = req.headers["accept-language"]?.split(",")?.[0] || null;
  // device detection
  const isMobile =
    !!(ua.device && ua.device.type === "mobile") || /mobile/i.test(uaRaw);
  // optional screen info — only possible if client sends it
  const screen = {
    width: req.body?.screenWidth || req.headers["x-screen-width"],
    height: req.body?.screenHeight || req.headers["x-screen-height"],
    pixelRatio:
      req.body?.devicePixelRatio || req.headers["x-device-pixelratio"],
  };
  return {
    ipaddress: clientIp,
    ipVersion: clientIp && clientIp.includes(":") ? "v6" : "v4",
    uaRaw,
    ua: {
      family: ua.browser?.name,
      major: ua.browser?.major,
      minor: ua.browser?.version,
      os: {
        family: ua.os?.name,
        major: ua.os?.major,
        minor: ua.os?.minor,
      },
      device: {
        model: ua.device?.model || "",
        vendor: ua.device?.vendor || "",
        type: ua.device?.type || "",
      },
    },
    isMobile,
    language,
    location,
    screen,
  };
}
