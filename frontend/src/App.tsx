import "./App.css"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./pages/home/home"
import { ReactElement } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App(): ReactElement {
  return (
    <>
      <ToastContainer />
      <div className="App">
        <BrowserRouter>
          <Route path={"/"} exact component={Home} />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
