import { boolean, integer, jsonb, pgTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const cuts = pgTable("cuts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar({ length: 120 }).notNull().unique(),
  category: varchar({ length: 80 }).notNull(),
  primaryPrimal: varchar("primary_primal", { length: 120 }).notNull(),
  secondaryPrimal: varchar("secondary_primal", { length: 120 }),
  muscleNames: jsonb("muscle_names").$type<string[]>().notNull().default([]),
  commonCookingMethods: jsonb("common_cooking_methods").$type<string[]>().notNull().default([]),
  relatedCutSlugs: jsonb("related_cut_slugs").$type<string[]>().notNull().default([]),
  relatedTermSlugs: jsonb("related_term_slugs").$type<string[]>().notNull().default([]),
  coverImageUrl: text("cover_image_url").notNull(),
  isPublished: boolean("is_published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const cutTranslations = pgTable("cut_translations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cutId: integer("cut_id").notNull().references(() => cuts.id, { onDelete: "cascade" }),
  locale: varchar({ length: 12 }).notNull(),
  name: varchar({ length: 160 }).notNull(),
  englishName: varchar("english_name", { length: 160 }).notNull(),
  aliases: jsonb().$type<string[]>().notNull().default([]),
  shortDefinition: text("short_definition").notNull(),
  overview: text().notNull(),
  locationDescription: text("location_description").notNull(),
  structureDescription: text("structure_description").notNull(),
  textureDescription: text("texture_description").notNull(),
  fatDescription: text("fat_description").notNull(),
  commonUses: text("common_uses").notNull(),
  namingNotes: text("naming_notes").notNull(),
  marketNotes: text("market_notes").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [uniqueIndex("cut_translations_cut_locale_idx").on(table.cutId, table.locale)]);

export const glossaryTerms = pgTable("glossary_terms", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar({ length: 120 }).notNull().unique(),
  category: varchar({ length: 80 }).notNull(),
  relatedTermSlugs: jsonb("related_term_slugs").$type<string[]>().notNull().default([]),
  isPublished: boolean("is_published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const glossaryTermTranslations = pgTable("glossary_term_translations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  termId: integer("term_id").notNull().references(() => glossaryTerms.id, { onDelete: "cascade" }),
  locale: varchar({ length: 12 }).notNull(),
  term: varchar({ length: 160 }).notNull(),
  englishTerm: varchar("english_term", { length: 160 }).notNull(),
  chineseTerm: varchar("chinese_term", { length: 160 }).notNull(),
  shortDefinition: text("short_definition").notNull(),
  explanation: text().notNull(),
  commonMisunderstandings: text("common_misunderstandings").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [uniqueIndex("glossary_term_translations_term_locale_idx").on(table.termId, table.locale)]);

export const origins = pgTable("origins", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar({ length: 120 }).notNull().unique(),
  countryCode: varchar("country_code", { length: 8 }).notNull(),
  commonGradeSystems: jsonb("common_grade_systems").$type<string[]>().notNull().default([]),
  relatedTermSlugs: jsonb("related_term_slugs").$type<string[]>().notNull().default([]),
  coverImageUrl: text("cover_image_url").notNull(),
  isPublished: boolean("is_published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const originTranslations = pgTable("origin_translations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  originId: integer("origin_id").notNull().references(() => origins.id, { onDelete: "cascade" }),
  locale: varchar({ length: 12 }).notNull(),
  name: varchar({ length: 160 }).notNull(),
  shortDefinition: text("short_definition").notNull(),
  overview: text().notNull(),
  productionCharacteristics: text("production_characteristics").notNull(),
  gradingOverview: text("grading_overview").notNull(),
  exportCharacteristics: text("export_characteristics").notNull(),
  marketNotes: text("market_notes").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [uniqueIndex("origin_translations_origin_locale_idx").on(table.originId, table.locale)]);

export const grades = pgTable("grades", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar({ length: 120 }).notNull().unique(),
  originSlug: varchar("origin_slug", { length: 120 }).notNull(),
  systemName: varchar("system_name", { length: 160 }).notNull(),
  isPublished: boolean("is_published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const gradeTranslations = pgTable("grade_translations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  gradeId: integer("grade_id").notNull().references(() => grades.id, { onDelete: "cascade" }),
  locale: varchar({ length: 12 }).notNull(),
  name: varchar({ length: 160 }).notNull(),
  shortDefinition: text("short_definition").notNull(),
  overview: text().notNull(),
  criteria: text().notNull(),
  marketMeaning: text("market_meaning").notNull(),
  commonMisunderstandings: text("common_misunderstandings").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [uniqueIndex("grade_translations_grade_locale_idx").on(table.gradeId, table.locale)]);
