import fs from "fs-extra";

export async function POST(req) {
  const { paths } = await req.json();

  if (!paths || !Array.isArray(paths)) {
    return Response.json({ error: "Invalid paths provided" }, { status: 400 });
  }

  const deletionResults = [];
  for (const p of paths) {
    try {
      if (fs.existsSync(p)) {
        fs.removeSync(p);
        deletionResults.push({ path: p, deleted: true });
      } else {
        deletionResults.push({
          path: p,
          deleted: false,
          error: "Path does not exist",
        });
      }
    } catch (error) {
      deletionResults.push({ path: p, deleted: false, error: error.message });
    }
  }

  return Response.json({ results: deletionResults });
}
