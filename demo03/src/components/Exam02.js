import { useState } from 'react';
import simImage from '../assets/images/sim.gif';

function Exam02(){
// 이 화면의 상태(state)는 한 개 이다.
    const[size, setSize]= useState(200);

    // function small(){
    //     // size = 100; //React 사용 불가
    //     setSize(100);//React스러운 방법
    // }
    // function normal(){
    //     setSize(200);
    // }
    // function big(){
    //     setSize(300);
    // }
    
    return(
        <>
            <h3>두 번째 에제</h3>
            <button onClick={()=>setSize(100)} className="btn btn-primary">작게</button>
            <button onClick={()=>setSize(200)} className="btn btn-primary">기본</button>
            <button onClick={()=>setSize(300)} className="btn btn-primary">크게</button>
            <br/>
            <img src={simImage} width={size} height={size} />
        </>
    )
}

export default Exam02