import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PatientDetail } from "../components/PatientDetail";
import { Patient } from "shared-lib";

const mockPatient: Patient = {
  id: "p1",
  name: "Arjun Reddy",
  age: 45,
  gender: "male",
  phone: "9876543210",
  email: "arjun@email.com",
  tenantId: "1",
  condition: "Hypertension",
  admittedOn: "2024-11-01",
};

describe("PatientDetail", () => {
  it("renders patient information correctly", () => {
    render(<PatientDetail patient={mockPatient} onBack={() => {}} />);

    expect(
      screen.getByText("Arjun Reddy", { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByText("9876543210")).toBeInTheDocument();
    expect(screen.getByText("arjun@email.com")).toBeInTheDocument();
    expect(screen.getByText("Hypertension")).toBeInTheDocument();
    expect(screen.getByText("2024-11-01")).toBeInTheDocument();
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();

    render(<PatientDetail patient={mockPatient} onBack={onBack} />);

    // Find the back button by its label text
    const backButton = screen.getByRole("button", {
      name: /back to patients/i,
    });
    await user.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
