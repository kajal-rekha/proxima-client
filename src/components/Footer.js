const Footer = () => {
  return (
    <footer className="footer text-slate-400 py-10 text-center">
      <p className="text-lg">
        &copy; {new Date().getFullYear()} Proxima. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
