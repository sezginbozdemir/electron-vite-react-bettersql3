import { FsPage } from "@/pages/fs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/fs")({
  component: FsPage,
});
