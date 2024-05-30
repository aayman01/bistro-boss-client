import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
    const [error, setError] = useState('');
    const [clientSecrect, setClientSecrect] = useState('');
    const [transcationId, setTranscationId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const {user} = useAuth();
    const navigate = useNavigate();


    const totalPrice = cart.reduce((total , item) => total + item.price, 0)
    console.log('Total Price:',totalPrice)
    // console.log(clientSecrect)

     useEffect(() => {
       if (totalPrice > 0) {
         axiosSecure
           .post("/create-payment-intent", { price: totalPrice })
           .then((res) => {
             console.log(res.data.clientSecret);
             setClientSecrect(res?.data?.clientSecret);
           });
       }
     }, [axiosSecure, totalPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement)

        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('payment error',error)
            setError(error?.message)
        } else {
            console.log('payment method', paymentMethod)
            setError('')
        }

        // confrom payment

        const {paymentIntent, err} = await stripe.confirmCardPayment(clientSecrect, {
          payment_method: {
            card: card,
            billing_details: {
              email: user.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        })

        if(err){
          console.log('confrom error')
        }
        else{
          console.log('payment intent', paymentIntent)
          if(paymentIntent.status === "succeeded"){
            console.log('transactionid',paymentIntent.id)
            setTranscationId(paymentIntent.id)


            // now set payment in database
            const payment = {
              email : user.email,
              price : totalPrice,
              transcationId : paymentIntent.id,
              date : new Date(),
              cartIds : cart.map(item => item._id),
              menuItemIds : cart.map(item => item.menuId),
              status : 'pending'
            }

            const res = await axiosSecure.post("/payments", payment);
            console.log('payment saved', res.data)
            refetch();
            if (res.data?.paymentResult?.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thank you for the taka paisa",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/dashborad/paymentHistory");
            }

          }
        }



    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm my-4"
            disabled={!stripe || !clientSecrect}
          >
            Pay
          </button>
          <p className="text-red-500">{error}</p>
          {transcationId && (
            <p className="text-green-500">
              Your Transaction Id: {transcationId}
            </p>
          )}
        </form>
      </div>
    );
};

export default CheckOutForm;