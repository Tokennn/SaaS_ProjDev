import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = prompt('Veuillez entrer votre pseudo pour le chat :');
    if (name) {
      setUserName(name);
    } else {
      // Gérer le cas où l'utilisateur n'entre pas de nom
      setUserName('Anonyme');
    }

    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
      transports: ['websocket']
    });

    newSocket.on('connect', () => {
      console.log('Connecté au serveur Socket.IO');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Déconnecté du serveur Socket.IO');
      setIsConnected(false);
    });

    newSocket.on('message', (message: Message) => {
      console.log('Message reçu:', message);
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('messageHistory', (history: Message[]) => {
      console.log('Historique des messages reçu:', history);
      setMessages(history);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []); // Le tableau vide assure que cet effet ne s'exécute qu'une seule fois au montage

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && socket && isConnected && userName) {
      const message: Message = {
        id: Date.now().toString(),
        sender: userName, // Utiliser le pseudo entré par l'utilisateur
        content: newMessage,
        timestamp: new Date(),
      };
      console.log('Envoi du message:', message);
      socket.emit('message', message);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-[400px] border rounded-lg shadow-lg bg-white">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Chat</h2>
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            Aucun message. Commencez la conversation !
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.sender === userName ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === userName
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm font-semibold">{message.sender}</p>
                <p>{message.content}</p>
                <p className="text-xs mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={isConnected ? "Écrivez votre message..." : "Connexion..."}
            disabled={!isConnected || !userName}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isConnected && newMessage.trim() && userName
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isConnected || !newMessage.trim() || !userName}
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}; 