"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  submitAccessRequest,
  type AccessActionState,
} from "@/actions/submit-access-request";

const initialState: AccessActionState = null;

export function RequestAccessForm() {
  const t = useTranslations("accessForm");
  const tValidation = useTranslations("accessForm.validation");
  const locale = useLocale();
  const [state, action, pending] = useActionState(
    submitAccessRequest,
    initialState,
  );

  const fieldMessage = (
    code: string | undefined,
  ): string | undefined => {
    if (!code) return undefined;
    // Keys come from server Zod issue strings mapped 1:1 to JSON keys.
    return tValidation(
      code as
        | "nameTooShort"
        | "nameTooLong"
        | "emailInvalid"
        | "intentTooShort"
        | "intentTooLong",
    );
  };

  if (state?.ok === true) {
    return (
      <p className="mt-12 max-w-xl text-[length:var(--text-lg)] leading-relaxed text-lvn-fg-primary">
        {t("success")}
      </p>
    );
  }

  return (
    <form action={action} className="mt-12 space-y-8">
      <input type="hidden" name="locale" value={locale} />

      <p className="text-[length:var(--text-sm)] text-lvn-accent">{t("hint")}</p>

      {state?.ok === false && state.formError === "server" ? (
        <p className="text-[length:var(--text-sm)] text-red-400/90">
          {t("errorServer")}
        </p>
      ) : null}

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className="block text-[length:var(--text-xs)] uppercase tracking-[0.12em] text-lvn-fg-muted">
            {t("name")}
          </label>
          <input
            name="name"
            required
            minLength={2}
            disabled={pending}
            className="mt-2 w-full border border-lvn-border-subtle bg-lvn-bg-elevated px-3 py-2 text-[length:var(--text-base)] text-lvn-fg-primary outline-none ring-lvn-accent/40 transition-shadow focus-visible:ring-2"
          />
          {state?.ok === false && state.fieldErrors?.name ? (
            <p className="mt-2 text-[length:var(--text-xs)] text-lvn-accent">
              {fieldMessage(state.fieldErrors.name)}
            </p>
          ) : null}
        </div>
        <div>
          <label className="block text-[length:var(--text-xs)] uppercase tracking-[0.12em] text-lvn-fg-muted">
            {t("email")}
          </label>
          <input
            name="email"
            type="email"
            required
            disabled={pending}
            className="mt-2 w-full border border-lvn-border-subtle bg-lvn-bg-elevated px-3 py-2 text-[length:var(--text-base)] text-lvn-fg-primary outline-none ring-lvn-accent/40 transition-shadow focus-visible:ring-2"
          />
          {state?.ok === false && state.fieldErrors?.email ? (
            <p className="mt-2 text-[length:var(--text-xs)] text-lvn-accent">
              {fieldMessage(state.fieldErrors.email)}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label className="block text-[length:var(--text-xs)] uppercase tracking-[0.12em] text-lvn-fg-muted">
          {t("intent")}
        </label>
        <textarea
          name="intent"
          rows={8}
          required
          minLength={40}
          disabled={pending}
          className="mt-2 w-full border border-lvn-border-subtle bg-lvn-bg-elevated px-3 py-2 text-[length:var(--text-base)] text-lvn-fg-primary outline-none ring-lvn-accent/40 transition-shadow focus-visible:ring-2"
        />
        {state?.ok === false && state.fieldErrors?.intent ? (
          <p className="mt-2 text-[length:var(--text-xs)] text-lvn-accent">
            {fieldMessage(state.fieldErrors.intent)}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-sm border border-lvn-accent bg-lvn-accent px-10 py-3 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.16em] text-lvn-bg-base transition-colors hover:bg-lvn-fg-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
