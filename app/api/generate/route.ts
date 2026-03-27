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
          "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJCOVg3RVFFWE8td25ucjBJd3Vjbm5vQWlVcWdDM1JpNzh2aGMxMG9xTmJnIn0.eyJleHAiOjE3ODIxMzI1MTYsImlhdCI6MTc3NDM1NjUxNiwianRpIjoiOTdiODA1MDQtNTFiMi00YjRiLWEzYmItYTE4M2FkMzkwYTY0IiwiaXNzIjoiaHR0cHM6Ly9hdXRvLXNzby5zdXBlcnZpdHkuYWkvYXV0aC9yZWFsbXMvdGVjaGZvcmNlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImYwMGJlMzcyLTk3NDktNGJmYi1hMTg2LTM2MWI1NjdjOGQyMiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJvdC1tYWtlciIsInNpZCI6ImMzYTBjMmYyLTc2YzktNDZhOS1hZTE3LWUzNGY2MDU5NjNkMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2F1dG8uc3VwZXJ2aXR5LmFpIiwiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy10ZWNoZm9yY2UiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6Ikxha3NoIFN1dGxlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibGFrc2hzdXRsZUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiTGFrc2giLCJmYW1pbHlfbmFtZSI6IlN1dGxlIiwiZW1haWwiOiJsYWtzaHN1dGxlQGdtYWlsLmNvbSJ9.cdNuKLwd6b4Wp1KCFrO_ynk0APMebkHGBSOEuzlqNjRSX09jcR_AKyqXsy-19lnl7sCY_ts1TzaVU_5ZVgJuo9zzdqDcn4rqwnl5iCmfn0Ku_bfE_O6m6QNSVVA5cRiGNxd5VyCNchxqQKEifjsQPLaKMiulKaAsbVZnUBf4QZRnOJZmvVjcJOK3Q6934-aMQQ-x_K9XLyd3oBuopZeBRVXlfFHA1LRLES0ZEjVeWI3bOwDloR-HWh2vTmZWzwYylLQWNhVXVa7CIzwgDLsrIRzEHEfd2dJia_XgQwR1m8B32E23_3Zwa6pkaO_6n-Glc5Ebgi8MckMB1ULEbBiuCQ", // 🔥 paste your curl token here
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
