import {
  usePathname,
  useSearchParams,
  useRouter,
  type ReadonlyURLSearchParams
} from "next/navigation";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import usePagination from "@/hooks/usePagination";

// Mock Next.js navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  useRouter: vi.fn()
}));

// Type definitions
type UsePaginationReturn = {
  currentPage: number;
  isOnFirstPage: boolean;
  isOnLastPage: boolean;
  toPrevPage: () => void;
  toNextPage: () => void;
};

describe("usePagination", () => {
  const mockPathname = "/test";
  const mockReplace = vi.fn();
  let mockSearchParams: URLSearchParams;

  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
    vi.mocked(usePathname).mockReturnValue(mockPathname);
    vi.mocked(useSearchParams).mockReturnValue(
      mockSearchParams as ReadonlyURLSearchParams
    );
    vi.mocked(useRouter).mockReturnValue({
      replace: mockReplace,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      push: vi.fn(),
      prefetch: vi.fn()
    });
  });

  it("should initialize with the correct default values", () => {
    const { result } = renderHook<number, UsePaginationReturn>(() =>
      usePagination(10)
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.isOnFirstPage).toBe(true);
    expect(result.current.isOnLastPage).toBe(false);
  });

  it("should update currentPage based on URL search params", () => {
    mockSearchParams.set("page", "3");
    const { result } = renderHook<number, UsePaginationReturn>(() =>
      usePagination(10)
    );

    expect(result.current.currentPage).toBe(3);
    expect(result.current.isOnFirstPage).toBe(false);
    expect(result.current.isOnLastPage).toBe(false);
  });

  it("should handle invalid page numbers in URL", () => {
    mockSearchParams.set("page", "20");
    const { result } = renderHook<number, UsePaginationReturn>(() =>
      usePagination(10)
    );

    expect(result.current.currentPage).toBe(1);
    expect(mockReplace).toHaveBeenCalled();
  });

  it("should navigate to the next page", () => {
    const { result } = renderHook<number, UsePaginationReturn>(() =>
      usePagination(10)
    );

    act(() => {
      result.current.toNextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(mockReplace).toHaveBeenCalled();
  });

  it("should navigate to the previous page", () => {
    mockSearchParams.set("page", "3");
    const { result } = renderHook<number, UsePaginationReturn>(() =>
      usePagination(10)
    );

    act(() => {
      result.current.toPrevPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(mockReplace).toHaveBeenCalled();
  });

  it("should not go below the first page", () => {
    const { result } = renderHook<number, UsePaginationReturn>(() =>
      usePagination(10)
    );

    act(() => {
      result.current.toPrevPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.isOnFirstPage).toBe(true);
  });

  it("should not go beyond the last page", () => {
    mockSearchParams.set("page", "10");
    const { result } = renderHook<number, UsePaginationReturn>(() =>
      usePagination(10)
    );

    act(() => {
      result.current.toNextPage();
    });

    expect(result.current.currentPage).toBe(10);
    expect(result.current.isOnLastPage).toBe(true);
  });
});
