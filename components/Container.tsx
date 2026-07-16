import type { ReactNode } from "react";

export interface ContainerProps {
  className?: string;
  children: ReactNode;
}

/*
  Container centers content and applies the standard horizontal gutter.
  Use it inside Section to constrain line length.
*/
export function Container({ className = "", children }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
