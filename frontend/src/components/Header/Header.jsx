import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>"Savor the flavors, cherish the moments."</h2>
            <p>"Every meal is a journey, every bite a memory."</p>
            <button>
                View Menu
            </button>
        </div>
    </div>
  );
}

export default Header;
