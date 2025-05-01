import logo from '../assets/images/logo.png';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white flex items-center justify-between p-4 shadow-md">
            <img src={logo} alt="logo" className='h-16 p-3' />
        </nav>
    )
}

export default Navbar;