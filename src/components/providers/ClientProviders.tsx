"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render providers during SSR to avoid framer-motion useContext error
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
    </>
  );
}
