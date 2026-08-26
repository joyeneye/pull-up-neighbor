/**
 * Scratch probe used while building scripts/generate-admin-schema.ts — prints
 * the raw shape of a few schema types so the converter can be written against
 * what Sanity actually hands back. Not part of the app or the build.
 *
 * Run with: npx tsx --tsconfig tsconfig.codegen.json scripts/probe-schema.ts
 */
import { schemaTypes } from "../sanity/schemas";

type ProbeField = {
  name?: string;
  type?: string;
  validation?: unknown;
  fields?: ProbeField[];
  of?: ProbeField[];
};

type ProbeType = { name?: string; fields?: ProbeField[] };

const types = schemaTypes as unknown as ProbeType[];
const named = (fields: ProbeField[] | undefined, name: string) =>
  fields?.find((f) => f.name === name);

console.log("types:", types.length);

const hero = named(types, "pageHero") as ProbeType | undefined;
console.log(
  "pageHero fields:",
  hero?.fields?.map((f) => `${f.name}:${f.type}`).join(", ")
);

const blocks = types.filter((x) => x.name?.endsWith("Block"));
console.log("blocks:", blocks.length, blocks.map((b) => b.name).join(", "));

const iconCardGrid = named(types, "iconCardGridBlock") as ProbeType | undefined;
const cards = named(iconCardGrid?.fields, "cards");
console.log(
  "nested array 'cards' of:",
  JSON.stringify(cards?.of?.[0]?.fields?.map((f) => f.name))
);

console.log("validation is fn:", typeof named(hero?.fields, "title")?.validation);
