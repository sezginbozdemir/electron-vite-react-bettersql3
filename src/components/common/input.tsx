import { Input } from "../ui/input";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Inp({ children, ...props }: Props) {
  return (
    <Input
      {...props}
      className={
        "bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-200 font-mono outline-none focus:border-neutral-600 transition-colors w-full"
      }
    />
  );
}
