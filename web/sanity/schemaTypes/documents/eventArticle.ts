import { defineField, defineType } from "sanity";

export const eventArticle = defineType({
  name: "eventArticle",
  title: "Living Journey / Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      options: {
        list: [
          { title: "NL", value: "nl" },
          { title: "EN", value: "en" },
        ],
        layout: "radio",
      },
      initialValue: "nl",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "flipbookUrl",
      title: "Flipbook / embed URL",
      type: "url",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", locale: "locale" },
    prepare({ title, locale }) {
      return { title, subtitle: locale };
    },
  },
});
