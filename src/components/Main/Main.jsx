import React,{useContext} from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import {Context} from '../../context/context'
const Main = () => {

const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context);


  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResult ?
        <>
        <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorming team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
    
        </>   :
         <div className="result">
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
                <img src={assets.gemini_icon} alt="" />
                {loading ?
                <div className="loader">
                   <hr />
                   <hr />
                   <hr />
                </div>
                :<div className="response-text" dangerouslySetInnerHTML={{ __html: resultData }}></div>
            }
             </div>
         </div>
        }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} type="text" name="" id="" placeholder='Enter a prompt here' value={input} />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                
                <p className='bottom-info'>
                    Gemini may display inaccurate info, including about people, so double-check its response. Your input too
                </p>
            </div>

        </div>
    </div>
  )
}

export default Main




// import React, { useContext, useState } from 'react';
// import './Main.css';
// import { assets } from '../../assets/assets';
// import { Context } from '../../context/context';

// const Main = () => {
//   const [prompt, setPrompt] = useState('');
//   const { onSent, response } = useContext(Context);

//   const handleSend = () => {
//     if (prompt.trim()) {
//       onSent(prompt);
//       setPrompt('');
//     }
//   };

//   return (
//     <div className='main'>
//       {/* ... nav and cards unchanged ... */}
//       <div className="main-bottom">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder='Enter a prompt here'
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           />
//           <div>
//             <img src={assets.gallery_icon} alt="" />
//             <img src={assets.mic_icon} alt="" />
//             <img src={assets.send_icon} alt="" onClick={handleSend} />
//           </div>
//         </div>

//         {response && (
//           <div className="chat-box">
//             <p><strong>You:</strong> {prompt}</p>
//             <p><strong>Gemini:</strong> {response}</p>
//           </div>
//         )}

//         <p className='bottom-info'>
//           Gemini may display inaccurate info, including about people, so double-check its response.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Main;
