import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Patients } from "../Patients";

// Components that use React Query need to be wrapped in
// QueryClientProvider. We create a fresh QueryClient for
// each test so cache doesn't leak between tests.
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Disable retries in tests — if a query fails, fail immediately.
        // Without this, tests wait for 3 retries before failing,
        // making them very slow.
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Patients page", () => {
  it("renders patient records heading", async () => {
    render(<Patients />, { wrapper: createWrapper() });

    // `waitFor` waits for async updates — React Query loads data asynchronously
    // so we wait until the heading appears.
    await waitFor(() => {
      expect(screen.getByText("Patient Records")).toBeInTheDocument();
    });
  });

  it("shows all patients on initial load", async () => {
    render(<Patients />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Arjun Reddy")).toBeInTheDocument();
      expect(screen.getByText("Meena Krishnan")).toBeInTheDocument();
    });
  });

  it("filters patients by search term", async () => {
    const user = userEvent.setup();
    render(<Patients />, { wrapper: createWrapper() });

    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText("Arjun Reddy")).toBeInTheDocument();
    });

    // Type in the search box
    const searchInput = screen.getByPlaceholderText(
      "Search by name or condition...",
    );
    await user.type(searchInput, "Meena");

    // Meena should still be visible, Arjun should be filtered out
    expect(screen.getByText("Meena Krishnan")).toBeInTheDocument();
    expect(screen.queryByText("Arjun Reddy")).not.toBeInTheDocument();
  });

  it("shows patient detail when View is clicked", async () => {
    const user = userEvent.setup();
    render(<Patients />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Arjun Reddy")).toBeInTheDocument();
    });

    const viewButtons = screen.getAllByRole("button", { name: "View" });
    await user.click(viewButtons[0]);

    // After clicking View, the detail view should appear
    // with the patient's phone number (not shown in the table)
    await waitFor(() => {
      expect(screen.getByText("9876543210")).toBeInTheDocument();
    });
  });

  it("returns to table when back button is clicked", async () => {
    const user = userEvent.setup();
    render(<Patients />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Arjun Reddy")).toBeInTheDocument();
    });

    // Navigate to detail view
    const viewButtons = screen.getAllByRole("button", { name: "View" });
    await user.click(viewButtons[0]);

    // Click back
    await waitFor(() => {
      screen.getByRole("button", { name: /back to patients/i });
    });
    await user.click(screen.getByRole("button", { name: /back to patients/i }));

    // Table should be visible again
    await waitFor(() => {
      expect(screen.getByText("Patient Records")).toBeInTheDocument();
    });
  });
});
