import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './app.css'
//Import the pages
import SignIn from "./Components/auth/SignIn";
import SignUp from "./Components/auth/SignUp";
import AllCoffee from "./Components/coffee/AllCoffee";
import Profile from "./Components/info/Profile"
import About from "./Components/info/About"
import MakeCoffee from "./Components/coffee/MakeCoffee";
import CoffeeShow from "./Components/coffee/CoffeeShow";
function App() {
  const tokenValue = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/signin';
  }

  return (
    <div className="bg-gray-100 h-screen flex flex-col overflow-hidden">
      <Router>
        <header className="bg-white py-4 shadow-inner flex items-center justify-between px-4">
          <h1 className="text-3xl font-bold text-gray-800">COFFEE</h1>
          <nav className='nav'>
            <ul className="flex space-x-4">
              { tokenValue ?
                <>
                  <li><Link to="/">ALL COFFEE</Link></li>
                  <li><Link to="/make">MAKE COFFEE</Link></li>
                  <li><Link to="profile">PROFILE</Link></li>
                  <li><Link to="about">ABOUT US</Link></li>
                  <li onClick={ handleLogout } className="cursor-pointer text-red-500 hover:text-red-600 font-bold">SIGN OUT</li>
                </> :
                <>
                  <li><Link to="/">ALL COFFEE</Link></li>
                  <li><Link to="signIn">SIGN IN</Link></li>
                  <li><Link to="signUp">SIGN UP</Link></li>
                </>
              }
            </ul>
          </nav>
        </header>
        <main className="flex-grow">
          <Routes>
            <Route exact path="/" element={ <AllCoffee /> } />
            <Route exact path="profile" element={ <Profile /> } />
            <Route exact path="about" element={ <About /> } />
            <Route exact path="signIn" element={ <SignIn /> } />
            <Route exact path="signUp" element={ <SignUp /> } />
            <Route exact path="make" element={ <MakeCoffee /> } />
            <Route exact path="showcoffee/:id" element={ <CoffeeShow /> } />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
