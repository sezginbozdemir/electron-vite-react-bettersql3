import { createFileRoute } from "@tanstack/react-router";
import { TablePage } from "@/pages/table";

export const Route = createFileRoute("/table")({
  component: TablePage,
});
