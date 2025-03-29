import { useEffect, useRef, useState } from "react";
import InputBar from "../components/InputBar";
import Typing from "../components/Typing";
import MessageBubble from "../components/MessageBubble";
import SideBar from "../components/SideBar";
import ChatNav from "../components/ChatNav";
import { Navigate, useLocation } from "react-router-dom";
import { details } from "framer-motion/client";


//BUGS:
//Doesnt set the older chats from the database to the sidebar thing


export interface Message {
  text: string;
  sender: string;
}

export default function Chat() 
{
  
  const [messages, setMessages] = useState<Message[]>( []);
  const [error, setError] = useState<string | null>(null);
  const [typing, setTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  

  // Getting the username from location.state (you might adjust this based on how you store the username)
  const location = useLocation();
  const user = location.state?.user; 
  const character = location.state?.character;
  const [list, setList] = useState<{ name: string; image: string,details:string,chatId:number }[]>([]);
  
  // Redirect if no username (not logged in)
  if (!user.username) {
    return <Navigate to="/Login" replace />;
  }

  const [chatId,setChatId] = useState<Number>(location.state.chatId);
  const [userId,setUserId] = useState(user.userId);
  


  function separateMessages(chatText:String):void
  {
    const allMessages = chatText.split("$$").filter(msg=>msg.trim()!="");
    let counter:number =0;
    let msgs: Message[] = [];
    for(const msg of allMessages)
    {
      let Sender = "";
      if(counter%2===0)
      {
        Sender = "user";
      }
      else
      {
        Sender="ai";
      }
      msgs.push({text:msg, sender:Sender});

      counter++;
    }
    setMessages(msgs);
    
    counter=0;
  }

  const retrieveMessages = async (chatId: Number) =>
  {
    console.log(chatId);
    if(chatId==0)
    {
      setMessages([{ text: "Hello! How can I help you today?", sender: "ai" }]);
      return;
    }
    
    const body = {chatId:chatId};

    try 
    {
      const response = await fetch("http://localhost:8080/chat/getMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) 
      {
        const data = await response.json();
        separateMessages(data.chatText);
      } 
      else 
      {
        setError("Chat Not Found!");
      }
    } 
    catch (error) 
    {
      console.error("Error:", error);
      setError("Couldn't get messages!");
    }
  }

  const sendMessage = async (message: string) => 
  {  

    if(chatId==0)
    {
      const body = {charId:character.Id, userId: userId, message:message};
      try 
      {
        const response = await fetch("http://localhost:8080/chat/createChat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) 
        {
          const data = await response.json();
          setChatId(data.chatId);
          
          setMessages([...messages, { text: message, sender: "user" }]);
          setTyping(true);

          const stringId = "" + chatId;
            
          const modelBody = {chat_id: stringId, message:message};
          const modelResponse = await fetch("https://stallion-valued-painfully.ngrok-free.app/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(modelBody)
          });

          if(modelResponse.ok)
            {
              const data =await modelResponse.json();
              const aiReply = data.response.content;
    
              const aiBody = {chatId:chatId, message:aiReply};
              const aiResponse = await fetch("http://localhost:8080/chat/sendMessage", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(aiBody),
              });
    
              if(aiResponse.ok)
              {
                setTimeout(() => {
                  setMessages((prev) => [
                    ...prev,
                    { text: aiReply, sender: "ai" },
                  ]);
                  setTyping(false);
                }, 1000);
              }
              else
              {
                setError("Couldn't send Reply!");
              }
    
            }
            else
            {
              setError("Couldn't reach the model!");
              console.log(modelResponse);
            }

        } 
        else 
        {
          setError("Couldn't send message!");
        }
      } 
      catch (error) 
      {
        console.error("Error:", error);
        setError("Chat Not Found!");
      }
      return;
    }

    try 
    {
      const body = {chatId:chatId, message:message};
      const response = await fetch("http://localhost:8080/chat/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (response.ok) 
      {
        setMessages([...messages, { text: message, sender: "user" }]);
        setTyping(true);

        const stringId = "" + chatId;

        const modelBody = {chat_id: stringId, message:message};
        
        const modelResponse = await fetch("https://stallion-valued-painfully.ngrok-free.app/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modelBody),
        });

        if(modelResponse.ok)
        {
          const data =await modelResponse.json();
          const aiReply = data.response.content;

          const aiBody = {chatId:chatId, message:aiReply};
          const aiResponse = await fetch("http://localhost:8080/chat/sendMessage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(aiBody),
          });

          if(aiResponse.ok)
          {
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                { text: aiReply, sender: "ai" },
              ]);
              setTyping(false);
            }, 1000);
          }
          else
          {
            setError("Couldn't send Reply!");
          }

        }
        else
        {
          setError("Couldn't reach the model!");
          
        }

      } 
      else 
      {
        setError("Couldn't send message!");
      }
    } 
    catch (error) 
    {
      console.error("Error:", error);
      setError("Chat Not Found!");
    }
      
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, typing]);

  // Passing received character and list from location.state
  const [receivedCharacter, setReceivedCharacter] = useState(location.state.character);
  

  const [activeCharacter,setActiveCharacter] = useState(receivedCharacter);
  const updateActive:any = (character:any) =>
  {
    setActiveCharacter(character);
    setChatId(character.chatId);
  }

  useEffect(()=>
    {
      setMessages([])
      retrieveMessages(chatId);
      
    },[activeCharacter]);



  return (
    <div>
      <div className="flex h-screen bg-[var(--page)]">
        <SideBar user={user} updateActive={updateActive} historyList={list} character={activeCharacter} />
        <div className="flex flex-col flex-1 h-full w-full relative p-4 overflow-y-auto space-y-4 items-center">
          {/* Pass username to ChatNav */}
          <ChatNav user={user} />
          <div className="pt-15 mb-20 w-89 md:min-w-[10px] lg:min-w-[850px] items-center">
            {messages.map((msg, index) => (
              <MessageBubble key={index} text={msg.text} sender={msg.sender} image={activeCharacter.img} />
            ))}
            <InputBar sendMessage={sendMessage} />
          </div>
          {typing && <Typing />}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
