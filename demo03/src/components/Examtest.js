import React, { useState, useEffect } from 'react';
import MiddleImage from '../assets/images/mm.jpg';
import whatImage1 from '../assets/images/ss.jpg';
import whatImage2 from '../assets/images/jj.jpg';
import whatImage3 from '../assets/images/hb.jpg';
import whatImage4 from '../assets/images/dd.jpg';

const Examtest = () => {
  const [middleImage, setMiddleImage] = useState(MiddleImage);

  // 처음 이미지 상태를 기억하는 변수
  const initialMiddleImage = MiddleImage;

  // 선택된 이미지를 추적하는 상태
  const [selectedImage, setSelectedImage] = useState(null);

  // 이미지 클릭 시 중간 이미지 변경
  const handleImageClick = (newImage) => {
    setMiddleImage(newImage);
    setSelectedImage(newImage);
  };

  // 페이지 새로고침 시 중간 이미지 초기 값으로 되돌림
  useEffect(() => {
    setMiddleImage(initialMiddleImage);
  }, [initialMiddleImage]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="p-3 text-light bg-dark rounded mt-3">
            <h2>평가문항</h2>
            <p>다음 화면과 가능을 구현하시오</p>
          </div>

          <div className="row mt-5">
            <div className="col p-4 text-center">
              <img src={middleImage} width={300} height={300} alt="중간 이미지" />
            </div>
          </div>

          <div className='row mt-3'>
            <div className='col'>
              <img
                src={whatImage1}
                width={120}
                height={100}
                alt="이미지 1"
                onClick={() => handleImageClick(whatImage1)}
                style={{ opacity: selectedImage === whatImage1 ? 1 : 0.5 }} // 선택된 이미지가 아닌 경우 불투명하게 설정
              />
              <img
                src={whatImage2}
                width={120}
                height={100}
                alt="이미지 2"
                onClick={() => handleImageClick(whatImage2)}
                style={{ opacity: selectedImage === whatImage2 ? 1 : 0.5 }}
              />
              <img
                src={whatImage3}
                width={120}
                height={100}
                alt="이미지 3"
                onClick={() => handleImageClick(whatImage3)}
                style={{ opacity: selectedImage === whatImage3 ? 1 : 0.5 }}
              />
              <img
                src={whatImage4}
                width={120}
                height={100}
                alt="이미지 4"
                onClick={() => handleImageClick(whatImage4)}
                style={{ opacity: selectedImage === whatImage4 ? 1 : 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examtest;
