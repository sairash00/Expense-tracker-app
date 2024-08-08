import axios from "axios";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Card = ({ income , data }) => {
  const [deleted, setDeleted] = useState(false);

  const deleteIncome = async () => {
    try {
      const response = await axios.post(`/api/v1/users/deleteIncome`, { id: data._id });
      const info = response.data;
      if (info.success) {
        setDeleted(true);
      }
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const deleteExpense = async () => {
    try {
      const response = await axios.post(`/api/v1/users/deleteExpense`, { id: data._id });
      const info = response.data;
      if (info.success) {
        setDeleted(true);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleDeletion = () => {
    if (income) {
      deleteIncome();
    } else {
      deleteExpense();
    }
  };

  if (deleted) {
    return null; 
  }

  return (
    <div className={income ? 
                    "flex relative flex-col gap-2 px-4 py-4 min-h-[20vh] bg-gradient-to-tr from-[#09841d] to-[#12eb37] rounded-lg" :
                    "flex relative flex-col gap-2 px-4 py-4 min-h-[20vh] bg-gradient-to-tr from-[#9f0707] to-[#eb1212] rounded-lg"}>
      <RxCross2 onClick={handleDeletion} className="text-2xl absolute top-4 right-4 font-semibold" />
      <div className="text-sm">{new Date(data?.createdAt).toLocaleDateString()}</div>
      <div className="text-xl font-semibold">{income ? data?.source : data?.purpose}</div>
      <div className="text-2xl font-bold">Rs. {data?.amount}</div>
      <div className="text-sm">{data?.fullName}</div>
    </div>
  );
};

export default Card;
