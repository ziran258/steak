import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { cuts as cutData, glossaryTerms as glossaryData, grades as gradeData, origins as originData } from "../data/wiki";
import { cutTranslations, cuts, glossaryTermTranslations, glossaryTerms, gradeTranslations, grades, originTranslations, origins } from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client);

async function main() {
  await db.delete(cutTranslations);
  await db.delete(cuts);
  await db.delete(glossaryTermTranslations);
  await db.delete(glossaryTerms);
  await db.delete(originTranslations);
  await db.delete(origins);
  await db.delete(gradeTranslations);
  await db.delete(grades);

  for (const [index, cut] of cutData.entries()) {
    const [inserted] = await db.insert(cuts).values({
      slug: cut.slug,
      category: cut.category,
      primaryPrimal: cut.primaryPrimal,
      muscleNames: cut.muscleNames,
      commonCookingMethods: cut.commonCookingMethods,
      relatedCutSlugs: cut.relatedCutSlugs,
      relatedTermSlugs: cut.relatedTermSlugs,
      coverImageUrl: cut.coverImageUrl,
      sortOrder: index,
    }).returning({ id: cuts.id });

    await db.insert(cutTranslations).values(Object.entries(cut.translations).map(([locale, translation]) => ({
      cutId: inserted.id,
      locale,
      ...translation,
    })));
  }

  for (const [index, term] of glossaryData.entries()) {
    const [inserted] = await db.insert(glossaryTerms).values({
      slug: term.slug,
      category: term.category,
      relatedTermSlugs: term.relatedTermSlugs,
      sortOrder: index,
    }).returning({ id: glossaryTerms.id });

    await db.insert(glossaryTermTranslations).values(Object.entries(term.translations).map(([locale, translation]) => ({
      termId: inserted.id,
      locale,
      ...translation,
    })));
  }

  for (const [index, origin] of originData.entries()) {
    const [inserted] = await db.insert(origins).values({
      slug: origin.slug,
      countryCode: origin.countryCode,
      commonGradeSystems: origin.commonGradeSystems,
      relatedTermSlugs: origin.relatedTermSlugs,
      coverImageUrl: origin.coverImageUrl,
      sortOrder: index,
    }).returning({ id: origins.id });

    await db.insert(originTranslations).values(Object.entries(origin.translations).map(([locale, translation]) => ({
      originId: inserted.id,
      locale,
      ...translation,
    })));
  }

  for (const [index, grade] of gradeData.entries()) {
    const [inserted] = await db.insert(grades).values({
      slug: grade.slug,
      originSlug: grade.originSlug,
      systemName: grade.systemName,
      sortOrder: index,
    }).returning({ id: grades.id });

    await db.insert(gradeTranslations).values(Object.entries(grade.translations).map(([locale, translation]) => ({
      gradeId: inserted.id,
      locale,
      ...translation,
    })));
  }
}

main()
  .then(async () => {
    await client.end();
    console.log("Seed completed.");
  })
  .catch(async (error) => {
    await client.end();
    console.error(error);
    process.exit(1);
  });
