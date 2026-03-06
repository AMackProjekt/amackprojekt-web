"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { mockDocuments, mockParticipants, mockPrograms } from "@/lib/data/mockPortalData";
import type { Document } from "@/lib/types/portal";

export default function DocumentsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/portal/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const filteredDocuments = mockDocuments.filter(d => {
    const matchesType = selectedType === "all" || d.type === selectedType;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const typeColors = {
    referral: "bg-brand/20 text-brand",
    certificate: "bg-green-500/20 text-green-400",
    assessment: "bg-accent/20 text-accent",
    report: "bg-brand2/20 text-brand2",
    legal: "bg-yellow-500/20 text-yellow-400",
    medical: "bg-red-500/20 text-red-400",
    other: "bg-muted/20 text-muted"
  };

  const typeIcons = {
    referral: "📋",
    certificate: "🏆",
    assessment: "📊",
    report: "📄",
    legal: "⚖️",
    medical: "🏥",
    other: "📁"
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getParticipant = (id?: string) => id ? mockParticipants.find(p => p.id === id) : null;
  const getProgram = (id?: string) => id ? mockPrograms.find(p => p.id === id) : null;

  const documentsByType = mockDocuments.reduce((acc, doc) => {
    acc[doc.type] = (acc[doc.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-bg pb-20">
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
              <h1 className="text-xl font-extrabold tracking-tight text-text">Document Management</h1>
              <p className="text-sm text-muted">Organize and access participant documents</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
          >
            + Upload Document
          </motion.button>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <GlowCard className="p-5">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Search</h3>
              
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-bg border border-border text-sm text-text placeholder:text-muted focus:outline-none focus:border-brand/50"
              />
            </GlowCard>

            <GlowCard className="p-5">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Document Type</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedType("all")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedType === "all" 
                      ? "bg-brand/20 text-brand" 
                      : "text-muted hover:bg-white/5 hover:text-text"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>📁 All Documents</span>
                    <span className="text-xs">{mockDocuments.length}</span>
                  </div>
                </button>
                
                {Object.entries(documentsByType).map(([type, count]) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedType === type 
                        ? "bg-brand/20 text-brand" 
                        : "text-muted hover:bg-white/5 hover:text-text"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="capitalize">{typeIcons[type as keyof typeof typeIcons]} {type}</span>
                      <span className="text-xs">{count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </GlowCard>

            <GlowCard className="p-5">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Storage</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-text">2.4 GB</div>
                  <div className="text-xs text-muted">Used of 50 GB</div>
                </div>
                <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand to-brand2"
                    style={{ width: "4.8%" }}
                  />
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Main Content */}
          <div>
            {/* View Options */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted">
                {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded hover:bg-white/5 text-muted hover:text-text">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button className="p-2 rounded hover:bg-white/5 text-muted hover:text-text">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Documents List */}
            <div className="space-y-3">
              {filteredDocuments.map((doc, index) => {
                const participant = getParticipant(doc.participantId);
                const program = getProgram(doc.programId);
                
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => setSelectedDocument(doc)}
                    className="cursor-pointer"
                  >
                    <GlowCard 
                      className="p-4 hover:border-brand/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="text-4xl">
                          {typeIcons[doc.type as keyof typeof typeIcons]}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-text mb-1 truncate">{doc.name}</h3>
                              <div className="flex items-center gap-3 text-xs text-muted">
                                <span>{formatFileSize(doc.size)}</span>
                                <span>•</span>
                                <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                                {doc.isConfidential && (
                                  <>
                                    <span>•</span>
                                    <span className="text-red-400">🔒 Confidential</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${typeColors[doc.type as keyof typeof typeColors]} whitespace-nowrap`}>
                              {doc.type}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-muted">
                            {participant && (
                              <div className="flex items-center gap-1">
                                <span>👤</span>
                                <span>{participant.name}</span>
                              </div>
                            )}
                            {program && (
                              <div className="flex items-center gap-1">
                                <span>📚</span>
                                <span>{program.name}</span>
                              </div>
                            )}
                          </div>

                          {doc.tags && doc.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {doc.tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-0.5 rounded bg-brand/10 text-brand">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button 
                            className="p-2 rounded hover:bg-white/5 text-muted hover:text-text"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Download action
                            }}
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                          <button 
                            className="p-2 rounded hover:bg-white/5 text-muted hover:text-text"
                            onClick={(e) => {
                              e.stopPropagation();
                              // More options action
                            }}
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-xl font-bold text-text mb-2">No documents found</h3>
                <p className="text-muted">Try adjusting your filters or upload a new document</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDocument(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full"
          >
            <GlowCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">
                    {typeIcons[selectedDocument.type as keyof typeof typeIcons]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text">{selectedDocument.name}</h2>
                    <p className="text-sm text-muted">{selectedDocument.mimeType}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-muted hover:text-text text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className={`text-xs px-3 py-1 rounded-full ${typeColors[selectedDocument.type as keyof typeof typeColors]}`}>
                  {selectedDocument.type}
                </span>
                {selectedDocument.isConfidential && (
                  <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400">
                    🔒 Confidential
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-xs text-muted mb-1">File Size</div>
                  <div className="text-sm font-semibold text-text">
                    {formatFileSize(selectedDocument.size)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted mb-1">Uploaded</div>
                  <div className="text-sm font-semibold text-text">
                    {new Date(selectedDocument.uploadedAt).toLocaleDateString()}
                  </div>
                </div>
                {selectedDocument.participantId && (
                  <div>
                    <div className="text-xs text-muted mb-1">Participant</div>
                    <div className="text-sm font-semibold text-text">
                      {getParticipant(selectedDocument.participantId)?.name}
                    </div>
                  </div>
                )}
                {selectedDocument.programId && (
                  <div>
                    <div className="text-xs text-muted mb-1">Program</div>
                    <div className="text-sm font-semibold text-text">
                      {getProgram(selectedDocument.programId)?.name}
                    </div>
                  </div>
                )}
              </div>

              {selectedDocument.tags && selectedDocument.tags.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs text-muted mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedDocument.tags.map(tag => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-brand/10 text-brand">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-6 border-t border-border">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
                >
                  Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text hover:bg-white/5"
                >
                  Share
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text hover:bg-white/5"
                >
                  Edit Info
                </motion.button>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      )}
    </div>
  );
}
