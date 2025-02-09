import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import useDebounce from "./useDebounce";

const DELAY = 500;
const PARTIAL_DELAY = 300;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
});

describe("useDebounce", () => {
  it("delays function execution by specified time", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, DELAY));

    act(() => {
      result.current();
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(DELAY);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancels previous calls if invoked before delay", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, DELAY));

    act(() => {
      result.current();
      vi.advanceTimersByTime(PARTIAL_DELAY);
      result.current();
      vi.advanceTimersByTime(PARTIAL_DELAY);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cleans up on unmount", () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() => useDebounce(callback, DELAY));

    act(() => {
      result.current();
      unmount();
    });

    act(() => {
      vi.advanceTimersByTime(DELAY);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("ignores rapid consecutive calls and executes only the last one", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, DELAY));

    act(() => {
      result.current();
      result.current();
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(DELAY);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
