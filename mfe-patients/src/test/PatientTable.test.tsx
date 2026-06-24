import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PatientTable } from "../components/PatientTable";
import { Patient } from "@hareharun/medpanel-shared";

// Mock data for tests — a small subset is enough.
// Tests should be fast and focused, not depend on large datasets.
const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "Arjun Reddy",
    age: 45,
    gender: "male",
    phone: "9876543210",
    email: "arjun@email.com",
    tenantId: "1",
    condition: "Hypertension",
    admittedOn: "2024-11-01",
  },
  {
    id: "p2",
    name: "Meena Krishnan",
    age: 32,
    gender: "female",
    phone: "9876543211",
    email: "meena@email.com",
    tenantId: "1",
    condition: "Diabetes",
    admittedOn: "2024-11-03",
  },
];

// `describe` groups related tests together.
// The string is the component or feature being tested.
describe("PatientTable", () => {
  // `it` is a single test case. The string describes the expected behaviour.
  // Good test names read like sentences: "it renders patient names"
  it("renders all patient names", () => {
    // `render` mounts the component into the jsdom environment.
    render(<PatientTable patients={mockPatients} onSelect={() => {}} />);

    // `screen.getByText` finds an element by its text content.
    // If it doesn't find it, the test fails automatically.
    expect(screen.getByText("Arjun Reddy")).toBeInTheDocument();
    expect(screen.getByText("Meena Krishnan")).toBeInTheDocument();
  });

  it("renders patient conditions", () => {
    render(<PatientTable patients={mockPatients} onSelect={() => {}} />);
    expect(screen.getByText("Hypertension")).toBeInTheDocument();
    expect(screen.getByText("Diabetes")).toBeInTheDocument();
  });

  it("calls onSelect with the correct patient when View is clicked", async () => {
    // `userEvent.setup()` creates a user-event instance.
    // Always set it up before render for correct event handling.
    const user = userEvent.setup();

    // `vi.fn()` creates a mock function — it records how it was called.
    // We pass it as onSelect so we can assert it was called correctly.
    const onSelect = vi.fn();

    render(<PatientTable patients={mockPatients} onSelect={onSelect} />);

    // `getAllByRole` finds all buttons with the label "View".
    // We click the first one (Arjun Reddy's row).
    const viewButtons = screen.getAllByRole("button", { name: "View" });
    await user.click(viewButtons[0]);

    // `toHaveBeenCalledWith` asserts the mock was called with the right argument.
    expect(onSelect).toHaveBeenCalledWith(mockPatients[0]);
  });

  it("renders empty table when no patients are passed", () => {
    render(<PatientTable patients={[]} onSelect={() => {}} />);
    // When the array is empty, no patient names should appear.
    expect(screen.queryByText("Arjun Reddy")).not.toBeInTheDocument();
  });
});
