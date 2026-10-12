export interface TocEntry {
  number: string;
  translationKey: string;
  page: number;
}

export interface MagazineIssue {
  slug: string;
  issueNumber: string;
  totalPages: number;
  coverImage: string;
  toc: TocEntry[];
}

export const issues: MagazineIssue[] = [
  {
    slug: "02-tussen-werelden",
    issueNumber: "01",
    totalPages: 24,
    coverImage: "/magazine/02-tussen-werelden/cover.jpg",
    toc: [
      { number: "01", translationKey: "toc01", page: 4 },
      { number: "02", translationKey: "toc02", page: 5 },
      { number: "03", translationKey: "toc03", page: 6 },
      { number: "04", translationKey: "toc04", page: 7 },
      { number: "05", translationKey: "toc05", page: 8 },
      { number: "06", translationKey: "toc06", page: 10 },
      { number: "07", translationKey: "toc07", page: 12 },
      { number: "08", translationKey: "toc08", page: 14 },
      { number: "09", translationKey: "toc09", page: 15 },
      { number: "10", translationKey: "toc10", page: 16 },
      { number: "11", translationKey: "toc11", page: 17 },
      { number: "12", translationKey: "toc12", page: 18 },
      { number: "13", translationKey: "toc13", page: 20 },
      { number: "14", translationKey: "toc14", page: 22 },
    ],
  },
];

export function getIssue(slug: string): MagazineIssue | null {
  return issues.find((i) => i.slug === slug) ?? null;
}

export function getAllIssueSlugs(): string[] {
  return issues.map((i) => i.slug);
}
