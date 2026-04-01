"use client";

import { createContext, useContext } from "react";

type NestedRecord = { [key: string]: NestedRecord | string };

interface I18nContext {
  locale: string;
  messages: NestedRecord;
}

const Ctx = createContext<I18nContext>({ locale: "fr", messages: {} });

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: NestedRecord;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={{ locale, messages }}>{children}</Ctx.Provider>;
}

export function useLocale(): string {
  return useContext(Ctx).locale;
}

/** Mimics next-intl's useTranslations(namespace) API */
export function useTranslations(namespace: string) {
  const { messages } = useContext(Ctx);

  const t = function (key: string): string {
    const fullKey = `${namespace}.${key}`;
    const parts = fullKey.split(".");
    let current: NestedRecord | string = messages;

    for (const part of parts) {
      if (typeof current !== "object" || current === null) return key;
      current = (current as NestedRecord)[part];
      if (current === undefined) return key;
    }

    return typeof current === "string" ? current : key;
  };

  // Add raw method to get arrays and objects
  t.raw = function (key: string): any {
    const fullKey = `${namespace}.${key}`;
    const parts = fullKey.split(".");
    let current: any = messages;

    for (const part of parts) {
      if (typeof current !== "object" || current === null) return undefined;
      current = current[part];
      if (current === undefined) return undefined;
    }

    return current;
  };

  return t;
}
