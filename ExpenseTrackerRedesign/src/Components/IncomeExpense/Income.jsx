import Card from "./Card";
import Add from "./Add";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkActive2 } from "../../utils/CheckActive";
import axios from "axios";

const Income = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [income, setIncome] = useState(0);
  const [show, setShow] = useState(false);

  async function fetchIncome() {
    try {
      const response = await axios.get( `/api/v1/users/getIncomes`);
      const resdata = response.data.incomes;
      setData(resdata);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkActive2(navigate);
    fetchIncome();
  }, [navigate]);

  useEffect(() => {
    const sum = data.reduce((acc, item) => acc + item.amount, 0);
    setIncome(sum);
  }, [data]);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <>
      {show ? <Add income={true} setShow={toggleShow} /> : null}
      <div className="w-[60%] max-md:w-full max-sm:px-[2rem] max-md:px-[4rem] flex gap-8 flex-col py-[3rem] px-[2rem] max-h-[90vh] overflow-y-auto">
        <div className="px-1 py-2 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="text-lg">Total Income</div>
            <div className="text-2xl max-xs:text-xl font-semibold">Rs. {income}</div>
          </div>
          <div onClick={toggleShow} className="flex items-center hover:bg-[#e4e3e3] group justify-center w-12 h-12 rounded-full border">
            <div className="text-3xl transition-all group-hover:text-[#000] font-semibold font-[none]">+</div>
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex flex-col gap-5">
          {data.map((card) => (
            <Card key={card._id} income={true} data={card} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Income;
