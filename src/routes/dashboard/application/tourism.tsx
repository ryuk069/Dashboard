import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/application/tourism")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://tourism.sy670887.workers.dev/"
        className="h-1/1 w-full rounded-xl border"
      ></iframe>
    </div>
  );
}
