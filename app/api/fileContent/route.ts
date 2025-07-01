import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { ProjectFile, ProjectFileContent } from "@/db/db";
import { connectToDatabase } from "@/app/lib/mongoose";

export async function GET(
  request: NextRequest,
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) {
    return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
  }

  await connectToDatabase();

  try {
    const fileContent = await ProjectFileContent.findOne({ projectFile: fileId });
    return NextResponse.json({ fileContent }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}