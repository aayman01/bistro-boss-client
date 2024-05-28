import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // // console.log(menu);
    // useEffect(() => {
    //   fetch("http://localhost:5000/menu")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setMenu(data);
    //       setLoading(false);
    //     });
    // }, []);

    const {data : menu = [], refetch, isPending: loading} = useQuery({
      queryKey : ['menu'],
      queryFn : async () => {
        const res = await axiosPublic.get('/menu');
        console.log(res.data)
        return res.data;
      }
    })

    return [menu, loading, refetch]
};

export default useMenu;