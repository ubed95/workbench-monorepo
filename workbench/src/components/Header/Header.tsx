import './header.scss';
import { useAuthDetails } from '@redux/auth/auth.hook';

const Header = () => {
  const { isUserLoggedIn, user, postLogoutUser } = useAuthDetails();
  return (
    <header className="header">
      <div className="header__title">Kiwi Insurance</div>
      {isUserLoggedIn && (
        <span className="header__profile-btn">
          Welcome {user?.firstName}! {` `}
          <button
            className="header__logout-btn"
            onClick={() => postLogoutUser()}
          >
            Logout
          </button>
        </span>
      )}
    </header>
  );
};

export default Header;
