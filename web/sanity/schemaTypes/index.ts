import type { SchemaTypeDefinition } from "sanity";

import { eventArticle } from "./documents/eventArticle";
import { siteSettings } from "./documents/siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  eventArticle,
];
