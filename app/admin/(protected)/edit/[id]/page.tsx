import { notFound } from "next/navigation";
import { connection } from "next/server";
import DocumentForm from "@/components/admin/form/DocumentForm";
import { ExternalLinkIcon } from "@/components/admin/icons";
import { libraryEntry } from "@/components/admin/library-catalog";
import {
  type AdminField,
  type AdminType,
  type Doc,
  getDocument,
  getType,
  referenceOptions,
} from "@/lib/admin/content";
import { PAGE_ROUTES, routesForDocument } from "@/sanity/lib/routes";

type Props = { params: Promise<{ id: string }> };

type RefOption = { _id: string; label: string; archived: boolean };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  for (const page of PAGE_ROUTES) {
    const section = page.sections.find((entry) => entry.id === id);
    if (section) return { title: `${page.title} — ${section.title}` };
  }
  return { title: "Edit" };
}

const LABEL_KEYS = ["name", "title", "label", "type", "value"];

function labelOf(doc: Doc): string | null {
  for (const key of LABEL_KEYS) {
    const value = doc[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

/**
 * Walks the type's fields — including the fields of any nested object and of
 * every page-builder block it accepts — and reports back the reference fields
 * that need a picker and the block schemas the form has to be able to render.
 */
function collect(type: AdminType): { refFields: AdminField[]; blockSchemas: Record<string, AdminType> } {
  const refFields: AdminField[] = [];
  const blockSchemas: Record<string, AdminType> = {};
  const seenBlocks = new Set<string>();
  const queue: AdminField[][] = [type.fields];

  while (queue.length > 0) {
    const fields = queue.pop();
    if (!fields) break;

    for (const field of fields) {
      if (field.type === "reference" || field.arrayOf === "reference") refFields.push(field);
      if (field.fields && field.fields.length > 0) queue.push(field.fields);

      if (field.arrayOf === "block") {
        for (const name of field.blockTypes ?? []) {
          if (seenBlocks.has(name)) continue;
          seenBlocks.add(name);
          const blockType = getType(name);
          if (!blockType) continue;
          blockSchemas[name] = blockType;
          queue.push(blockType.fields);
        }
      }
    }
  }

  return { refFields, blockSchemas };
}

export default async function EditDocumentScreen({ params }: Props) {
  await connection();

  const { id } = await params;
  const doc = await getDocument(id);
  if (!doc) notFound();

  const type = getType(doc._type);
  if (!type) notFound();

  const { refFields, blockSchemas } = collect(type);

  // One query per distinct set of allowed reference types, not one per field.
  const byTypeKey = new Map<string, string[]>();
  for (const field of refFields) {
    const types = (field.refTypes ?? []).filter((name) => Boolean(name));
    if (types.length === 0) continue;
    byTypeKey.set([...types].sort().join(","), types);
  }

  const loaded = await Promise.all(
    [...byTypeKey.entries()].map(
      async ([key, types]) => [key, await referenceOptions(types)] as const
    )
  );
  const optionsByKey = new Map<string, RefOption[]>(loaded);

  // Keyed by field name, with the document type(s) as aliases so the form can
  // look options up either way.
  const refOptions: Record<string, RefOption[]> = {};
  for (const field of refFields) {
    const types = (field.refTypes ?? []).filter((name) => Boolean(name));
    const options = optionsByKey.get([...types].sort().join(",")) ?? [];
    refOptions[field.name] = options;
    for (const name of types) {
      if (!(name in refOptions)) refOptions[name] = options;
    }
  }

  const owningPage = PAGE_ROUTES.find((page) => page.sections.some((s) => s.id === doc._id));
  const section = owningPage?.sections.find((s) => s.id === doc._id);
  const library = libraryEntry(doc._type);

  const backHref = owningPage
    ? `/admin/pages/${owningPage.key}`
    : library
      ? `/admin/library/${doc._type}`
      : "/admin";

  // A page section is named by where it sits; a library item by what it is
  // called; anything else (site settings) by what the schema calls it.
  const title =
    owningPage && section
      ? `${owningPage.title} — ${section.title}`
      : library
        ? (labelOf(doc) ?? `Untitled ${type.title.toLowerCase()}`)
        : type.title;

  const [liveRoute] = routesForDocument(doc._id, doc._type);

  // Rendered on the form's title row rather than above it, so it lines up with
  // the heading instead of floating over the Back link.
  const liveLink = liveRoute ? (
    <a
      href={liveRoute}
      target="_blank"
      rel="noreferrer"
      className="-mr-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-slate-500 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      View this on the live site
      <ExternalLinkIcon />
    </a>
  ) : null;

  return (
    <DocumentForm
      docId={doc._id}
      type={type}
      initialValues={doc}
      refOptions={refOptions}
      backHref={backHref}
      title={title}
      blockSchemas={blockSchemas}
      headerAside={liveLink}
    />
  );
}
