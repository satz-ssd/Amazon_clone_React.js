import React,{useState,useEffect} from 'react'
import './Payment.css'
import CheckoutProduct from './../checkoutProductComponent/CheckoutProduct'
import { useStateValue } from './../../StateProvider'
import {Link,useHistory} from 'react-router-dom'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from './../../reducer';
import axios from './../../axios';
import {db} from './../../Firebase';
import firebase from 'firebase';

function Payment() {
    const [{basket,user},dispatch]=useStateValue();
    const history=useHistory();

    const stripe=useStripe();
    const elements=useElements();

    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("")
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [clientSecret,setClientSecret]=useState(true);

    useEffect(() => {
     //generate special stripe which allows us to charge customer
      const getClientSecret=  async()=>{
          const response=await axios({
              method:'post',
            //   stripe expects total in a currency subunits
              url:`/payments/create?total=${getBasketTotal(basket) * 100}`
          });
          setClientSecret(response.data.clientSecret)
      }
      getClientSecret();
    }, [basket])

    console.log('the secret is __',clientSecret)

    console.log('👨',user)

    const handleSubmit=async(e)=>{
        // stripe thing
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type:'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    }

    const handleChange=(e)=>{
        // listen to the changes in the card 
        // throws an err if anything goes wrong while entering card details 
        setDisabled(e.empty);
        setError(e.error?e.error.message :"");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout (<Link to="/checkout"> {basket?.length} items</Link>)</h1>
                {/* {delivery-addres} */}
                <div className="payment__section">

                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div> 

                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>testing address</p>
                        <p>jharkhand,India</p>
                    </div>
                </div>

                {/* {item-review} */}
                <div className="payment__section">

                    <div className="payment__title">
                            <h3>Review items & Delivery</h3>
                    </div> 
                    <div className="payment__items">
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
               
                {/* {payment-method} */}
               
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* {stripe} */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                      
                            <div className="payment__priceContainer">
                            <CurrencyFormat
                               renderText={(value)=>(
                                <>
                                 <h3>Order Total: {value}</h3>
                                </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p>:"Buy Now"}</span>
                               </button>
                            </div>
                                {/* {error} */}
                                {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Payment
