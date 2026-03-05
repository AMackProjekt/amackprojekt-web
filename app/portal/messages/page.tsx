"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { mockChannels, mockMessages } from "@/lib/data/mockPortalData";
import type { Message, Channel } from "@/lib/types/portal";

export default function MessagesPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(mockChannels[0]);
  const [messageInput, setMessageInput] = useState("");
  const [channelMessages, setChannelMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/portal/auth");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (selectedChannel) {
      // Filter messages for selected channel
      const filtered = mockMessages.filter(m => m.channelId === selectedChannel.id);
      setChannelMessages(filtered);
    }
  }, [selectedChannel]);

  if (!user) return null;

  const channelTypeIcons = {
    public: "🌐",
    private: "🔒",
    program: "📚",
    staff: "👥"
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChannel) return;

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      content: messageInput,
      senderId: user.id || "current-user",
      senderName: user.name || "Current User",
      recipientIds: selectedChannel.memberIds,
      channelId: selectedChannel.id,
      sentAt: new Date().toISOString(),
      readBy: [user.id || "current-user"]
    };

    setChannelMessages([...channelMessages, newMessage]);
    setMessageInput("");
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      {/* Header */}
      <header className="border-b border-border bg-panel/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto max-w-container px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push("/portal/dashboard")}
              className="text-muted hover:text-text"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-text">Team Collaboration</h1>
              <p className="text-sm text-muted">Communicate with staff and participants</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
          >
            + New Channel
          </motion.button>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 pt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 h-[calc(100vh-200px)]">
          {/* Channels Sidebar */}
          <div className="lg:h-full overflow-y-auto">
            <GlowCard className="p-5">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Channels</h3>
              
              <div className="space-y-2">
                {mockChannels.map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel)}
                    className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                      selectedChannel?.id === channel.id
                        ? "bg-brand/20 border border-brand/30"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{channelTypeIcons[channel.type]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-text text-sm truncate">
                          {channel.name}
                        </div>
                        {channel.description && (
                          <div className="text-xs text-muted truncate mt-0.5">
                            {channel.description}
                          </div>
                        )}
                        <div className="text-xs text-muted mt-1">
                          {channel.memberIds.length} member{channel.memberIds.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-bold text-sm mb-3 tracking-wider uppercase text-muted">Direct Messages</h3>
                <div className="text-xs text-muted text-center py-4">
                  No direct messages yet
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Chat Area */}
          {selectedChannel ? (
            <GlowCard className="flex flex-col lg:h-full">
              {/* Channel Header */}
              <div className="p-5 border-b border-border">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{channelTypeIcons[selectedChannel.type]}</span>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-text">{selectedChannel.name}</h2>
                    {selectedChannel.description && (
                      <p className="text-sm text-muted mt-1">{selectedChannel.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                      <span>{selectedChannel.memberIds.length} members</span>
                      <span>•</span>
                      <span>Last activity: {new Date(selectedChannel.lastActivity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {channelMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-xl font-bold text-text mb-2">No messages yet</h3>
                    <p className="text-muted">Start the conversation!</p>
                  </div>
                ) : (
                  channelMessages.map((message, index) => {
                    const isCurrentUser = message.senderId === (user.id || "current-user");
                    
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
                      >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand2 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {message.senderName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>

                        {/* Message Content */}
                        <div className={`flex-1 ${isCurrentUser ? "items-end" : ""}`}>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-sm text-text">{message.senderName}</span>
                            <span className="text-xs text-muted">
                              {new Date(message.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className={`inline-block px-4 py-2 rounded-lg max-w-xl ${
                            isCurrentUser 
                              ? "bg-brand text-white" 
                              : "bg-panel border border-border text-text"
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>

                          {/* Reactions */}
                          {message.reactions && message.reactions.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {message.reactions.map((reaction, i) => (
                                <button
                                  key={i}
                                  className="px-2 py-0.5 rounded-full bg-panel border border-border text-xs hover:bg-white/5"
                                >
                                  {reaction.emoji} {reaction.userIds.length}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Message Input */}
              <div className="p-5 border-t border-border">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder={`Message ${selectedChannel.name}...`}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 px-4 py-3 rounded-lg bg-bg border border-border text-text placeholder:text-muted focus:outline-none focus:border-brand/50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="px-6 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </motion.button>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <button className="text-xs text-muted hover:text-text flex items-center gap-1">
                    📎 Attach
                  </button>
                  <button className="text-xs text-muted hover:text-text flex items-center gap-1">
                    😊 Emoji
                  </button>
                  <button className="text-xs text-muted hover:text-text flex items-center gap-1">
                    @ Mention
                  </button>
                </div>
              </div>
            </GlowCard>
          ) : (
            <GlowCard className="flex items-center justify-center lg:h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-text mb-2">Select a channel</h3>
                <p className="text-muted">Choose a channel from the sidebar to start messaging</p>
              </div>
            </GlowCard>
          )}
        </div>
      </div>
    </div>
  );
}
