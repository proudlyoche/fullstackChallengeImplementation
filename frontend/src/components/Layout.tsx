import React, { ReactChild, ReactElement } from "react"
import Nav from "./Nav"

const Layout = (props: { children: ReactChild }): ReactElement => {
  return (
    <>
      <Nav />
      <div className="container-fluid" style={{ marginTop: "70px" }}>
        {props.children}
      </div>
    </>
  )
}

export default Layout
