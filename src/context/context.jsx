import { createContext, useState } from "react";
import runChat from "../config/gemini"; //runChat


// Create the context
export const Context = createContext();

const ContextProvider = ({ children }) => {

 const [input,setInput]=useState("");
 const [recentPrompt,setRecentPrompt]=useState("");
 const [prevPrompt,setPrevPromt]=useState([]);
 const [showResult,setShowResult]=useState(false);
 const [loading,setLoading]=useState(false);
 const [resultData,setResultData]=useState("");

  const [reply, setReply] = useState("");

const delayPara=(index,nextWord)=>{
    setTimeout(function name(){
setResultData(prev=>prev+nextWord);
    },75*index)
}

const newChat=()=>{
    setLoading(false)
    setShowResult(false)
}


  //onsent
//   const onSent = async (prompt) => { //     setResultData("") //     setLoading(true) //     setShowResult(true) //     setRecentPrompt(input) //     const response = await runChat(input); //     let responseArray=response.split("**"); //     let newResponse; //     for(let i=0;i<responseArray.length;i++){ //         if(i===0 || i%2!==1){ //             newResponse+=responseArray[i]; //         } //         else{ //             newResponse+="<br>"+responseArray[i]+"</br>"; //         }
//     }

//     setResultData(newResponse)
//     setLoading(false)
//     setInput("")
//   };

const onSent = async (prompt) => {
  setResultData("");
  setLoading(true);
  setShowResult(true);
  let response;

  if (prompt !== undefined) {
  response = await runChat(prompt);
  setRecentPrompt(prompt);
  setPrevPromt(prev => [...prev, prompt]); // <-- Add this here
} else {
  setRecentPrompt(input);
  setPrevPromt(prev => [...prev, input]);  // Only add once
  response = await runChat(input);
}


  try { 

    // ✅ Replace **bold** with <b>bold</b>
    let formatted = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // ✅ Replace newlines with <br/>
    formatted = formatted.replace(/\n/g, "<br/>");

    // setResultData(formatted);
    let newResponseArray=formatted.split(" ");
    for(let i=0;i<newResponseArray.length;i++){
        const nextWord=newResponseArray[i];
        delayPara(i,nextWord+" ")
    }
  } catch (error) {
    console.error("Error in onSent:", error);
    setResultData("Something went wrong.");
  }

  setLoading(false);
  setInput("");
};


  // This is the context value you provide
  const contextValue = {
    prevPrompt,
    setPrevPromt,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    reply,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
