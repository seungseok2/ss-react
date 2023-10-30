import React, { useState } from 'react';

function Exam04(){
    
      const [text, setText] = useState('');
      const [byteCount, setByteCount] = useState(0);
      const maxByte = 1000; // 최대 바이트 수
    
      const handleTextChange = (event) => {
        const inputText = event.target.value;
        const encoder = new TextEncoder();
        const textBytes = encoder.encode(inputText);
        const currentByteCount = textBytes.length;
    
        if (currentByteCount <= maxByte) {
          setText(inputText);
          setByteCount(currentByteCount);
        }
      };
    
      return (
        <div>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="  입력하세요"
          />
          <div>
            {byteCount} / {maxByte} 바이트
          </div>
        </div>
      );
    }
    
export default Exam04;
