import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Appointment, AppointmentStatus } from "shared-lib";
import { AppointmentTable } from "./components/AppointmentTable";
import { mockAppointments } from "./mocks/data";

// We keep a mutable local copy so status updates persist
// within the session without needing a real API.
let localAppointments = [...mockAppointments];

const fetchAppointments = (): Promise<Appointment[]> =>
  Promise.resolve([...localAppointments]);

const updateStatus = ({
  id,
  status,
}: {
  id: string;
  status: AppointmentStatus;
}): Promise<Appointment> => {
  localAppointments = localAppointments.map((a) =>
    a.id === id ? { ...a, status } : a,
  );
  const updated = localAppointments.find((a) => a.id === id)!;
  return Promise.resolve(updated);
};

export const Appointments: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">(
    "all",
  );
  const queryClient = useQueryClient();

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
  });

  const mutation = useMutation({
    mutationFn: updateStatus,
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["appointments"] });
      const previous = queryClient.getQueryData<Appointment[]>([
        "appointments",
      ]);
      queryClient.setQueryData<Appointment[]>(["appointments"], (old) =>
        (old ?? []).map((a) => (a.id === id ? { ...a, status } : a)),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["appointments"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  const filtered = (appointments ?? []).filter((a) =>
    statusFilter === "all" ? true : a.status === statusFilter,
  );

  if (isLoading)
    return (
      <p style={{ padding: "40px", color: "#6B7280" }}>
        Loading appointments...
      </p>
    );

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ margin: "0 0 24px", fontSize: "22px", color: "#111827" }}>
        Appointments
      </h2>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {(["all", "scheduled", "completed", "cancelled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: "6px 16px",
              borderRadius: "20px",
              border: "1px solid #E5E7EB",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              backgroundColor: statusFilter === s ? "#4F46E5" : "#fff",
              color: statusFilter === s ? "#fff" : "#374151",
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#6B7280" }}>
        Showing {filtered.length} of {appointments?.length ?? 0} appointments
      </p>

      <AppointmentTable
        appointments={filtered}
        onStatusChange={(id, status) => mutation.mutate({ id, status })}
        isUpdating={mutation.isPending}
      />
    </div>
  );
};

export default Appointments;
