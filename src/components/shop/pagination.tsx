"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    totalCount?: number // Add this prop for the total number of results
    onPageChange: (page: number) => void
    limit: number
}

export function Pagination({ currentPage, totalPages, totalCount, limit, onPageChange }: PaginationProps) {
    const renderPageNumbers = () => {
        const pageNumbers = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            // Show all pages if total pages are less than or equal to maxPagesToShow
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <Button
                        key={i}
                        variant={currentPage === i ? "default" : "outline"}
                        size="icon"
                        className={`w-9 h-9 ${currentPage === i ? "bg-primary text-white" : ""}`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </Button>
                )
            }
        } else {
            // Always show first page
            pageNumbers.push(
                <Button
                    key={1}
                    variant={currentPage === 1 ? "default" : "outline"}
                    size="icon"
                    className={`w-9 h-9 ${currentPage === 1 ? "bg-primary text-white" : ""}`}
                    onClick={() => onPageChange(1)}
                >
                    1
                </Button>
            )

            // Calculate start and end of page numbers to show
            let startPage = Math.max(2, currentPage - 1)
            let endPage = Math.min(totalPages - 1, currentPage + 1)

            // Adjust if we're at the start or end
            if (currentPage <= 2) {
                endPage = 3
            } else if (currentPage >= totalPages - 1) {
                startPage = totalPages - 2
            }

            // Show ellipsis if needed before middle pages
            if (startPage > 2) {
                pageNumbers.push(
                    <Button key="ellipsis1" variant="outline" size="icon" className="w-9 h-9" disabled>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                )
            }

            // Show middle pages
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                    <Button
                        key={i}
                        variant={currentPage === i ? "default" : "outline"}
                        size="icon"
                        className={`w-9 h-9 ${currentPage === i ? "bg-primary text-white" : ""}`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </Button>
                )
            }

            // Show ellipsis if needed after middle pages
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <Button key="ellipsis2" variant="outline" size="icon" className="w-9 h-9" disabled>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                )
            }

            // Always show last page
            pageNumbers.push(
                <Button
                    key={totalPages}
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="icon"
                    className={`w-9 h-9 ${currentPage === totalPages ? "bg-primary text-white" : ""}`}
                    onClick={() => onPageChange(totalPages)}
                >
                    {totalPages}
                </Button>
            )
        }

        return pageNumbers
    }

    // Calculate start and end of the current page range (for "Showing X to Y of Z results")
    const startIndex = (currentPage - 1) * limit + 1
    const endIndex = Math.min(currentPage * limit, totalCount ?? 0)

    return (
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-3 py-4 px-5">
            <div className="text-sm text-muted-foreground">
                Showing {startIndex} to {endIndex} of {totalCount} results
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-9 h-9 text-primary shadow-none border-none text-base"
                >
                    <ChevronLeft className="h-8 w-8 " />
                </Button>
                {renderPageNumbers()}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 text-primary shadow-none border-none text-base"
                >
                    <ChevronRight className="h-8 w-8 " />
                </Button>
            </div>
        </div>
    )
}