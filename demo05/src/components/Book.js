import axios from "axios";
import { useEffect, useState } from "react";
import "./Book.css";
import {LiaEdit} from "react-icons/lia";
import {AiFillDelete} from "react-icons/ai";

const Book = (props)=>{

    const [bookList, setBookList] = useState([]);

    const loadBook = ()=>{
        //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드 
        axios({
            url:"http://localhost:8080/book/",
            method:"get"
        })
        .then(response=>{
            // console.log(response);
            setBookList(response.data);
        })
        .catch(err=>{});
    };
    
    useEffect(()=>{
        loadBook();
    },[]);


    // 도서 삭제
    const deleteBook = (book)=>{
        const choice = window.confirm("삭제?");
        if(choice === false)return;

          axios({
            url:`http://localhost:8080/book/${book.bookId}`,
            method:"delete"
        })
        .then(response=>{
            loadBook();//목록 갱신
        })
        .catch(err=>{});
    };

    return(
        <>

            <div className="row">
                <div className="col">
                    <h3>bookList</h3>
                    <span>React CRUD</span>
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
                            {bookList.map((book, index)=>(
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
                                          <LiaEdit className="text-warning"/>
                                        <AiFillDelete className="text-danger"
                                        onClick={e=>deleteBook(book)}/>  

                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>                    
                </div>
            </div>

        </>
    );
};

export default Book;