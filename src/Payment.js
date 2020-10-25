import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './Axios';

const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();

    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [error, seterror] = useState(null);
    const [processing, setprocessing] = useState("");
    const [disabled, setdisabled] = useState(true);
    const [succeeded, setsucceeded] = useState(false);
    const [clientSecret, setclientSecret] = useState(true);

    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer 
        const getClientSecret = async () => {
            const res = await axios({
                method: 'POST',
                accessControlAllowOrigin: null,
                // Stripe expects the total in a curriencies submits
                url: `/payments/create?total=${parseInt(getBasketTotal(basket) * 100)}`,
            });
            setclientSecret(res.data.clientSecret);
        }
        getClientSecret();

    }, [basket]);

    console.log('total is ', getBasketTotal(basket))
    console.log('the Secret is >> ', clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setprocessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        }).then(({ paymentIntent }) => {
            //PaymentIntent - payment Confirmation
            setsucceeded(true);
            seterror(null);
            setprocessing(false);

            history.replace('/orders');
        })
    };
    const handleChange = event => {
        //listen Changes in the card elements
        //and Display any errors as the customers types thier card details
        setdisabled(event.empty);
        seterror(event.error ? event.error.message : "");
    };
    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout ({<Link to='/checkout'>{basket?.length} items</Link>})
                </h1>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address:</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>123 ,React Lane</p>
                        <p>near Angular's Jail , JS , Code,</p>
                    </div>
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                image={item.image}
                            />
                        ))}
                    </div>
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method:</h3>
                    </div>
                    <div className='payment_details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment_priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total : {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
