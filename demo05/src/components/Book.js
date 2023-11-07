import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./Book.css";
import { LiaEdit } from "react-icons/lia";
import { AiFillDelete } from "react-icons/ai";
import { FaTheRedYeti } from "react-icons/fa";
import { Modal } from "bootstrap";

const Book = (props) => {
    const [bookList, setBookList] = useState([]);

    // const loadBook = () => {
    //     //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드 
    //     axios({
    //         url: "http://localhost:8080/book/",
    //         method: "get"
    //     })
    //         .then(response => {
    //             // console.log(response);
    //             setBookList(response.data);
    //         })
    //         .catch(err => { });
    // };

    const loadBook = async()=>{
        const response = await axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/`,
            method: "get"
        });
        setBookList(response.data);
    };

    useEffect(() => {
        loadBook();
    }, []);


    // 도서 삭제
    const deleteBook = (book) => {
        const choice = window.confirm("삭제?");
        if (choice === false) return;

        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method: "delete"
        })
            .then(response => {
                loadBook();//목록 갱신
            })
            .catch(err => { });
    };


    //modal 관련 처리

    const bsModal = useRef();
    const openModal = () => {
        const modal = new Modal(bsModal.current)
        modal.show();
    };
    //모달 닫기
    const closeModal = ()=>{
        const modal = Modal.getInstance(bsModal.current)
        modal.hide();
        //닫기 누르면 전 정보 사라짐
        clearBook();
    };

    //등록과 관련된 state
    const [book,setBook] = useState({
        title:"",
        author:"",
        PublicationDate:"",
        publisher:"",
        price:0,
        pageCount:0,
        genre:""
    });

    const changeBook = (e)=>{
        setBook({
            ...book,
            [e.target.id] : e.target.value
        });
    };
    const clearBook = ()=>{
        setBook({
        title:"",
        author:"",
        PublicationDate:"",
        publisher:"",
        price:0,
        pageCount:0,
        genre:""
        });
    };
    

    
    //등록 기능 
    // const saveBook = ()=>{
    //     //book 유효성 검사 후 차단 코드 추가
    //     axios({
    //         url:"http://localhost:8080/book/",
    //         method:"post",
    //         // data:{...book}
    //         data:book,
    //     })
    //     .then(response=>{//성공했다면
    //         loadBook();//목록갱신
    //         closeModal();//모달 닫기
    //     })
    //     .catch(error=>{});
    // };

    //async 함수와 await 키워드를 사용한 간소화 작업이 가능
    // - 비동기 작업을 동기화된 코드로 작성할 수 있다
    const saveBook = async ()=>{
        const response = await axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"post",
            data:book
        });
        loadBook();
        closeModal();
    };


    //수정
    const editBook = (target)=>{
        setBook({...target});
        openModal();
    };

    const updateBook = ()=>{
        //검사 후 차단 코드

        //book id 삭제하고싶으면
        const copyBook={...book};
        delete copyBook.bookId;
        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookid}`,
            method:"put",
            data:copyBook
        })
        .then(response=>{
            loadBook();
            closeModal();
        });
    };

    return (
        <>

            <div className="row">
                <div className="col">
                    <h3>bookList</h3>
                    <span>React CRUD</span>
                </div>
            </div>

            {/* 도서등록 버튼 */}
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-success" onClick={openModal}>
                        등록
                        <FaTheRedYeti className="ms-2" />
                    </button>
                </div>

            </div>
            <div className="row mt-4">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="pc-only">id</th>
                                <th>title</th>
                                <th>author</th>
                                <th>PublicationDate</th>
                                <th className="pc-only">Publisher</th>
                                <th>price</th>
                                <th className="pc-only">pageCount</th>
                                <th className="pc-only">genre</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookList.map((book, index) => (
                                <tr>
                                    <td className="pc-only">{book.bookId}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.bookAuthor}</td>
                                    <td>{book.bookPublisher}</td>
                                    <td className="pc-only">{book.bookPublicationDate}</td>
                                    <td>{book.bookPrice}</td>
                                    <td className="pc-only">{book.bookPageCount}</td>
                                    <td className="pc-only">{book.bookGenre}</td>
                                    <td>
                                        {/* 아이콘 자리 */}
                                        <LiaEdit className="text-warning"
                                                onClick={e=>editBook(book)} />
                                        <AiFillDelete className="text-danger"
                                            onClick={e => deleteBook(book)} />

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>



                {/* Modal */}
                <div className="modal fade" ref={bsModal}
                    data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                {book.bookId === undefined ? '' : `${book.bookId}번 도서 수정`}
                                </h5>
                                <button type="button" className="border-0 bg-transparent" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">title</label>
                                        <input type="text" name="title" className="form-control"
                                        value={book.title} onChange={changeBook}/>
                                    </div>
                                </div>


                                <div className="row mt-4">
                                    <div className="col">
                                        <label className="form-label">author</label>
                                        <input type="text" name="author" className="form-control"
                                        value={book.author} onChange={changeBook}/>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col">
                                        <label className="form-label">PublicationDate</label>
                                        <input type="date" name="PublicationDate" className="form-control"
                                        value={book.PublicationDate} onChange={changeBook}/>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col">
                                        <label className="form-label">Publisher</label>
                                        <input type="text" name="publisher" className="form-control"
                                        value={book.publisher} onChange={changeBook}/>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col">
                                        <label className="form-label">price</label>
                                        <input type="number" name="price" className="form-control"
                                        value={book.price} onChange={changeBook}/>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col">
                                        <label className="form-label">pageCount</label>
                                        <input type="number" name="pageCount" className="form-control"
                                        value={book.pageCount} onChange={changeBook}/>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col">
                                        <label className="form-label">genre</label>
                                        <select name="genre" value={book.genre}onChange={changeBook}>
                                        <option>재밌는거</option>                                        
                                        <option>잼없는거</option>                                        
                                        <option>조금잼있는거</option>                                        
                                        <option>많이잼있는거</option>                                        
                                        <option>많이잼없는거</option>                                        
                                        </select>
                                    </div>
                                </div>  

                              


                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal} >닫기</button>

                                {book.bookId === undefined ? 
                                
                                <button className="btn btn-success" onClick={saveBook}>저장</button>

                                :

                                <button className="btn btn-success" onClick={updateBook}>수정</button>

                                }

                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    );
};

export default Book;