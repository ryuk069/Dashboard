import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/application/todo')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full h-full">
          <iframe
            src="https://to-do-rose-nine.vercel.app/"
            className="h-1/1 w-full rounded-xl border"
          ></iframe>
        </div>
  );
}
