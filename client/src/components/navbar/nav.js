import { useHistory } from "react-router-dom"
import { Navbar,Container,Nav } from "react-bootstrap"
import { UserContext } from "../../context/userContext"
import { useContext } from "react"
export default function Navtop(){
    const [state, dispatch] = useContext(UserContext)

    let history = useHistory()
    const logout =()=>{
        sessionStorage.clear();
        dispatch({
            type: 'LOGOUT'
        })
        history.push('/')
    }
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/home">User Table</Nav.Link>
                <Nav.Link href="/product">Product Table</Nav.Link>
                <Nav.Link style={{marginLeft:900}} onClick={logout}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}