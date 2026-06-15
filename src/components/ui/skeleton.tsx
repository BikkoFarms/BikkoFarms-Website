import React from 'react';

export function Skeleton({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-neutral-border/40 dark:bg-neutral-border/20 ${className}`}
      {...props}
    />
  );
}
