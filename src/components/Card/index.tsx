import React from "react";
import { classNames } from "../../utils/classNames";

export default function Card({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={classNames(
        className ?? "",
        "bg-white overflow-hidden shadow rounded-lg"
      )}
    >
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}
