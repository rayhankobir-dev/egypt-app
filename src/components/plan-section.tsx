import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlanTripSection({ className }: { className?: string }) {
  return (
    <section className={className}>
      <div className="relative bg-green-900 text-white rounded-2xl p-10">
        <div className="relative max-w-lg flex flex-col gap-8">
          <h1 className="font-medium text-3xl">
            Get a personalized itinerary just for you, guided by traveler tips
            and reviews.
          </h1>
          <Button className="w-full lg:w-fit h-12 px-24 text-lg gap-2 text-white bg-transparent hover:bg-green-800 border rounded-xl">
            <Phone size={20} />
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
