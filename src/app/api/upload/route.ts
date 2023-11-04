export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  return Response.json({ test: "upload" });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("file");

  console.log(file);

  return Response.json({ result: "OK" });
}
