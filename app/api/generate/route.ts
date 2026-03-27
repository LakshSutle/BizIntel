export async function POST(req: Request) {
  try {
    const body = await req.json();

    const formData = new FormData();

    formData.append("workflowId", "019d2b0c-1607-7000-a49d-fea7efd4c3f3");

    formData.append("inputs[business_type]", body.business_type);
    formData.append("inputs[revenue]", String(body.revenue));
    formData.append("inputs[expenses]", String(body.expenses));
    formData.append("inputs[location]", body.location);
    formData.append("inputs[business_age]", String(body.business_age));
    formData.append("inputs[employees]", String(body.employees));
    formData.append("inputs[customer_type]", body.customer_type);
    formData.append("inputs[sales_channel]", body.sales_channel);
    formData.append("inputs[growth_trend]", body.growth_trend);
    formData.append("inputs[business_goal]", body.business_goal);
    formData.append("inputs[biggest_challenge]", body.biggest_challenge);

    const response = await fetch(
      "https://auto-workflow-api.supervity.ai/api/v1/workflow-runs/execute/stream",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_TOKEN_HERE", // 🔥 paste your curl token here
          "x-source": "v1",
        },
        body: formData,
      }
    );

    const text = await response.text();

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });

  } catch (error) {
    console.error("Supervity Error:", error);
    return Response.json({ error: "Integration failed" }, { status: 500 });
  }
}
