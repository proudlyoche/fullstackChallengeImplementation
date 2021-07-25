import React, { ReactElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/Layout"
import UserDataModal from "../../components/modals/UserDataModal"
import { RootState } from "../../redux/rootReducer"

import {
  deleteRecord,
  getUsers,
  showUpdateModal,
  toggleModal,
} from "../../redux/userSlice"
import Swal from "sweetalert2"
import "./home.css"

const Home = (): ReactElement => {
  const dispatch = useDispatch()
  const handleModalToggle = () => dispatch(toggleModal())

  useEffect(() => {
    dispatch(getUsers())
  }, [])
  const userState = useSelector((state: RootState) => state.user)
  return (
    <Layout>
      <>
        <div
          className="row justify-content-between col-md-9 col-xs-12 mx-auto"
          style={{ marginBottom: "10px" }}
        >
          <div className="col-4 d-flex justify-content-start">
            <span
              style={{ fontWeight: "bold", color: "#000", fontSize: "20px" }}
            >
              Users
            </span>
          </div>
          <div className="col-5 d-flex justify-content-end">
            <button
              type="button"
              className="btn"
              onClick={() => dispatch(toggleModal())}
              style={{ backgroundColor: "#00b8c5", color: "#ffffff" }}
            >
              <i className="fa fa-plus"></i>&nbsp;&nbsp;Create User
            </button>
          </div>
        </div>
        {userState.modalState && (
          <UserDataModal
            toggleModal={handleModalToggle}
            modalState={userState.modalState.status}
          />
        )}

        <div className="row ">
          <div
            className="col-md-9 col-xs-12 mx-auto"
            style={{ padding: "0px" }}
          >
            <main
              role="main"
              className="col-md-12 ml-sm-auto col-lg-12 px-md-4"
            >
              <div className="table-responsive">
                {userState.status === "failed" && (
                  <h3 style={{ color: "#A00" }}>
                    Error getting users, please check connection and try again
                  </h3>
                )}
                {userState.status === "loading" && <h3>Loading...</h3>}
                {userState.status === "succeeded" && (
                  <table
                    className="table table-curved"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <tr>
                      <td>NAME</td>
                      <td>EMAIL</td>
                      <td>ROLE</td>
                      <td>ACTIONS</td>
                    </tr>
                    <tbody>
                      {userState.users.map((user) => (
                        <tr key={user._id} style={{ fontWeight: "bold" }}>
                          <td>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => dispatch(showUpdateModal(user))}
                            >
                              {user.name}
                            </a>
                          </td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <a
                              onClick={() =>
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "You won't be able to revert this!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, delete it!",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    dispatch(deleteRecord(user._id))
                                  }
                                })
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </main>
          </div>
        </div>
      </>
    </Layout>
  )
}

export default Home
