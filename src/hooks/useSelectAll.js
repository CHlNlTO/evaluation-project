import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react";

const useSelectAll = async (table_name) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: responseData } = await supabase.from(table_name).select('*');
        setData(responseData || []); // Ensure responseData is an array or default to an empty array
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [table_name]); // Include table as a dependency if it might change

  return data;
}
export default useSelectAll;

