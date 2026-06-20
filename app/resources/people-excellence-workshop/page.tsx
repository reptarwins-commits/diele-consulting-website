import WorkshopSheet from "@/components/WorkshopSheet";

export const metadata = {
  title: "People Excellence Workshop | Free Overview | Diele Consulting",
  description:
    "A 3-day workshop for leadership teams. Bring out the best in your people by improving culture, reducing interference, and building better day-to-day management habits.",
};

export default function WorkshopPage() {
  return (
    <main className="min-h-screen bg-white">
      <WorkshopSheet />
    </main>
  );
}
