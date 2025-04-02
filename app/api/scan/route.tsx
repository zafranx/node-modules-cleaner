import fs from "fs-extra";
import path from "path";

// const scanForNodeModules = (dir, results = []) => {
//   try {
//     const files = fs.readdirSync(dir);
//     if (files.includes("node_modules")) {
//       results.push(path.join(dir, "node_modules"));
//     }
//     files.forEach((file) => {
//       const fullPath = path.join(dir, file);
//       if (fs.statSync(fullPath).isDirectory() && file !== "node_modules") {
//         scanForNodeModules(fullPath, results);
//       }
//     });
//   } catch (err) {
//     console.error(`Error scanning ${dir}:`, err);
//   }
//   return results;
// };

const scanForNodeModules = (dir, results = []) => {
  try {
    const files = fs.readdirSync(dir);
    if (files.includes("node_modules")) {
      results.push(path.join(dir, "node_modules"));
    }
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      if (
        fs.statSync(fullPath).isDirectory() &&
        !["node_modules", ".next"].includes(file)
      ) {
        scanForNodeModules(fullPath, results);
      }
    });
  } catch (err) {
    console.error(`Error scanning ${dir}:`, err);
  }
  return results;
};


export async function GET() {
  const desktopPath = path.join(
    process.env.HOME || process.env.USERPROFILE || "",
    "Desktop"
  );
  const results = scanForNodeModules(desktopPath);
  return Response.json({ results });
}
