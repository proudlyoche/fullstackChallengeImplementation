/* eslint-disable prettier/prettier */
import React, { ReactElement, useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { createUser, updateUser } from "../../redux/userSlice"
interface PropsParamsType {
  toggleModal: () => void
  modalState: boolean
}
const UserDataModal = ({
  toggleModal,
  modalState,
}: PropsParamsType): ReactElement => {
  const userState = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const [id, setUserId] = useState(userState.user?._id)
  const [name, setName] = useState(userState.user?.name)
  const [email, setEmail] = useState(userState.user?.email)
  const [role, setRole] = useState(userState.user?.role)

  useEffect(() => {
    setUserId(userState.user?._id)
    setName(userState.user?.name)
    setEmail(userState.user?.email)
    setRole(userState.user?.role)
  }, [userState.user]) 
    
  const handleSubmit = () => {
    if (!name) {
      alert("Please enter a name to proceed")
    } else if (!email) {
      alert("Please an email to proceed")
    } else if (!role || role === "Select a Role") {
      alert("Please select a role to proceed")
    } else {
      if (userState.modalState.type === "create") {
        const payload = {
          name: name,
          email: email,
          role: role,
        }
        dispatch(createUser(payload))
        setEmail("")
        setName("")
      } else if (userState.modalState.type === "update") {
        const payload = {
          _id: id,
          name: name,
          email: email,
          role: role,
        }
        dispatch(updateUser(payload))
      }
    }
  }
  return (
    <Modal
      show={modalState}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {userState.modalState.type === "create" ? "Create" : "Update"} User
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {userState.creating === "failed" || userState.updating === "failed" ? (
          <span style={{ color: "#A00" }}>{userState.message}</span>
        ) : ""}
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label style={{ fontWeight: "bold" }}>NAME</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label style={{ fontWeight: "bold" }}>EMAIL</Form.Label>
            <Form.Control
              type="email"
              required={true}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label style={{ fontWeight: "bold" }}>ROLE</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setRole(e.target.value)}
              defaultValue={role}
            >
              <option>Select a Role</option>
              <option>User</option>
              <option>Admin</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {/* {closeModal && handleClose()} */}
        {userState.status == "loading" && (
          <span
            className="text-center"
            style={{
              color: "#000000",
              width: "100%",
              display: "block",
            }}
          >
            Processing...
          </span>
        )}
        <Button
          variant="default"
          onClick={toggleModal}
          style={{
            color: "#000000",
            width: "100%",
            fontWeight: "bold",
            display: "block",
          }}
        >
          Cancel
        </Button>
        {userState.creating === "loading" || userState.updating === "loading"
        
          ? <Button
            variant="default"
            style={{
              backgroundColor: "gray",
              color: "#ffffff",
              width: "100%",
              display: "block",
            }}
          >:
            {userState.modalState.type === "create" ? "Create" : "Update"} User
          </Button> :
          <Button
            variant="default"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#00b8c5",
              color: "#ffffff",
              width: "100%",
              display: "block",
            }}
          >
            {userState.modalState.type === "create" ? "Create" : "Update"} User
          </Button>
        }
        

      </Modal.Footer>
    </Modal>
  )
}

export default UserDataModal
