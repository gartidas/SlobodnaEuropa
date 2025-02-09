import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import BackToTopButton from "./";

describe("BackToTopButton Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the button", () => {
    render(<BackToTopButton />);
    expect(screen.getByTestId("back-to-top-button")).toBeInTheDocument();
  });

  it("is hidden initially", () => {
    render(<BackToTopButton />);
    const button = screen.getByTestId("back-to-top-button");

    expect(button).toHaveStyle({ opacity: "0", visibility: "hidden" });
  });

  it("becomes visible when scrolling down", async () => {
    render(<BackToTopButton />);
    const button = screen.getByTestId("back-to-top-button");

    vi.stubGlobal("scrollY", 600);
    window.dispatchEvent(new Event("scroll"));

    expect(button).toHaveStyle({ opacity: "1", visibility: "visible" });
  });

  it("hides again when scrolling back up", async () => {
    render(<BackToTopButton />);
    const button = screen.getByTestId("back-to-top-button");

    vi.stubGlobal("scrollY", 600);
    window.dispatchEvent(new Event("scroll"));
    expect(button).toHaveStyle({ opacity: "1", visibility: "visible" });

    vi.stubGlobal("scrollY", 100);
    window.dispatchEvent(new Event("scroll"));
    expect(button).toHaveStyle({ opacity: "0", visibility: "hidden" });
  });

  it("scrolls to top when clicked", async () => {
    render(<BackToTopButton />);
    const button = screen.getByTestId("back-to-top-button");
    const scrollToMock = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});

    await userEvent.click(button);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
