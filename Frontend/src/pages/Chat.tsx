import React, { useEffect, useRef, useState } from "react";
import InputBar from "../components/InputBar";
import Typing from "../components/Typing";
import MessageBubble from "../components/MessageBubble";
import SideBar from "../components/SideBar";
import ChatNav from "../components/ChatNav";
import { Navigate, useLocation, useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Character } from "../components/UserStuff/CharacterGrid";
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
// Define the shape of your decoded token
interface DecodedToken {
  sub: string;        // username
  userId: number;     // userId included in token
  roles: string[];    // roles as an array of strings
  exp: number;        // expiration timestamp (optional)
}

export interface Message {
  text: string;
  sender: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [typing, setTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Retrieve token from localStorage
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  let username: string;
  let userId: number;
  let roles: string[];

  // Decode token and handle potential errors
  try {
    const decoded: any = jwtDecode(token);
    roles = decoded.roles || [];

    // Check if user has the required role (for example, "user")
    if (!roles.includes("user")) {
      return <Navigate to="/Login" replace />;
    }

    username = decoded.sub; // Typically, 'sub' is the username or subject
    userId = decoded.userId; // Assumes userId is included in the token

    if (userId === undefined) {
      console.error("userId not found in token");
      return <Navigate to="/Login" replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/Login" replace />;
  }

  // Create a user object from decoded data
  const user = { username, userId };
  const { id } = useParams();

  async function decrypt(toDecrypt:string):Promise<string>
  {
    try {
        console.log("Decrypting....");
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`http://localhost:8080/crypt/decrypt/${toDecrypt}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Send the JWT token for authorization
          },
        });

        if (response.ok) {

          const data = await response.json();
          return data.decrypted;
          
          
        } else {
          setError("Couldn't Encrypt");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Connection Error");
        
      }
      return "";
  }

  // Getting the username from location.state if available (optional)
  const location = useLocation();
  const [character,setCharacter] = useState<Character>(location.state?.character || {
    charImg: "",
    charName: "",
    charId: 0,
    charDescription: "",
    charUsage: 0
  });
  

  const [list, setList] = useState<
    { name: string; image: string; details: string; chatId: number }[]
  >([]);
  const [chatId, setChatId] = useState<number>(
    location.state?.chatId || id?  -1 : 0
  );
  const [firstRender, setFirstRender] = useState(true);
  const getCharFromId = async (charId:number)=>
      {
        const body = { charId: charId };

        try {
          const response = await fetch("http://localhost:8080/auth/characters", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify(body),
          });
          
          if (response.ok) {
            
            const data = await response.json();
            
            return data;
            
          } else {
            setError("Char Not Found!");
          }
        } catch (error) {
          console.error("Error:", error);
          setError("Couldn't get character!");
        }
      }
      
  const fetchCharId = async ()=>
    {
      const charId = await retrieveMessages(chatId,true);
      const sharedChar = await getCharFromId(charId);
      
      setCharacter(sharedChar);
    }

  //Checks Shared Id
  useEffect(()=>
    {
      const setDecryptedChatId = async (id:string)=>{
        const decryptedID = await decrypt(id);
        setChatId(parseInt(decryptedID,10));
      }
      
      if(id)
      {  
        setDecryptedChatId(id);
      }
      else
      {
        setCharacter(location.state?.character);
      }
    },[]);
    
    useEffect(()=>{
      if(chatId>0)
      {
        if(!character.charName)
          fetchCharId();
      }
    },[chatId])

    useEffect(() => {
      setActiveCharacter(character);
    }, [character]);

  function separateMessages(chatText: string): void {
    const allMessages = chatText.split("$$").filter((msg) => msg.trim() !== "");
    let counter = 0;
    let msgs: Message[] = [];
    for (const msg of allMessages) {
      let Sender = counter % 2 === 0 ? "user" : "ai";
      msgs.push({ text: msg, sender: Sender });
      counter++;
    }
    setMessages(msgs);
  }

  const retrieveMessages = async (chatId: number,gettingCharId?:boolean) => {
    if (chatId === 0) {
      setMessages([{ text: "Hello! How can I help you today?", sender: "ai" }]);
      return;
    }
    const body = { chatId: chatId };

    try {
      const response = await fetch("http://localhost:8080/chat/getMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Send the JWT token for authorization
        },
        body: JSON.stringify(body),
      });
      
      if (response.ok) {
        
        const data = await response.json();
        
        
        if(id)
        {
          if(gettingCharId)
          {
            return data.charId;
          }
          else
          {
            separateMessages(data.chatText);
            return data.charId;
          }
          
        }
        else
        {
          separateMessages(data.chatText);
        }
        
      } else {
        setError("Chat Not Found!");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Couldn't get messages!");
    }
  };

  const sendMessage = async (message: string) => 
  {  
    if(chatId==0 || id)
    {
      
      const body = {charId:character.charId, userId: userId, message:""};
      if(id)
      {
        let tempMessages = ""
        messages.map((msg)=>{
          tempMessages+=msg.text+"$$";
        });

        body.message= tempMessages;
      }

      try 
      {
        const response = await fetch("http://localhost:8080/chat/createChat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) 
        {
          setError("Chat Not Found!");
          console.error("Error:", error);

          return;
        }
        else
        {
          const data = await response.json();
          setChatId(data.chatId);
          
          setMessages([...messages, { text: message, sender: "user" }]);
          setTyping(true);

          const stringId = "" + data.chatId;
          const stringCharId = "" + character.charId;
          const stringUserId = "" + userId;

          const modelBody = {user_id: stringUserId,chat_id: stringId, message:message, char_id:stringCharId};
          console.log(modelBody);
          const modelResponse = await fetch("https://qt8960e9abdedb851f8101ff2b98.free.beeceptor.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "104.28.212.150",
            },
            body: JSON.stringify(modelBody),
          });
          
  

          if(modelResponse.ok)
            {
              const userBody = {chatId:data.chatId, message:message};
              setChatId(data.chatId);
              const userResponse = await fetch("http://localhost:8080/chat/sendMessage", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(userBody)
              });

              if(!userResponse.ok)
              {
                setError("Couldn't send message!");              
              }
              else
              {
                const aiData =await modelResponse.json();
                let aiReply = aiData.response.content;
                
                  if(aiReply.includes("role="))
                  {
                    console.log("Before: \n" + aiReply);
                    console.log(aiReply.search('="'));
                    if(aiReply.search('="')==-1)
                    {
                      aiReply = aiReply.slice("role='assistant' content=".length, aiReply.length);
                    }
                    else
                    {
                      aiReply = aiReply.slice(aiReply.search('="')+2, aiReply.length);
                    }
                  }
        
                  if(aiReply.includes("images=None"))
                  {
                    
                    aiReply = aiReply.slice(0,aiReply.search('images=None')-2);
                    console.log("After: \n" + aiReply);
                  } 
                
                const aiBody = {chatId:data.chatId, message:aiReply};
                const aiResponse = await fetch("http://localhost:8080/chat/sendMessage", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
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
                  navigate("/Chat", {
                    state: {
                      character: character,
                      historyList: list,
                      user: user, // Pass user data here
                      chatId: chatId, // Pass chatId data here (if it's 0 then a new chat is created)
                    },
                    replace: true,
                  });
                }
                else
                {
                  setError("Couldn't send Reply!");
                }
              }
            }
            else
            {
              setError("Couldn't reach the model!");
            }
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
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body)
      });

      if (response.ok) 
      {
        setMessages([...messages, { text: message, sender: "user" }]);
        setTyping(true);       

        const stringId = "" + chatId;
        let stringCharId = "" + character.charId;
        const stringUserId = "" + userId;

        const modelBody = {user_id: stringUserId,chat_id: stringId, message:message, char_id:stringCharId};
        const modelResponse = await fetch("https://qt8960e9abdedb851f8101ff2b98.free.beeceptor.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "104.28.212.150",
          },
          body: JSON.stringify(modelBody),
        });

        if(modelResponse.ok)
        {
          const data =await modelResponse.json();
          let aiReply:string = data.response.content;

          if(aiReply.includes("role="))
          {
            if(aiReply.search('="')==-1)
            {
              aiReply = aiReply.slice("role='assistant' content=".length, aiReply.length);
            }
            else
            {
              aiReply = aiReply.slice(aiReply.search('="')+2, aiReply.length);
            }
          }

          if(aiReply.includes("images=None"))
          {
            aiReply = aiReply.slice(0,aiReply.search('images=None')-2);
          }

          const aiBody = {chatId:chatId, message:aiReply};
          const aiResponse = await fetch("http://localhost:8080/chat/sendMessage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
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
            setFirstRender(true);
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) 
  }, [messages, typing]);



  const [activeCharacter,setActiveCharacter] = useState(character);
  const updateActive:any = (character:any,newChatId:number) =>
  {
    setActiveCharacter(character);
    console.log(newChatId);
    setChatId(newChatId);
  }

  useEffect(()=>
    {
      setMessages([])
      if(chatId!=0)
      {
        setFirstRender(false);
      }
      retrieveMessages(chatId);
      console.log(activeCharacter);
      
    },[activeCharacter]);
    

  return (
    <div>
      <div className="flex h-screen bg-[var(--page)]">
        <SideBar chatId={chatId} user={user} updateActive={updateActive} historyList={list} character={activeCharacter} />
        <div className="flex flex-col flex-1 h-full w-full relative p-4 overflow-y-auto space-y-4 items-center">
          {/* Pass username to ChatNav */}
          <ChatNav user={user} />
          <div className="pt-15 mb-20 w-89 md:min-w-[10px] lg:min-w-[850px] items-center">
            { activeCharacter?.charImg ? (messages.map((msg, index) => (
              <MessageBubble key={index} text={msg.text} sender={msg.sender} image={activeCharacter.charImg} anim={!firstRender} />
            ))) :<div>Loading character...</div> }
            <InputBar sendMessage={sendMessage} />
          </div>
          {typing && <Typing />}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
