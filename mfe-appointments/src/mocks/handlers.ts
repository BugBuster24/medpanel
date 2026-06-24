import { http, HttpResponse } from "msw";
import { mockAppointments } from "./data";
import { AppointmentStatus } from "@hareharun/medpanel-shared";

export const handlers = [
  http.get("/api/appointments", () => {
    return HttpResponse.json(mockAppointments);
  }),

  http.patch("/api/appointments/:id/status", async ({ params, request }) => {
    const body = (await request.json()) as { status: AppointmentStatus };

    // Find the index of the appointment to update
    const index = mockAppointments.findIndex((a) => a.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });

    mockAppointments[index] = {
      ...mockAppointments[index],
      status: body.status,
    };

    return HttpResponse.json(mockAppointments[index]);
  }),
];
