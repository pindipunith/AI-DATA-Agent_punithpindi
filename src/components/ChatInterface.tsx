import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, BarChart3, Table2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  hasChart?: boolean;
}

interface ChatInterfaceProps {
  fileName?: string;
}

const ChatInterface = ({ fileName }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I've successfully processed your Excel file${fileName ? ` "${fileName}"` : ''}. I can now help you analyze your data. Try asking me questions like:

• "What are the top 5 performers in sales?"
• "Show me the trends over the last quarter"
• "What's the average value by category?"
• "Create a summary dashboard"

What would you like to know about your data?`,
      timestamp: new Date(),
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    "Show me sales trends by month",
    "What are the top performing categories?",
    "Create a revenue summary dashboard",
    "Analyze customer demographics"
  ];

  const mockAIResponses = [
    {
      content: "Based on your data analysis, I found some interesting patterns. The sales trends show a 23% increase in Q3 compared to Q2, with Technology and Healthcare being the top performing categories.",
      hasChart: true
    },
    {
      content: "Here's a comprehensive breakdown of your top performing categories. Technology leads with 35% of total revenue, followed by Healthcare at 28% and Finance at 18%.",
      hasChart: true
    },
    {
      content: "I've created a revenue summary dashboard for you. The data shows strong growth patterns with some seasonal variations. Would you like me to drill down into specific time periods?",
      hasChart: true
    },
    {
      content: "Your customer demographics reveal interesting insights: 60% are enterprise clients, 30% mid-market, and 10% small business. Geographic distribution is fairly even across regions.",
      hasChart: true
    }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: randomResponse.content,
        timestamp: new Date(),
        hasChart: randomResponse.hasChart,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setCurrentMessage(question);
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">AI Data Analyst</h3>
          <span className="px-2 py-1 text-xs bg-success/10 text-success rounded-full">Online</span>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'ai' && (
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              
              <div className={`max-w-[80%] space-y-2 ${message.type === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                
                {message.hasChart && (
                  <div className="bg-card border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      Generated Visualization
                    </div>
                    <div className="h-32 bg-gradient-to-r from-accent-chart-1/20 to-accent-chart-2/20 rounded-md flex items-center justify-center border-2 border-dashed border-accent-chart-1/30">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 text-accent-chart-1 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Interactive Chart Generated</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Table2 className="w-3 h-3 mr-1" />
                        View Data
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Export
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-4 space-y-3">
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        )}
        
        <div className="flex gap-2">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Ask me anything about your data..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!currentMessage.trim() || isTyping}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;