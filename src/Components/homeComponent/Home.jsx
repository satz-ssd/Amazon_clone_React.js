import React from 'react'
import Product from '../productComponent/Product'
import './Home.css'
function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/HFC/April20/Gateway/DesktopHero_HFC_1500x600_Recharge1._CB414105779_.jpg"
                alt="" />
                {/* https://images-eu.ssl-images-amazon.com/images/G/31/img20/Fashion/EVENT/GW-SS-Jan21/pc-bunk-1500._CB412871969_.jpg */}
                <div className="home__row">
                    <Product title="World’s Greatest Books For Personal Growth & Wealth (Set of 4 Books): Perfect Motivational"
                     price={20.11} image="https://images-na.ssl-images-amazon.com/images/I/71frknp-CWL.jpg"
                     rating={5}/>

                    <Product title="LG 668 L InstaView Door-in-Door Wi-Fi Inverter linear Refrigerator Stainless Steel, Inverter Compressor)"
                     price={2679.66} image="https://images-na.ssl-images-amazon.com/images/I/615TKQmb6LL._SL1500_.jpg"
                     rating={5}/>
                </div>
                <div className="home__row">
                    <Product title="Apple iPad Pro (11-inch, Wi-Fi, 256GB) - Space Grey"
                        price={1035.16} image="https://images-na.ssl-images-amazon.com/images/I/81p1L85KinL._SL1500_.jpg"
                        rating={4}/>
                
                <Product title="JBL Pulse 4 Portable Bluetooth Speaker with 360-Degree LED"
                        price={197.99} image="https://images-na.ssl-images-amazon.com/images/I/61HXIajZwhL._SL1500_.jpg"
                        rating={4}/>

                    <Product title="Lenovo IdeaPad Slim 5i 11th Gen Intel Core i5 Laptop"
                        price={1324.99} image="https://images-na.ssl-images-amazon.com/images/I/61WNxdAeAoL._SL1000_.jpg"
                        rating={4}/>
                </div>
                <div className="home__row">

                    <Product title="Samsung 80 cm (32 Inches) HD Ready LED TV UA32T4010ARXXL (Black) (2020 model)"
                        price={1801.1} image="https://cdn.shopify.com/s/files/1/1034/1611/products/samsung_lc49rg90ssnxza_c49rg90s_49_lcd_monitor_1548769523_1449627_600x.jpg?v=1572043303"
                        rating={4}/>
                </div>
            </div>     
        </div>
    )
}

export default Home