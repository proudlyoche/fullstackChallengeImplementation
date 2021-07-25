import React, { ReactElement, FC } from "react"

const Nav: FC = (): ReactElement => {
  return (
    <nav
      className="navbar navbar-light sticky-top bg-light flex-md-nowrap p-0 shadow"
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <a
        className="navbar-brand col-md-12 col-lg-12 mr-0 px-3"
        href="#"
        style={{
          backgroundColor: "rgb(0, 184, 197)",
          color: "white",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        Code Challenge
      </a>
    </nav>
  )
}

export default Nav
