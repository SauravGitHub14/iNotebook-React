import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link , useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast'

function Navbarr(props) {
  let navigate = useNavigate();


  return (

<Navbar  sticky="top" expand="lg" className=" navbar-dark bg-dark">
<Container fluid>
  <Navbar.Brand href="/">iNoteBook App</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
      <Nav.Link  href="/home" >Home</Nav.Link>
      <Nav.Link  href="/about">Notes</Nav.Link>
    </Nav>
    { !localStorage.getItem('token') ?
    <Form className="d-flex">
     
        <Link className='btn btn-outline-primary mx-2' to ='/login' role='button'>Login</Link>
        <Link className='btn btn-outline-primary mx-1' to ='/signup' role='button'>Signup</Link>
    </Form>  : <button  onClick={() => {
          localStorage.removeItem('token');
          navigate('/login')
          toast.success("Logged Out");
      }}
      className='btn btn-outline-primary mx-1' to ='/login' >Logout</button>
      
    
}
  </Navbar.Collapse>
</Container>
</Navbar>
  );
}

export default Navbarr;