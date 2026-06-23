import { http, HttpResponse } from "msw";
import { mockPatients } from "./data";

export const handlers = [
  http.get("/api/patients", () => HttpResponse.json(mockPatients)),

  // Dynamic route — :id is a URL parameter.
  // MSW captures it and we use it to find the right patient.
  http.get("/api/patients/:id", ({ params }) => {
    // `params` is typed as Record<string, string> by MSW.
    // We extract `id` and find the matching patient.
    const patient = mockPatients.find((p) => p.id === params.id);
    if (!patient) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(patient);
  }),
];
