import ClientOnly from "@/components/ClientOnly";
import AddListing from "@/components/listings/AddListing";

export default function AddListingPage() {
  return (
    <ClientOnly>
      <AddListing />
    </ClientOnly>
  );
}
