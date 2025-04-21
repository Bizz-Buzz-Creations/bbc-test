const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-4 text-center">
            <p>Copyright &copy; {currentYear} BizzBuzz Creations. All Rights Reserved</p>
        </footer>
    )
}

export default Footer;