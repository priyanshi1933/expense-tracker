import moment from "moment";
import { data } from "react-router-dom";
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSeperator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData=(data=[])=>{
  const chartData=data.map((item)=>({
    category:item?.category,
    amount: Number(item?.amount) || 0,
  }))
  return chartData;
}



export const prepareIncomeBarChartData = (data = []) => {
  const grouped = data.reduce((acc, item) => {
    // 1. Format the date to use as a key (e.g., "15th Feb")
    const dateKey = moment(item?.date || item?.Date).format('Do MMM');
    
    if (!acc[dateKey]) {
      acc[dateKey] = { category: dateKey, amount: 0 };
    }
    // 2. Add the amounts together so they don't overwrite each other
    acc[dateKey].amount += Number(item?.amount || 0);
    return acc;
  }, {});

  // 3. Convert back to array and sort by date
  return Object.values(grouped).sort((a, b) => 
    moment(a.category, 'Do MMM').toDate() - moment(b.category, 'Do MMM').toDate()
  );
};

export const prepareExpenseLineChartData=(data=[])=>{
  const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));
  const chartData=sortedData.map((item)=>({
    month:moment(item?.date).format("Do MMM"),
    amount:item?.amount,
    category:item?.category,
  }))
  return chartData;
}


