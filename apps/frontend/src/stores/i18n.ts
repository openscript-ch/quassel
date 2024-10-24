import { createI18n, localeFrom, browser, formatter } from "@nanostores/i18n";
import { persistentAtom } from "@nanostores/persistent";

export const setting = persistentAtom<string | undefined>("locale", "de");

export const locale = localeFrom(
  setting,
  browser({
    available: ["de", "en"],
    fallback: "de",
  })
);

export const format = formatter(locale);

export const i18n = createI18n(locale, {
  baseLocale: "en",
  get(code) {
    switch (code) {
      case "de":
        return import("../translations/de.json");
      default:
        throw new Error(`Locale ${code} is not supported.`);
    }
  },
});
