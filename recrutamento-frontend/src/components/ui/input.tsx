import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#002d74] bg-white px-3 py-2 text-base text-[#002d74] placeholder-[#666] file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-2 focus:ring-[#002d74] focus:border-[#002d74] focus:ring-offset-0 transition disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
