import React, { useState } from 'react';

const Addcredits = () => {

        // Get back userId and email
        const userId = localStorage.getItem('userId')
        const userEmail = localStorage.getItem('userEmail')

    if(userId) {
        return (
            <div className="align-items-center col-sm-6">
                <h4 className="mb-3">Credit Purchase</h4>
    
                <div className="my-3">

            <div className="form-check">
            <input id="credit1" name="numcredit" type="radio" className="form-check-input" required />
            <label className="form-check-label" >1 credit / $10 CAD</label>
            </div>
            <div className="form-check">
            <input id="credit5" name="numcredit" type="radio" className="form-check-input" required />
            <label className="form-check-label" >5 credits / $48 CAD</label>
            </div>
            <div className="form-check">
            <input id="credit10" name="numcredit" type="radio" className="form-check-input" required />
            <label className="form-check-label" >10 credits / $90 CAD</label>
            </div>

            <hr className="my-4" />
            </div>
                <h4 className="mb-3">Billing address</h4>
                <form className="needs-validation" noValidate>
                    <div className="row g-3">
                        <div className="col-sm-6">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input type="text" className="form-control" id="firstName" placeholder="" required />
                            <div className="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>
    
                        <div className="col-sm-6">
                            <label htmlFor="lastName" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="lastName" placeholder="" required />
                            <div className="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>
    
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
                            <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                            <div className="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>
    
                        <div className="col-12">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                            <div className="invalid-feedback">
                                Please enter your shipping address.
                            </div>
                        </div>
    
                        <div className="col-12">
                            <label htmlFor="address2" className="form-label">Address 2 <span className="text-body-secondary">(Optional)</span></label>
                            <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                        </div>
    
                        <div className="col-md-5">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="address" placeholder="Canada" required />
                            <div className="invalid-feedback">
                                Please select a valid country.
                            </div>
                        </div>
    
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <input type="text" className="form-control" id="address" placeholder="British Columbia" required />
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
    
                        <div className="col-md-3">
                            <label htmlFor="zip" className="form-label">Zip</label>
                            <input type="text" className="form-control" id="zip" placeholder="" required />
                            <div className="invalid-feedback">
                                Zip code required.
                            </div>
                        </div>
                    </div>
    
                    <hr className="my-4" />
    
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="save-info" />
                        <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                    </div>
    
                    <hr className="my-4" />
    
                    <h4 className="mb-3">Payment</h4>
    
                    <div className="my-3">
                        <div className="form-check">
                            <input id="credit" name="paymentMethod" type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="credit">Credit card</label>
                        </div>
                        <div className="form-check">
                            <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="debit">Debit card</label>
                        </div>
                        <div className="form-check">
                            <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="paypal">PayPal</label>
                        </div>
                    </div>
    
                    <div className="row gy-3">
                        <div className="col-md-6">
                            <label htmlFor="cc-name" className="form-label">Name on card</label>
                            <input type="text" className="form-control" id="cc-name" placeholder="" required />
                            <small className="text-body-secondary">Full name as displayed on card</small>
                            <div className="invalid-feedback">
                                Name on card is required
                            </div>
                        </div>
    
                        <div className="col-md-6">
                            <label htmlFor="cc-number" className="form-label">Credit card number</label>
                            <input type="text" className="form-control" id="cc-number" placeholder="" required />
                            <div className="invalid-feedback">
                                Credit card number is required
                            </div>
                        </div>
    
                        <div className="col-md-3">
                            <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                            <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                            <div className="invalid-feedback">
                                Expiration date required
                            </div>
                        </div>
    
                        <div className="col-md-3">
                            <label htmlFor="cc-cvv" className="form-label">CVV</label>
                            <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                            <div className="invalid-feedback">
                                Security code required
                            </div>
                        </div>
                    </div>
    
                    <hr className="my-4" />
    
                    <button className="w-100 btn btn-primary btn-lg" type="submit" onClick={() => alert('Purahcse failed!')}>Continue to checkout</button>
                    <hr className="my-4" />
                </form>
            </div>
        );
    } else {
    return(
        <div>
            <h1>Please log in.</h1>
        </div>
    )
    }
}

export default Addcredits;