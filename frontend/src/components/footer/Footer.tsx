import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="footer-basic">
      <div className="social">
        <IconButton
          color="primary"
          component={Link}
          to="//github.com/DelwarSumon"
          sx={{ border: "1px solid" }}
          aria-label="GitHub"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          color="primary"
          component={Link}
          to="//linkedin.com/in/md-delwar-hossain-a46117139/"
          sx={{ border: "1px solid" }}
          aria-label="LinkedIn"
          target="_blank"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          color="primary"
          component={Link}
          to="/"
          sx={{ border: "1px solid" }}
          aria-label="Facebook"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          color="primary"
          component={Link}
          to="/"
          sx={{ border: "1px solid" }}
          aria-label="Instagram"
        >
          <InstagramIcon />
        </IconButton>
      </div>
      <ul className="list-inline">
        <li className="list-inline-item">
          <Link to="/">Home</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/products">Product</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/about">About</Link>
        </li>
      </ul>
      <p className="copyright">TryCatch © 2023</p>
    </footer>
  );
};

export default Footer;
