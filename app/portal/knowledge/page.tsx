"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { mockKnowledgeArticles } from "@/lib/data/mockPortalData";
import type { KnowledgeArticle } from "@/lib/types/portal";

export default function KnowledgeBasePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/portal/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const categories = Array.from(new Set(mockKnowledgeArticles.map(a => a.category)));
  
  const filteredArticles = mockKnowledgeArticles.filter(article => {
    if (!article.published) return false;
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const articlesByCategory = categories.reduce((acc, cat) => {
    acc[cat] = mockKnowledgeArticles.filter(a => a.category === cat && a.published).length;
    return acc;
  }, {} as Record<string, number>);

  const handleMarkHelpful = (articleId: string) => {
    // In production, this would update the backend
    console.log("Marked helpful:", articleId);
  };

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
              <h1 className="text-xl font-extrabold tracking-tight text-text">Knowledge Base</h1>
              <p className="text-sm text-muted">Resources, guides, and helpful articles</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
          >
            + New Article
          </motion.button>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 pt-8">
        {!selectedArticle ? (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar */}
            <div className="space-y-4">
              <GlowCard className="p-5">
                <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Search</h3>
                
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-bg border border-border text-sm text-text placeholder:text-muted focus:outline-none focus:border-brand/50"
                />
              </GlowCard>

              <GlowCard className="p-5">
                <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Categories</h3>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === "all" 
                        ? "bg-brand/20 text-brand" 
                        : "text-muted hover:bg-white/5 hover:text-text"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>📚 All Articles</span>
                      <span className="text-xs">{mockKnowledgeArticles.filter(a => a.published).length}</span>
                    </div>
                  </button>
                  
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category 
                          ? "bg-brand/20 text-brand" 
                          : "text-muted hover:bg-white/5 hover:text-text"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category}</span>
                        <span className="text-xs">{articlesByCategory[category]}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </GlowCard>

              <GlowCard className="p-5">
                <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(mockKnowledgeArticles.flatMap(a => a.tags))).slice(0, 10).map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="text-xs px-2 py-1 rounded bg-brand/10 text-brand hover:bg-brand/20 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </GlowCard>
            </div>

            {/* Articles Grid */}
            <div>
              <div className="mb-4 text-sm text-muted">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedArticle(article)}
                    className="cursor-pointer h-full"
                  >
                    <GlowCard 
                      className="p-5 hover:border-brand/50 transition-colors h-full flex flex-col"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-3xl">📖</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-text mb-1 line-clamp-2">{article.title}</h3>
                          <div className="text-xs text-muted">{article.category}</div>
                        </div>
                      </div>

                      <p className="text-sm text-muted mb-4 line-clamp-3 flex-1">
                        {article.content.substring(0, 150)}...
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-border">
                        <div className="flex items-center gap-3">
                          <span>👁️ {article.views}</span>
                          <span>👍 {article.helpful}</span>
                        </div>
                        <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
                      </div>

                      {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {article.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-brand/10 text-brand">
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span className="text-xs px-2 py-0.5 rounded bg-muted/10 text-muted">
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </GlowCard>
                  </motion.div>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-bold text-text mb-2">No articles found</h3>
                  <p className="text-muted">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Article View */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-muted hover:text-text mb-6 text-sm"
            >
              ← Back to articles
            </button>

            <GlowCard className="p-8">
              {/* Article Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-brand/20 text-brand">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-muted">
                    Updated {new Date(selectedArticle.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold text-text mb-4">{selectedArticle.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span>👁️ {selectedArticle.views} views</span>
                  <span>•</span>
                  <span>👍 {selectedArticle.helpful} found helpful</span>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none mb-8">
                <div className="text-text leading-relaxed whitespace-pre-wrap">
                  {selectedArticle.content}
                </div>
              </div>

              {/* Tags */}
              {selectedArticle.tags.length > 0 && (
                <div className="mb-6 pb-6 border-b border-border">
                  <h3 className="text-sm font-bold text-muted mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSearchQuery(tag);
                          setSelectedArticle(null);
                        }}
                        className="text-sm px-3 py-1 rounded-full bg-brand/10 text-brand hover:bg-brand/20"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Helpful Section */}
              <div className="bg-bg rounded-lg p-6 border border-border">
                <h3 className="text-lg font-bold text-text mb-3">Was this article helpful?</h3>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMarkHelpful(selectedArticle.id)}
                    className="px-6 py-2 rounded-lg bg-brand text-white font-semibold hover:bg-brand/90"
                  >
                    👍 Yes, helpful!
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-lg border border-border text-text hover:bg-white/5"
                  >
                    Needs improvement
                  </motion.button>
                </div>
              </div>

              {/* Related Articles */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-bold text-text mb-4">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mockKnowledgeArticles
                    .filter(a => 
                      a.id !== selectedArticle.id && 
                      a.published &&
                      (a.category === selectedArticle.category || 
                       a.tags.some(tag => selectedArticle.tags.includes(tag)))
                    )
                    .slice(0, 4)
                    .map(article => (
                      <button
                        key={article.id}
                        onClick={() => setSelectedArticle(article)}
                        className="p-3 rounded-lg bg-panel border border-border hover:border-brand/50 text-left transition-colors"
                      >
                        <h4 className="font-semibold text-sm text-text mb-1 line-clamp-2">
                          {article.title}
                        </h4>
                        <div className="text-xs text-muted">{article.category}</div>
                      </button>
                    ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}
