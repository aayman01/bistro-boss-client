import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const PaymentHistory = () => {
    const { user } = useAuth();
    const axioSecure = useAxiosSecure();

    const { data : payments = [] } =  useQuery({
        queryKey : ['payments', user?.email],
        queryFn : async () => {
            const res = await axioSecure.get(`/payments/${user.email}`)
            console.log(res.data)
            return res.data;
        }
    })
    return (
      <div>
        <h2 className="text-4xl font-bold">Total Payments: {payments?.length}</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Email</th>
                <th>Transaction Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr key={payment._id}>
                  <td>{idx + 1}</td>
                  <td>{payment.email}</td>
                  <td>{payment.transcationId}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default PaymentHistory;