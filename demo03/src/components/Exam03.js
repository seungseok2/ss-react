import { useState } from "react";

// function Exam03(){};
// const Exam03 = function(){};
const Exam03 = () =>{

    const[money,setMoney]=useState(0);

    return(

        <>

            <h3>세 번째 예제</h3>
            <br/>
            <h4>출금 금액 = {money}원</h4>
            <br/>
            <button onClick={()=>setMoney(100000+money)} className="btn btn-info me-1">10만원</button>                        
            <button onClick={()=>setMoney(50000+money)} className="btn btn-info me-1">5만원</button>                
            <button onClick={()=>setMoney(10000+money)} className="btn btn-info me-1">1만원</button>                
            <button onClick={()=>setMoney(0)} className="btn btn-danger me-1">초기화</button>              
            <br/>
            <input type="range" min="0" max="10000000" step="10000" value={money} onChange={e=>setMoney(parseInt(e.target.value))}/>
        </>

    );
};



export default Exam03;