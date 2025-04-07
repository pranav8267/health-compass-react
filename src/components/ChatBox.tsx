
import { useState } from 'react';
import { Send, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

export default function ChatBox() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to HMS Assistant. How can I help you today?',
      sender: 'system',
      timestamp: new Date(),
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: query,
      sender: 'user',
      timestamp: new Date(),
    };

    // Simulate response
    const responseMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: `Searching for: "${query}"...`,
      sender: 'system',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, responseMessage]);
    setQuery('');
  };

  return (
    <div className="w-1/3 border-l border-gray-200 bg-gray-50 flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">HMS Assistant</h2>
        <p className="text-sm text-muted-foreground">Ask me anything about the hospital</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <form 
        onSubmit={handleSend}
        className="p-4 border-t flex gap-2"
      >
        <Input
          type="text"
          placeholder="Search or ask a question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
