import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Tag, Calendar, Clock, ArrowRight, Sparkles, Filter, User } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { Seo } from '../components/common/Seo';

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = [
    'All',
    'Web Design',
    'WordPress',
    'Local SEO',
    'Lead Generation',
    'Dental & Medical',
    'Fitness & Gym'
  ];

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    blogPosts.forEach(post => post.tags.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, []);

  const featuredPost = useMemo(() => {
    return blogPosts.find(p => p.featured) || blogPosts[0];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage]);

  return (
    <>
      <Seo
        title="Web Design & SEO Knowledge Hub for Bangalore Businesses"
        description="Practical guides, local SEO strategies, and web development insights for business owners in Bangalore by Imam Khan."
        canonicalUrl="https://imamkhan.vercel.app/blog"
      />

      <div className="py-12 bg-[#050505] text-[#f4f4f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-4">
              <Sparkles className="w-4 h-4 text-[#00ff88]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#00ff88]">
                Knowledge Hub & Articles
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Practical Web &amp; Local SEO Insights for Bangalore
            </h1>
            <p className="text-[#9e9eb0] text-base sm:text-lg">
              Honest guides, pricing breakdowns, and conversion frameworks to help your local business thrive online.
            </p>
          </div>

          {/* Search & Filters Bar */}
          <div className="mb-10 space-y-6 bg-[#0d0d12] border border-[#1a1a24] p-6 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search Box */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-[#9e9eb0] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles, topics or keywords..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#050505] border border-[#1a1a24] rounded-xl text-xs text-white placeholder-[#8e8e9f] focus:outline-none focus:border-[#00ff88] transition-colors"
                />
              </div>

              {/* Tag Filters */}
              {selectedTag && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00ff88]/20 border border-[#00ff88]/40 text-[#00ff88] text-xs">
                  <span>Tag: {selectedTag}</span>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="font-bold hover:text-white"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <Filter className="w-4 h-4 text-[#00ff88] shrink-0 mr-1" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                      : 'bg-[#111116] text-[#9e9eb0] hover:text-white hover:bg-[#1a1a24]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post (Only shown if no active filter/search) */}
          {!searchQuery && selectedCategory === 'All' && !selectedTag && featuredPost && (
            <div className="mb-12 bg-gradient-to-r from-[#0d0d12] via-[#111118] to-[#0d0d12] border border-[#00ff88]/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00ff88]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-[11px] font-bold uppercase tracking-wider">
                    Featured Article
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white hover:text-[#00ff88] transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-[#9e9eb0] text-sm leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#8e8e9f]">
                    <span className="flex items-center gap-1.5 text-white font-medium">
                      <User className="w-3.5 h-3.5 text-[#00ff88]" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
                  >
                    <span>Read Featured Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map(post => {
                const coverBase = post.cover_image || `/images/blog/${post.slug}`;
                return (
                  <article
                    key={post.slug}
                    className="bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-5 flex flex-col justify-between hover:border-[#00ff88]/40 transition-all hover:-translate-y-1 group"
                  >
                    <div>
                      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 border border-[#1a1a24] bg-[#050505]">
                        <picture className="w-full h-full block">
                          <source
                            type="image/webp"
                            srcSet={`${coverBase}-480w.webp 480w, ${coverBase}-800w.webp 800w`}
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                          <img
                            src={`${coverBase}-800w.webp`}
                            alt={post.cover_alt || post.title}
                            width={400}
                            height={225}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </picture>
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2.5 py-1 rounded-md bg-[#050505]/85 backdrop-blur-sm text-[#00ff88] font-semibold text-[11px] border border-[#00ff88]/30">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs mb-2 text-[#8e8e9f]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                        <span>{post.date}</span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-[#00ff88] transition-colors leading-snug mb-2">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-xs text-[#9e9eb0] leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#1a1a24] flex items-center justify-between text-xs">
                      <span className="text-[#8e8e9f] font-medium">{post.author}</span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-[#00ff88] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16 bg-[#0d0d12] rounded-2xl border border-[#1a1a24]">
                <p className="text-white text-base font-semibold mb-2">No articles found matching your query.</p>
                <p className="text-xs text-[#9e9eb0] mb-4">Try adjusting your search terms or clearing category filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedTag(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#00ff88] text-black text-xs font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-[#0d0d12] border border-[#1a1a24] text-xs text-white disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-xs text-[#9e9eb0] px-3">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-[#0d0d12] border border-[#1a1a24] text-xs text-white disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default BlogPage;
