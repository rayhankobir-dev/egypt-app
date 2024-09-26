import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGet from "@/hooks/use-get";

export default function AdminContacts() {
  const { data, isLoading, isError } = useGet("/contacts");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  console.log(data?.data?.contacts);

  return (
    <Table className="border rounded-lg ">
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Submitted At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.contacts.map((invoice) => (
          <TableRow key={invoice._id}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell>{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
