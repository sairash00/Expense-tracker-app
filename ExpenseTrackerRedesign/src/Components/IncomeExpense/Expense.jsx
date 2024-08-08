import Card from "./Card";
import { useState, useEffect } from "react";
import Add from "./Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkActive2 } from "../../utils/CheckActive";

const Expense = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  async function fetchExpense() {
    const response = await axios.get(
     `/api/v1/users/getExpenses`
    );
    const resdata = response.data.Expenses
    setData(resdata);
  }

  useEffect(() => {
    checkActive2(navigate);
    try {
      fetchExpense();
    } catch (error) {
      return;
    }
  });

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };

  const [expense, setExpense] = useState(0);
  useEffect(() => {
    const sum = data.reduce((acc, item) => acc + item.amount, 0);
    setExpense(sum);
  }, [data]);

  return (
    <>
      {show ? <Add income={false} setShow={toggleShow} /> : null}
      <div className=" w-[60%] max-md:w-full max-sm:px-[2rem] max-md:px-[4rem] flex gap-8 flex-col py-[3rem] px-[2rem] max-h-[90vh] overflow-y-auto ">
        <div className=" px-1 py-2 flex justify-between items-center ">
          <div className="flex flex-col gap-2">
            <div className=" text-lg ">Total Expense</div>
            <div className="text-2xl max-xs:text-xl font-semibold ">
              Rs. {expense}
            </div>
          </div>
          <div
            onClick={toggleShow}
            className=" flex items-center hover:bg-[#e4e3e3] group justify-center w-12 h-12 rounded-full border "
          >
            <div className=" text-3xl transition-all group-hover:text-[#000] font-semibold font-[none] ">
              +
            </div>
          </div>
        </div>
        <hr className=" border-gray-500 " />
        <div className=" flex flex-col gap-5 ">
        {
            data?.map((card)=>(
             <Card key={card._id} income={false} data={card} />
            ))
        }
        </div>
      </div>
    </>
  );
};

export default Expense;
