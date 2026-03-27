export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🚀 Received body:", JSON.stringify(body));

    const formData = new FormData();
    formData.append("workflowId", "019d2b0c-1607-7000-a49d-fea7efd4c3f3");

    Object.entries(body).forEach(([key, value]) => {
      formData.append(`inputs[${key}]`, String(value));
    });

    const supervityRes = await fetch(
      "https://auto.supervity.ai/api/v1/workflow-runs/execute",
      {
        method: "POST",
        body: formData,
      }
    );

    const text = await supervityRes.text();
    console.log("🔥 Supervity Response:", supervityRes.status, text);

    return Response.json(
      { success: true, status: supervityRes.status, data: text },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ /api/generate error:", error);
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
