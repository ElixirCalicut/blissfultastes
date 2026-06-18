import  {React}  from 'react';
import { useSelector } from 'react-redux';

import "../../../styles/Custom.css"

const CurrencyDisplay = ({ amount,largeFont }) =>
   {
    const settingdetails= useSelector((state)=>state.settings.settingdetails);

    
  return (
   settingdetails?(
    <span className={largeFont ? 'large-font' : 'assistant-font fw-bold mb-0'}>
 {parseFloat(amount).toFixed(3)}    {settingdetails.currency_type?settingdetails.currency_type:"USD"} 
    </span>
    ):<></>
 
  );
};

export default CurrencyDisplay;
