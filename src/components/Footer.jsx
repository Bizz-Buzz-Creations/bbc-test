const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-4 text-center bg-gray-800 text-white">
            <p className="font-mono text-sm">Copyright &copy; {currentYear} BizzBuzz Creations. All Rights Reserved</p>
        </footer>
    )
}

export default Footer;