import { Button } from "../ui/button";
export function Btn({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      className={`bg-neutral-900 border rounded-md px-3 py-1.5 text-xs font-mono tracking-wide cursor-pointer transition-colors
        ${
          danger
            ? "border-red-900 text-red-500 hover:bg-red-950"
            : "border-neutral-800 text-neutral-300 hover:bg-neutral-800"
        }`}
    >
      {children}
    </Button>
  );
}
