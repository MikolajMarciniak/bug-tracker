// components/ChevronToggle.tsx

"use client";

import React from "react";
import Image from "next/image";
import ChevronIcon from "../../public/icons/cheveron.svg";
import "../styles/components/cheverontoggle.css";

interface ChevronToggleProps {
  expanded: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  "aria-label"?: string;
}

const ChevronToggle: React.FC<ChevronToggleProps> = ({
  expanded,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`chevron-toggle ${expanded ? "rotate" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      <Image src={ChevronIcon} alt="Toggle" width={16} height={16} />
    </button>
  );
};

export default ChevronToggle;
