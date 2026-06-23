import React, { Suspense } from "react";

interface MFELoaderProps {
  component: React.LazyExoticComponent<React.ComponentType>;
}

export const MFELoader: React.FC<MFELoaderProps> = ({
  component: Component,
}) => (
  <Suspense
    fallback={
      <div style={{ padding: "40px", color: "#6B7280", fontSize: "14px" }}>
        Loading...
      </div>
    }
  >
    <Component />
  </Suspense>
);
