"use client"

import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    type PaginationState,
    type RowSelectionState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"
import { Button } from "./button"
import { Input } from "./input"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./dropdown-menu"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    Settings2Icon,
} from "lucide-react"
import { CustomSelect, type SelectOption } from "./custom-select"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    // Props de paginación
    pagination?: boolean
    pageSize?: number
    pageSizeOptions?: SelectOption[]
    // Props de búsqueda/filtrado
    searchable?: boolean
    searchPlaceholder?: string
    searchColumn?: string
    // Props de ordenamiento
    sortable?: boolean
    // Props de visibilidad de columnas
    columnVisibility?: boolean
    // Props de selección
    selectable?: boolean
    onRowSelectionChange?: (selectedRows: TData[]) => void
    // Props de personalización
    className?: string
    emptyMessage?: string
    // Props de estado controlado
    sorting?: SortingState
    onSortingChange?: (sorting: SortingState) => void
    columnFilters?: ColumnFiltersState
    onColumnFiltersChange?: (filters: ColumnFiltersState) => void
    rowSelection?: RowSelectionState
    onRowSelectionChangeState?: (selection: RowSelectionState) => void
    columnVisibilityState?: VisibilityState
    onColumnVisibilityChange?: (visibility: VisibilityState) => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    // Pagination
    pagination = false,
    pageSize = 10,
    pageSizeOptions = [{ label: "10", value: "10" }, { label: "20", value: "20" }, { label: "30", value: "30" }, { label: "40", value: "40" }],
    // Search
    searchable = false,
    searchPlaceholder = "Search...",
    searchColumn = "", // Columna específica para buscar, vacío = búsqueda global
    // Sort
    sortable = true,
    // Column visibility
    columnVisibility = true,
    // Selection
    selectable = false,
    onRowSelectionChange,
    // Customization
    className = "",
    emptyMessage = "No results found.",
    // Controlled states
    sorting,
    onSortingChange,
    columnFilters,
    onColumnFiltersChange,
    rowSelection,
    onRowSelectionChangeState,
    columnVisibilityState,
    onColumnVisibilityChange,
}: DataTableProps<TData, TValue>) {
    // Estados internos si no se proveen controlados
    const [internalSorting, setInternalSorting] = useState<SortingState>([])
    const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFiltersState>([])
    const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({})
    const [internalColumnVisibility, setInternalColumnVisibility] = useState<VisibilityState>({})
    const [paginationState, setPaginationState] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    })

    // Usar estados controlados o internos
    const currentSorting = sorting ?? internalSorting
    const currentColumnFilters = columnFilters ?? internalColumnFilters
    const currentRowSelection = rowSelection ?? internalRowSelection
    const currentColumnVisibility = columnVisibilityState ?? internalColumnVisibility

    const handleSortingChange = (updater: any) => {
        const newSorting = typeof updater === 'function' ? updater(currentSorting) : updater
        onSortingChange ? onSortingChange(newSorting) : setInternalSorting(newSorting)
    }

    const handleColumnFiltersChange = (updater: any) => {
        const newFilters = typeof updater === 'function' ? updater(currentColumnFilters) : updater
        onColumnFiltersChange ? onColumnFiltersChange(newFilters) : setInternalColumnFilters(newFilters)
    }

    const handleRowSelectionChange = (updater: any) => {
        const newSelection = typeof updater === 'function' ? updater(currentRowSelection) : updater
        onRowSelectionChangeState ? onRowSelectionChangeState(newSelection) : setInternalRowSelection(newSelection)

        // Callback con los datos seleccionados
        if (onRowSelectionChange) {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original)
            onRowSelectionChange(selectedRows)
        }
    }

    const handleColumnVisibilityChange = (updater: any) => {
        const newVisibility = typeof updater === 'function' ? updater(currentColumnVisibility) : updater
        onColumnVisibilityChange ? onColumnVisibilityChange(newVisibility) : setInternalColumnVisibility(newVisibility)
    }

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting: currentSorting,
            columnFilters: currentColumnFilters,
            rowSelection: currentRowSelection,
            columnVisibility: currentColumnVisibility,
            ...(pagination && { pagination: paginationState }),
        },
        onSortingChange: handleSortingChange,
        onColumnFiltersChange: handleColumnFiltersChange,
        onRowSelectionChange: handleRowSelectionChange,
        onColumnVisibilityChange: handleColumnVisibilityChange,
        onPaginationChange: setPaginationState,
        getCoreRowModel: getCoreRowModel(),
        ...(sortable && { getSortedRowModel: getSortedRowModel() }),
        ...(searchable && { getFilteredRowModel: getFilteredRowModel() }),
        ...(pagination && { getPaginationRowModel: getPaginationRowModel() }),
        enableRowSelection: selectable,
    })

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Barra de herramientas */}
            {(searchable || columnVisibility) && (
                <div className="flex items-center justify-between">
                    {/* Búsqueda */}
                    {searchable && (
                        <Input
                            placeholder={searchPlaceholder}
                            value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn(searchColumn)?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    )}

                    {/* Visibilidad de columnas */}
                    {columnVisibility && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    <Settings2Icon className="h-4 w-4 mr-2" />
                                    Columns
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            )}

            {/* Tabla */}
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={selectable ? "cursor-pointer" : ""}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Paginación */}
            {pagination && (
                <div className="flex items-center justify-between px-2">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {selectable && (
                            <>
                                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                {table.getFilteredRowModel().rows.length} row(s) selected.
                            </>
                        )}
                    </div>
                    <div className="flex items-center justify-between w-full space-x-6 lg:space-x-8">
                        <div className="flex items-center w-1/2 space-x-2">
                            <h2>Filas por pagina</h2>
                            <CustomSelect
                                size="xs"
                                options={pageSizeOptions}
                                value={table.getState().pagination.pageSize.toString()}
                                className="flex justify-end"
                  
                                onValueChange={(value) => table.setPageSize(Number(value))}
                            />

                        </div>
                       
                        <div className="flex items-center space-x-2">
                            <h2>Page {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}</h2>
                         
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to first page</span>
                                <ChevronsLeftIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRightIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to last page</span>
                                <ChevronsRightIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}