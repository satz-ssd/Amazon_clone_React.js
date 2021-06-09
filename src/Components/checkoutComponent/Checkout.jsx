import React from 'react'
import './Checkout.css'
import { useStateValue } from '../../StateProvider'
import Subtotal from '../subtotalComponent/Subtotal'
import CheckoutProduct from '../checkoutProductComponent/CheckoutProduct'

function Checkout() {
  const [{basket,user},dispatch]=useStateValue();
    return (
        <div className="checkout">
          <div className="checkout__left">
            <img className="checkout__ad" src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Vernac13th/1500x150_V2_Eng._CB412582591_.jpg"
            alt=""/> 

            <div>
                <h3>Hello, {user?.email}</h3>
                <h2 className="checkout__title">
                    Your shopping Cart
                </h2>

                {basket.map((item)=>(
                   <CheckoutProduct
                   id={item.id}
                   title={item.title}
                   price={item.price}
                   rating={item.rating}
                   image={item.image}
                 
                  />
                ))}

            </div>
          </div>

          <div className="checkout__right">
            <Subtotal/>
          </div>
        </div>
    )
}

export default Checkout
