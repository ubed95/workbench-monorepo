import { Link } from 'react-router';
import './footer.scss';

const Footer = () => (
  <footer className="footer">
    <span>Copyright @Kiwi</span>
    <Link className="footer__demo-link" to="/components">
      Components
    </Link>
  </footer>
);

export default Footer;
