import { useEffect, useState } from "react";
import axios from "axios";
import throttle from "lodash/throttle";// 특정 함수의 발생 주기를 설정(강제 성능 하향)
// 사용법 - throttle(원래쓰려고했던 함수,주기)
// import debounce from "loadsh/debounce";//특정 이벤트의 마지막만 실행하도록 설정
// 사용법 - debounce(원래쓰려고했던 함수,주기)

const BookInfinite = (props)=>{
    const [page,setPage] = useState(1);
    const [size,setSize] = useState(30);
    const [bookList,setBookList] = useState([]);

    const loadBook = ()=>{
        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/page/${page}/size/${size}`,
            method:"get"
        })
        .then(response=>{
        setBookList([...bookList,...response.data]); //spread연산자
        // setBookList(bookList.concat(...response.data));//concat함수
        });
    };

    useEffect(()=>{
        loadBook();
    },[page]);

    //다음페이지
    const nextPage = ()=>{
        setPage(page+1);//페이지 1증가
    };


    //개수가 변하면 페이지를 1로, 목록을 모두 지우고 다시 불러와야 한다
    useEffect(()=>{
        setPage(1);
        setBookList([]);
        // loadBook();
    },[size]);


// ------------------------------------------------------------------------------------------------------------

    useEffect(()=>{
        window.addEventListener("scroll",throttle(()=>{
            // console.log("스크롤굴러감");
        },500));
    },[]);

// ------------------------------------------------------------------------------------------------------------
    return(
        <>
            <div className="row">
                <div className="col">
                    <h3>무한 스크롤 예제</h3>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-2 offset-10">
                    <select value={size} onChange={e=>setSize(e.target.value)}>
                        <option value="30">30개씩 보기</option>
                        <option value="50">50개씩 보기</option>
                        <option value="100">100개씩 보기</option>
                        <option value="1000">1000개씩 보기</option>
                    </select>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>저자</th>
                            <th>출판사</th>
                        </tr>
                        </thead>

                        <tbody>
                            {bookList.map(book=>(
                                <tr key={book.bookId}>
                                      <td>{book.bookId}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.bookAuthor}</td>
                                    <td>{book.bookPublisher}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 더보기 버튼 */}
           
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary w-100" onClick={nextPage}>
                            {size}개 더보기
                        </button>
                    </div>
                </div>
               
            </div>
        </>
    );
};

export default BookInfinite;