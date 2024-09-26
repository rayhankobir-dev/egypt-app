/* eslint-disable @typescript-eslint/no-explicit-any */
import SectionTitle from "@/components/section-title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGet from "@/hooks/use-get";
import { format } from "date-fns";

export default function AdminContacts() {
  const { data, isLoading, isError } = useGet<any>("/contacts");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading contacts.</p>;

  const contacts = data?.data?.contacts;

  return (
    <section className="flex flex-col gap-7">
      <SectionTitle title="Contacts" description="All contacts" />
      <Table className="border rounded-lg">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-nowrap">Full Name</TableHead>
            <TableHead className="text-nowrap">Email</TableHead>
            <TableHead className="text-nowrap">Subject</TableHead>
            <TableHead className="text-nowrap">Message</TableHead>
            <TableHead className="text-nowrap">Travel Date</TableHead>
            <TableHead className="text-nowrap">Submitted At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-auto">
          {contacts?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No contacts found.
              </TableCell>
            </TableRow>
          ) : (
            contacts?.map((contact: any) => (
              <TableRow key={contact._id}>
                <TableCell className="text-nowrap">
                  {contact.fullName}
                </TableCell>
                <TableCell className="text-nowrap">{contact.email}</TableCell>
                <TableCell className="line-clamp-2">
                  {contact.subject}
                </TableCell>
                <TableCell className="line-clamp-2">
                  {contact.message}
                </TableCell>
                <TableCell className="text-nowrap">
                  {contact.travelDate
                    ? format(contact.travelDate, "MMMM d, yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell className="text-nowrap">
                  {format(contact.createdAt, "MMMM d, yyyy")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
}
