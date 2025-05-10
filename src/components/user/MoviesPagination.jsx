import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationDemo({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (page) => {
    if (page !== currentPage) onPageChange(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 4); // only first 4 pages for now

  return (
    <Pagination className="mb-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {pageNumbers.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href="#"
              isActive={pageNum === currentPage}
              onClick={() => handlePageClick(pageNum)}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && (
          <PaginationItem>
            <span className="px-2">...</span>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
