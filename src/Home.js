import React from 'react';
import './Home.css';
import Product from './Product';
import Book_Image from './React_Book.jpg';

const Home = () => {
    return (
        <div className='home'>
            <div className='home_container'>
                <img
                    className='home_image'
                    src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
                    alt='cover_img' />

                <div className='home_row'>
                    <Product id={1234} title='Learning React : Functional Web Development with React and Redux' price={19.99} image={Book_Image} rating={5} />
                    <Product id={1233} title='Learning React : Functional Web Development with React and Redux' price={19.99} image={Book_Image} rating={5} />
                </div>

                <div className='home_row'>
                    <Product id={1235} title='Learning React : Functional Web Development with React and Redux' price={19.99} image={Book_Image} rating={5} />
                    <Product id={1264} title='Learning React : Functional Web Development with React and Redux' price={19.99} image={Book_Image} rating={5} />
                    <Product id={1255} title='Learning React : Functional Web Development with React and Redux' price={19.99} image={Book_Image} rating={5} />
                </div>

                <div className='home_row'>
                    <Product id={1236} title='Learning React : Functional Web Development with React and Redux By Alex Banks And Eve Porcello' price={19.99} image={Book_Image} rating={5} />
                </div>
            </div>
        </div>
    )
}

export default Home;
