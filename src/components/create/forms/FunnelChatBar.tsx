import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Check, X, Coins } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface FunnelChatBarProps {
  onSendMessage: (message: string) => Promise<string>;
  onAccept: () => void;
  onReject: () => void;
  isLoading: boolean;
  hasPendingChanges: boolean;
  messages: ChatMessage[];
}

export function FunnelChatBar({
  onSendMessage,
  onAccept,
  onReject,
  isLoading,
  hasPendingChanges,
  messages,
}: FunnelChatBarProps) {
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput("");
    await onSendMessage(msg);
  };

  return (
    <div className="border-t bg-muted/30 p-4 space-y-3">
      {/* Messages history */}
      {messages.length > 0 && (
        <div className="max-h-32 overflow-auto space-y-2 text-sm">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-1.5 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Accept/Reject bar */}
      {hasPendingChanges && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/50 border">
          <span className="text-sm flex-1">Modifications appliquées. Accepter ?</span>
          <Button size="sm" variant="ghost" onClick={onReject}>
            <X className="w-4 h-4 mr-1" />
            Refuser
          </Button>
          <Button size="sm" onClick={onAccept}>
            <Check className="w-4 h-4 mr-1" />
            Accepter
          </Button>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Demander une modification du texte ou du visuel..."
            disabled={isLoading}
          />
        </div>
        <Badge variant="outline" className="text-xs whitespace-nowrap gap-1">
          <Coins className="w-3 h-3" />
          0.5 crédit
        </Badge>
        <Button size="icon" onClick={handleSend} disabled={isLoading || !input.trim()}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
