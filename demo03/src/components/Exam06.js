import { useState } from "react";

const Exam06 = ()=>{
    //각각의 상태를 분리하여 관리할 때
    //const [alias, setAlias] = useState("");
    //const [gender, setGender] = useState("man");

    //상태를 하나의 객체로 관리할 때 
    const [info, setInfo] = useState({
        alias : "",
        gender : "man"
    });

    //function changeInfo(e){};
    const changeInfo = e=>{
        // console.log(e.target);//이벤드 발생 태그 확인
       //console.log(e.target.name, e.target.value);//이름,값 확인

       //info에서 이벤트가 발생한 태그명에 해당하는 필드만 입력값으로 바꾸고 나머진 그대로 둬라
       // - ...info는 info의 나머지 항목을 의미 (rest 연산) 
       // - 객체에 [] 표시를 쓰면 필드명을 변수로 지정할 수 있다
       setInfo({
            ...info,
            [e.target.name] : e.target.value
       });
    };

    return(
        <>
            <h3>상태변수가 객체인 경우</h3>

            name<input type="text" name="alias" value={info.alias} onChange={changeInfo}/> <br/><br/>
            gender
            <select name="gender" value={info.gender} onChange={changeInfo}>
                <option>man</option>
                <option>girl</option>
            </select>
        </>
    );
};

export default Exam06;