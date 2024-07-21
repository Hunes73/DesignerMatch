import React, { useState } from 'react';
import './Drop.css';
import { MenuItems } from './MenuList';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth';

function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const auth = useAuth();

  const handleSetClick = () => {
    setClick(false);
  };

  const handleMapClick = (item) => {
    if (item === 'handleLogOut') {
      setClick(false);
      localStorage.removeItem('storageLogin');
      auth.logout();
    } else if (item === 'handleSetClick') {
      setClick(false);
    }
  };
  return (
    <>
      <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.path} onClick={handleMapClick.bind(this, item.click)}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
