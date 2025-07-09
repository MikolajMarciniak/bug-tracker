"use client";

import React, { useState } from "react";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";

const NavWrapper = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <NavBar
        sidebarCollapsed={isCollapsed}
        onToggleSidebar={() => setIsCollapsed((prev) => !prev)}
      />
      <SideBar isCollapsed={isCollapsed} />
    </>
  );
};

export default NavWrapper;
