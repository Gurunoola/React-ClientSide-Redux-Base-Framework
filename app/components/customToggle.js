import React, { Component } from 'react'
import { Link } from "react-router-dom";

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      className="text-decoration-none"
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {/* Render custom icon here */}
      {children}
    </Link>
  ));