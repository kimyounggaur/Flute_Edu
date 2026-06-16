import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FluteDiagram } from "./FluteDiagram";

describe("FluteDiagram", () => {
  it("renders the approved G4 pressed key set", () => {
    render(<FluteDiagram pressed={["thumbB", "lh1", "lh2", "lh3", "eb"]} showLabels />);

    expect(screen.getByLabelText("왼손 엄지 B 키 눌림")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText("왼손 검지 눌림")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText("오른손 새끼 E♭ 키 눌림")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText("오른손 검지 열림")).toHaveAttribute("aria-pressed", "false");
  });

  it("exposes expanded transparent hitboxes for mobile taps", () => {
    render(<FluteDiagram pressed={[]} showLabels />);
    expect(screen.getAllByTestId(/hitbox-/)).toHaveLength(16);
  });

  it("calls onToggleKey when a key hitbox is tapped", async () => {
    const user = userEvent.setup();
    const onToggleKey = vi.fn();
    render(<FluteDiagram pressed={[]} onToggleKey={onToggleKey} showLabels />);

    await user.click(screen.getByTestId("hitbox-lh1"));
    expect(onToggleKey).toHaveBeenCalledWith("lh1");
  });
});
