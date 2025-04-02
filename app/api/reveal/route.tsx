import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { folderPath } = await req.json();
    if (!folderPath) {
      return NextResponse.json({ error: "No path provided" }, { status: 400 });
    }

    const resolvedPath = path.resolve(folderPath);

    // Windows: Open File Explorer
    exec(`explorer "${resolvedPath}"`);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
