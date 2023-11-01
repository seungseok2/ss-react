import { useEffect, useState } from "react";
import bn from '../assets/images/sim.gif';
const ExamHome = ()=>{
  
 //객체로 상태 변수를 정의
 const [member, setMember] = useState({//입력데이터
    memberId:"",
    memberPw:"",
    memberPwRe:""
});
const [result, setResult] = useState({//검사결과
    memberId:null,
    memberPw:null,
    memberPwRe:null
});
//입력데이터가 변하면 검사결과가 자동으로 계산되도록 처리

const checkMember = ()=>{
    //console.log("member가 변했습니다");
    //ID검사
    const idRegex = /^[a-z][a-z0-9]{7,19}$/;
    const idMatch = member.memberId.length === 0 ? null : idRegex.test(member.memberId);

    //PW검사
    const pwRegex = /^[A-Za-z0-9!@#$]{8,16}$/;
    const pwMatch = member.memberPw.length === 0 ? null : pwRegex.test(member.memberPw);

    //PW-RE검사
    const pwReMatch = member.memberPwRe.length === 0 ? null : 
                                    member.memberPw.length > 0 && member.memberPw === member.memberPwRe;

    setResult({
        memberId : idMatch,
        memberPw : pwMatch,
        memberPwRe : pwReMatch
    });
};



//객체의 상태를 한 번에 변경하는 함수를 구현
const changeMember = (e)=>{
    setMember({
        ...member,
        [e.target.name] : e.target.value
    });
};

    return(
        <>

<div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    
                    
                <img src={bn} width={600} height={200}></img>  

                    <form autoComplete="off" className="col-9 offset-11">

                    

                    <div className="row mt-1">
                        <div className="col-3">
                            <label className="form-label">
                            </label>
                            <input type="text" name="memberId" 
                                    className= {
                                        `form-control
                                        ${result.memberId === true ? 'is-valid':''}
                                        ${result.memberId === false ? 'is-invalid':''}
                                        `} placeholder="id"// == 이게 두개면 긍정적인 답 진짜 true먄 === 3개
                                    value={member.memberId} onChange={changeMember}
                                                            onBlur={checkMember}/>
                                <div className="valid-feedback">good boy</div>
                                <div className="invalid-feedback">bad boy</div>
                            </div>
                    </div>

                    <div className="row mt-1">
                        <div className="col-3">
                            <label className="form-label">
                            </label>
                            <input type="password" name="memberPw" 
                                    className={`
                                        form-control
                                        ${result.memberPw === true ? 'is-valid' : ''}
                                        ${result.memberPw === false ? 'is-invalid' : ''}
                                    `} placeholder="pw"
                                    value={member.memberPw} onChange={changeMember}
                                                            onBlur={checkMember}/>
                                <div className="valid-feedback">good boy</div>
                                <div className="invalid-feedback">bad boy</div>
                        </div>
                    </div>
                    


                    <div className="row mt-4">
                        <div className="col-3">
                            <button type="button" className="btn btn-primary w-100"
                                    disabled={!(result.memberId === true && result.memberPw ===true && result.memberPwRe === true)}>로그인</button>
                        </div>
                    </div>
                                    </form>

                </div>
            </div>
        </div>

        </>
    );
};

export default ExamHome;