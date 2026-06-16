import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App shell", () => {
  it("switches bottom tabs and exposes the core Explore flow", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("button", { name: "홈" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "운지" }));
    expect(screen.getAllByText(/C4/).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /거꾸로 찾기/ })).toBeInTheDocument();
  });
});
