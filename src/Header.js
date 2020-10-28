import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

const Header = () => {
    const [{ basket, user }] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }
    return (
        <div className='header'>
            <Link to='/'>
                <img className='header_logo'
                    src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
                    alt='Logo'
                />
            </Link>
            <div
                className='header_search'>
                <input className='header_searchInput'
                    type='text' />
                <SearchIcon className='header_searchIcon' />
            </div>

            <div className='header_nav'>
                <Link to={!user && '/login'} className='header_Link'>
                    <div onClick={handleAuthentication} className='header_option'>
                        <span className='header_optionLineOne header_specialSpan'>
                            Hello, {user === null ? 'Guest' : `${user.email}`}
                        </span>
                        <span className='header_optionLineTwo'>
                            {user === null ? 'Login' : 'Sign out'}
                        </span>
                    </div>
                </Link>
                <Link to='/orders' className='header_Link'>
                    <div className='header_option'>
                        <span className='header_optionLineOne'>
                            Returns
                   </span>
                        <span className='header_optionLineTwo'>
                            &Orders
                   </span>
                    </div>
                </Link>
                <Link to='/Prime' className='header_Link'>
                    <div className='header_option'>
                        <span className='header_optionLineOne'>
                            Your
                   </span>
                        <span className='header_optionLineTwo'>
                            Prime
                   </span>
                    </div>
                </Link>
                <Link to='/checkout' className='header_Link'>
                    <div className='header_optionBasket'>
                        <ShoppingBasketIcon />
                        <span
                            className='header_optionLineTwo header_basketCount'
                        >
                            {basket.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;
