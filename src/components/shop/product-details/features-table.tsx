import { FeatureTableProps } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export default function FeaturesTable({
    specs,
    isLoading
}: FeatureTableProps) {
    if (isLoading) {
        return (
            <div className="rounded-md border p-8 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6b614f]"></div>
            </div>
        );
    }

    if (!specs) {
        return <p>No specifications available for this product.</p>;
    }

    // Convert specs object to array of entries
    const specsEntries = Object.entries(specs)

    // Calculate the midpoint to split the data into two tables
    const midpoint = Math.ceil(specsEntries.length / 2)

    // Split the data into two halves
    const firstHalf = specsEntries.slice(0, midpoint)
    const secondHalf = specsEntries.slice(midpoint)

    // Function to format the value (handle arrays)
    const formatValue = (value: string | number | string[] | number[]) => {
        if (Array.isArray(value)) {
            return value.join(", ")
        }
        return value
    }

    // Function to format the key (convert camelCase to Title Case with spaces)
    const formatKey = (key: string) => {
        return (
            key
                // Insert a space before all uppercase letters
                .replace(/([A-Z])/g, " $1")
                // Replace first character to uppercase
                .replace(/^./, (str) => str.toUpperCase())
        )
    }

    return (
        <div className="w-full">
            <h3 className="font-semibold mb-4 text-lg">Specifications:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Table className="border rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">Specification</TableHead>
                            <TableHead className="md:text-end font-bold">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {firstHalf.map(([key, value]) => (
                            <TableRow key={key} className="h-12 border-r">
                                <TableCell className="font-medium">{formatKey(key)} :</TableCell>
                                <TableCell className="md:text-end">{formatValue(value)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Table className="border rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">Specification</TableHead>
                            <TableHead className="md:text-end font-bold">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {secondHalf.map(([key, value]) => (
                            <TableRow key={key} className="h-12">
                                <TableCell className="font-medium">{formatKey(key)} :</TableCell>
                                <TableCell className="md:text-end">{formatValue(value)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}