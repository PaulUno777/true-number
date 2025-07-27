"use client";

import { Button } from "./Button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  className?: string;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxVisiblePages = 5,
  className = "",
  isLoading = false,
}: PaginationProps) {
  const t = useTranslations("common");

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    const end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Page Info */}
      <div className="text-sm text-muted-foreground">
        {t("pageInfo", {
          current: currentPage,
          total: totalPages,
          defaultValue: `Page ${currentPage} of ${totalPages}`,
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t("previous", { defaultValue: "Previous" })}
        </Button>

        {/* Page Numbers */}
        {showPageNumbers && (
          <div className="flex items-center space-x-1">
            {/* First Page */}
            {showStartEllipsis && (
              <>
                <Button
                  variant={currentPage === 1 ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(1)}
                  disabled={isLoading}
                  className={`min-w-[40px] ${
                    currentPage === 1
                      ? "bg-accent text-accent-foreground"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  1
                </Button>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </>
            )}

            {/* Visible Page Numbers */}
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                disabled={isLoading}
                className={`pagination-button ${
                  currentPage === page
                    ? "pagination-button-active"
                    : "pagination-button-inactive"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Last Page */}
            {showEndEllipsis && (
              <>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant={currentPage === totalPages ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(totalPages)}
                  disabled={isLoading}
                  className={`min-w-[40px] ${
                    currentPage === totalPages
                      ? "bg-accent text-accent-foreground"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>
        )}

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
        >
          {t("next", { defaultValue: "Next" })}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}