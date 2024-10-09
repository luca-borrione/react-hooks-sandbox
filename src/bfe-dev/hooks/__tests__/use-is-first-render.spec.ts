import { renderHook } from "@testing-library/react";
import { useIsFirstRender } from "../use-is-first-render";

describe("useIsFirstRender", () => {
  it("should return true only for first render", () => {
    const { rerender, result } = renderHook(() => useIsFirstRender());
    expect(result.current).toBe(true);
    rerender();
    expect(result.current).toBe(false);
  });
});
