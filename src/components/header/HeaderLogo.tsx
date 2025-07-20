import { NavLink } from 'react-router-dom';

const HeaderLogo = () => (
  <>
    <div className="col-auto">
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <NavLink
          to="/bots"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <img
            src="https://ik.imagekit.io/esdata1/botify/botify-logo-dark.svg"
            alt="Botify Logo"
            style={{ height: 32, marginRight: 8 }}
          />
          <span style={{ fontWeight: 700, fontSize: 22, color: '#222' }}>Life</span>
        </NavLink>
      </div>
    </div>
  </>
);

export default HeaderLogo;
