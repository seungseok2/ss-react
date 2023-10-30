import { useState } from "react";

function Exam04(){

    const[text, setText]=useState(0);

    return(
        <>
        <h3>네 번째 예제</h3>

        <h4>(Q)주말에 뭐하세요?</h4>

        <input type="text"/>
        </>
    );
};

export default Exam04;
