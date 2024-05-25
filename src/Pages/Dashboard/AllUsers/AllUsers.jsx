import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch,data : users = []} = useQuery({
        queryKey : ['users'],
        queryFn : async () => {
            const res = await axiosSecure.get("/users");
            return res.data
        }
    })

    const handleDelete = (id) => {
         Swal.fire({
           title: "Are you sure?",
           text: "You won't be able to revert this!",
           icon: "warning",
           showCancelButton: true,
           confirmButtonColor: "#3085d6",
           cancelButtonColor: "#d33",
           confirmButtonText: "Yes, delete it!",
         }).then((result) => {
           if (result.isConfirmed) {
             axiosSecure.delete(`users/${id}`).then((res) => {
               if (res.data.deletedCount > 0) {
                 refetch();
                 Swal.fire({
                   title: "Deleted!",
                   text: "Succesfully deleted a user",
                   icon: "success",
                 });
               }
             });
           }
         });
    }


    const handleMakeAdmin = user =>{
        // console.log(id)
        axiosSecure.patch(`users/admin/${user._id}`)
        .then((res) => {
          console.log(res.data)
          refetch();
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${user.name} admin `,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }


    return (
      <div>
        <div className="flex justify-evenly my-4">
          <h2 className="text-4xl">All Users</h2>
          <h2 className="text-4xl">Total Usres: {users?.length}</h2>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Eamil</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id}>
                    <th>{idx + 1}</th>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>
                        { user.role === "admin" ? "Admin" : <button className="btn bg-orange-300" onClick={()=>handleMakeAdmin(user)}>
                            <FaUser className="text-white"/>
                        </button>}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn-lg"
                      >
                        <FaTrashAlt className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default AllUsers;