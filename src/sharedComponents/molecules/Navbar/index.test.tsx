import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Navbar from "./";
import { renderWithProviders } from "../../../test/utils";

describe("Navbar Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the Navbar", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("hides on scroll down and reappears on scroll up", async () => {
    renderWithProviders(<Navbar />);
    const navbar = screen.getByTestId("navbar");

    vi.stubGlobal("scrollY", 200);
    window.dispatchEvent(new Event("scroll"));
    expect(navbar).toHaveStyle({ transform: "translateY(-100%)" });

    vi.stubGlobal("scrollY", 50);
    window.dispatchEvent(new Event("scroll"));
    expect(navbar).toHaveStyle({ transform: "translateY(0)" });
  });
});
