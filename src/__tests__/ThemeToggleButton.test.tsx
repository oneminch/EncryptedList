import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "../components/shared/ThemeToggleButton";

// Mock the useTheme hook
const mockSetTheme = vi.fn();
const useThemeMock = {
  theme: "light",
  setTheme: mockSetTheme
};

vi.mock("next-themes", () => ({
  useTheme: () => useThemeMock
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockSetTheme.mockClear();
  });

  it("renders the button with correct aria-label", () => {
    render(<ThemeToggle />);
    const buttons = screen.getAllByRole("button", { name: /toggle theme/i });
    expect(buttons[0]).toBeTruthy();
  });

  it('calls setTheme with "dark" when the current theme is "light"', async () => {
    render(<ThemeToggle />);
    const buttons = screen.getAllByRole("button", { name: /toggle theme/i });

    await userEvent.click(buttons[0]);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
