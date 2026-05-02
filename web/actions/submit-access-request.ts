"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const accessSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "nameTooShort")
    .max(120, "nameTooLong"),
  email: z.string().trim().email("emailInvalid"),
  intent: z
    .string()
    .trim()
    .min(40, "intentTooShort")
    .max(8000, "intentTooLong"),
});

export type AccessActionState =
  | null
  | { ok: true }
  | {
      ok: false;
      formError?: "server";
      fieldErrors?: Partial<Record<"name" | "email" | "intent", string>>;
    };

export async function submitAccessRequest(
  _prev: AccessActionState,
  formData: FormData,
): Promise<AccessActionState> {
  const localeRaw = formData.get("locale");
  const locale = localeRaw === "en" ? "en" : "nl";

  const parsed = accessSchema.safeParse({
    name: typeof formData.get("name") === "string" ? formData.get("name") : "",
    email:
      typeof formData.get("email") === "string" ? formData.get("email") : "",
    intent:
      typeof formData.get("intent") === "string"
        ? formData.get("intent")
        : "",
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<"name" | "email" | "intent", string>> = {};
    const flat = parsed.error.flatten().fieldErrors;
    if (flat.name?.[0]) fieldErrors.name = flat.name[0];
    if (flat.email?.[0]) fieldErrors.email = flat.email[0];
    if (flat.intent?.[0]) fieldErrors.intent = flat.intent[0];
    return { ok: false, fieldErrors };
  }

  try {
    await prisma.accessRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        intent: parsed.data.intent,
        locale,
      },
    });
  } catch {
    return { ok: false, formError: "server" };
  }

  return { ok: true };
}
