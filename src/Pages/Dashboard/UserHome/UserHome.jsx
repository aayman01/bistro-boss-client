import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth();
  return (
    <div className="text-3xl">
      <span>Hi! Welcome</span>
      {
        user?.displayName ? user?.displayName : 'back'
      }
    </div>
  ) 
};

export default UserHome;