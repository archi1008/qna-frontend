import React,{useState} from "react";
import axios from "axios";
import './QuesBox.css';

const QuesBox = ()=>{
    const [question, setQuestion] = useState('');
    const [ans,setAns] = useState('');
    const [loading,setIsLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  }
  
  const handleQuestionSubmit = async() => {
    setIsLoading(true);
    console.log(typeof(question));
    try {
        const response = await axios.post('https://qna-server.onrender.com/question', { question });
        console.log(response.data); 
        setAns(response.data);
    } catch (error) {
        console.error('Failed to send question:', error.response);
    }
    setIsLoading(false)
}
    return (
     <>
      <div className="box">
      <input className="ques-box" type="text" value={question} onChange={handleQuestionChange} />
      <button className="submit-btn" onClick={handleQuestionSubmit}><span className="submit-btn-text">Submit</span></button>
      {loading && <p className="loading-text">Please wait.... while we are generating your response!!</p>}
      {
       ans !=='' && <div>
              <div className="ans" value={ans.answer} defaultValue={''}>{ans.answer}</div>
       </div>
       }
      </div>
     </>
    )
}

export default QuesBox;