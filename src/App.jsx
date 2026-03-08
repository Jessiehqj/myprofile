import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Mail,
  Play,
  ExternalLink,
  Heart,
  Award,
  Copy,
  Check,
  Layout
} from 'lucide-react';

// --- 1. 动画配置 ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

// --- 2. 模拟数据 ---
const TRAVELS = [
  { location: '普吉岛 · 日落', type: 'video', url: '217faa190624decee7bea65330b87c28.mp4', tag: '相遇才是意外', likes: '5.2w' },
];

const EXPERIENCE_DATA = [
  {
    id: 'work-1',
    year: '2021 - 至今',
    role: '产品经理',
    company: '同程旅行',
    shortDesc: '负责出行复盈商品系统的中后台搭建。',
    details: {
      title: '中后台系统搭建与架构',
      projects: [
        { name: '商品的赔付系统', achievement: '从 0 到 1 搭建，实现了全流程自动化的赔付逻辑，显著降低了人工介入成本。' },
        { name: '异常监控理赔系统', achievement: '构建了实时的业务异常监控体系，结合自动理赔机制，大幅提升了理赔响应速度与准确性。' }
      ],
      tags: ['中后台系统', '0-1搭建', '业务增长']
    }
  },
  {
    id: 'edu-2',
    year: '2018 - 2021',
    role: '管理科学与工程 · 硕士',
    company: '西南交通大学',
    shortDesc: '专注于系统优化与管理决策研究。',
    details: {
      title: '学术研究与项目实践',
      content: '在校期间深入研究管理决策模型，参与多项导师课题，培养了严谨的数据分析能力与逻辑拆解能力。',
      tags: ['学术研究', '管理科学', '数据分析']
    }
  },
  {
    id: 'edu-1',
    year: '2014 - 2018',
    role: '经济学 & 英语 · 双学士',
    company: '西南交通大学',
    shortDesc: '跨学科背景，兼具逻辑思维与国际化视野。',
    details: {
      title: '双学位修读历程',
      content: '同时修读经济学与英语专业，掌握了坚实的经济模型分析基础，并具备优秀的跨语言沟通能力。',
      tags: ['双学位', '经济学', '语言能力']
    }
  },
];

const THOUGHTS = [
  { title: 'AI-Native 应用的交互边界', category: '行业洞察', date: '2024.02' },
  { title: '如何在 3 个月内建立高效的产研流程', category: 'PM 手册', date: '2024.01' },
  { title: '极简主义在 Web 开发中的实践', category: '设计思考', date: '2023.12' },
];

const SKILLS = [
  { name: 'AI 转型学习', level: 10 },
  { name: '个人爱好发展', level: 10 },
  { name: '财务管理', level: 5 },
  { name: '时间管理', level: 15 },
];

// --- 3. 子组件 ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/70 backdrop-blur-lg py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-roboto font-light tracking-[0.2em] text-pink-900">
          FLOS<span className="font-bold text-pink-400">.</span>SPACE
        </motion.div>
        <div className="flex gap-8 text-sm font-medium text-pink-900/60">
          {['作品集', '履历', '思考', '看世界', '成长'].map((item) => (
            <a key={item} href={`#${item}`} className="hover:text-pink-500 transition-colors duration-300 relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const SectionTitle = ({ title, subtitle, dark = false }) => (
  <motion.div {...fadeInUp} className="mb-16">
    <h2 className={`text-3xl font-light ${dark ? 'text-white' : 'text-slate-800'} mb-2`}>{title}</h2>
    <div className="w-12 h-[2px] bg-pink-300 mb-4" />
    <p className={`text-xs tracking-[0.2em] uppercase font-roboto ${dark ? 'text-pink-200/50' : 'text-pink-300'}`}>{subtitle}</p>
  </motion.div>
);

// --- 4. 主程序 ---
export default function App() {
  const [activeExp, setActiveExp] = useState(EXPERIENCE_DATA[0]);
  const [copied, setCopied] = useState(false);
  const timelineRefs = useRef({});
  const scrollContainerRef = useRef(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@flos.space');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExpSelect = (item) => {
    setActiveExp(item);
    const element = timelineRefs.current[item.id];
    const container = scrollContainerRef.current;
    if (element && container) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const offsetTop = element.offsetTop - container.offsetTop;
      const scrollTo = offsetTop - (containerRect.height / 2) + (elementRect.height / 2);

      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#FFF5F7] min-h-screen selection:bg-pink-100 selection:text-pink-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-pink-100 to-transparent blur-[100px] rounded-full opacity-60" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-gradient-to-tl from-rose-100 to-transparent blur-[80px] rounded-full opacity-50" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="mb-10">
            <div className="relative inline-block">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" />
              <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white p-1.5 rounded-full shadow-md">
                <Heart size={14} fill="currentColor" />
              </div>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-light text-slate-800 mb-8 leading-tight">
            探索 <span className="text-pink-500 font-normal">AI</span> 的边界 <br />
            <span className="italic font-serif text-pink-300">沉淀深度的思考</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-slate-500/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed font-light">
            你好，我是 <span className="text-pink-900/80 font-medium tracking-wide">Flos</span>。<br />
            这里记录了我成长思考、产品故事以及对这个世界的全方位观察。
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="#作品集" className="px-10 py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 font-medium tracking-wider">
              查看我的作品 <ChevronRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 作品集模块 - 置空状态 */}
      <section id="作品集" className="py-32 max-w-6xl mx-auto px-6">
        <SectionTitle title="精选作品" subtitle="Selected Portfolio" />
        <motion.div
          {...fadeInUp}
          className="w-full py-32 bg-white/40 border border-dashed border-pink-200 rounded-[3rem] flex flex-col items-center justify-center"
        >
          <div className="p-5 bg-pink-50 rounded-full mb-6">
            <Layout className="text-pink-300" size={32} />
          </div>
          <p className="text-pink-300 font-light tracking-[0.2em]">等待更新中......</p>
        </motion.div>
      </section>

      {/* 履历模块 */}
      <section id="履历" className="py-32 max-w-6xl mx-auto px-6 min-h-[90vh]">
        <SectionTitle title="个人履历" subtitle="Professional Journey" />
        <div className="grid md:grid-cols-[1.5fr_1.5fr] gap-12 items-start">
          <div className="sticky top-32 flex flex-col items-center md:items-start">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div
                animate={{ scale: activeExp ? 0.65 : 1, y: activeExp ? -30 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative group w-fit origin-top-left flex-shrink-0"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full blur opacity-20" />
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300&h=300" alt="Flos" className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl" />
              </motion.div>
              <motion.div animate={{ y: activeExp ? -35 : 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center md:items-start">
                <button onClick={handleCopyEmail} className="group flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-pink-100 rounded-full hover:bg-pink-500 transition-all duration-500">
                  <Mail size={16} className="text-pink-400 group-hover:text-white transition-colors" />
                  <span className="text-xs font-roboto font-medium text-pink-900/60 group-hover:text-white tracking-wider">hello@flos.space</span>
                  <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copied ? <Check size={14} className="text-white" /> : <Copy size={14} className="text-white/70" />}
                  </div>
                </button>
              </motion.div>
            </div>
            <motion.div animate={{ y: activeExp ? -45 : 0 }} transition={{ duration: 0.6 }} className="w-full mt-2">
              <AnimatePresence mode="wait">
                <motion.div key={activeExp.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light text-slate-800">{activeExp.company}</h3>
                    <p className="text-pink-500 text-sm tracking-widest uppercase font-medium">{activeExp.role}</p>
                  </div>
                  <div className="p-8 bg-white/60 backdrop-blur-sm rounded-[2rem] border border-white/50 shadow-sm">
                    <h4 className="text-slate-800 font-medium mb-4 flex items-center gap-2"><Award size={18} className="text-pink-400" /> {activeExp.details.title}</h4>
                    {activeExp.details.projects ? (
                      <div className="space-y-4">
                        {activeExp.details.projects.map((p, i) => (
                          <div key={i} className="group/item">
                            <p className="text-sm font-bold text-slate-700 mb-1 group-hover/item:text-pink-600 transition-colors">{p.name}</p>
                            <p className="text-xs text-slate-500 leading-relaxed">{p.achievement}</p>
                          </div>
                        ))}
                      </div>
                    ) : ( <p className="text-sm text-slate-500 leading-relaxed">{activeExp.details.content}</p> )}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {activeExp.details.tags.map(tag => ( <span key={tag} className="px-3 py-1 bg-pink-50 text-pink-400 text-[10px] rounded-full tracking-wider font-bold">#{tag}</span> ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
          <div className="relative h-[650px] flex flex-col group/timeline">
            <div className="absolute left-[12px] top-8 bottom-40 w-[1.5px] bg-pink-100/50 rounded-full z-0 overflow-hidden">
               <motion.div animate={{ height: `${((EXPERIENCE_DATA.findIndex(e => e.id === activeExp.id) + 1) / EXPERIENCE_DATA.length) * 100}%` }} className="w-full bg-gradient-to-b from-pink-300 to-rose-400 opacity-60" />
            </div>
            <div ref={scrollContainerRef} className="h-full overflow-y-auto no-scrollbar pr-2 space-y-4 z-10 pb-40">
              {EXPERIENCE_DATA.map((item) => (
                <motion.div
                  key={item.id} ref={el => timelineRefs.current[item.id] = el} onClick={() => handleExpSelect(item)}
                  className={`relative cursor-pointer p-8 pl-12 rounded-[2.5rem] transition-all duration-700 border ${ activeExp.id === item.id ? 'bg-white border-pink-100 shadow-xl shadow-pink-900/5 translate-x-2' : 'bg-transparent border-transparent hover:bg-white/30 grayscale opacity-40'}`}
                >
                  <div className={`absolute left-[7.5px] top-[42px] w-[10px] h-[10px] rounded-full border-[2.5px] border-[#FFF5F7] transition-all duration-500 z-20 ${ activeExp.id === item.id ? 'bg-pink-500 scale-150 shadow-[0_0_12px_rgba(236,72,153,0.5)]' : 'bg-pink-200'}`} />
                  <div className="flex justify-between items-start mb-4"><span className="text-[10px] font-roboto font-bold text-pink-400 tracking-[0.2em] uppercase">{item.year}</span></div>
                  <h3 className="text-xl text-slate-800 mb-2 font-light">{item.role}</h3>
                  <p className="text-xs text-slate-400 font-medium mb-3">{item.company}</p>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{item.shortDesc}</p>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FFF5F7] to-transparent pointer-events-none z-30" />
          </div>
        </div>
      </section>

      {/* 深度思考模块 */}
      <section id="思考" className="min-h-screen bg-white/40 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-6 py-32 w-full">
          <SectionTitle title="深度思考" subtitle="Deep Thinking & Insights" />
          <div className="grid md:grid-cols-3 gap-8">
            {THOUGHTS.map((item, index) => (
              <motion.div key={index} whileHover={{ y: -10 }} className="p-10 bg-white border border-pink-50 rounded-[2.5rem] hover:shadow-xl transition-all group">
                <div className="text-[10px] tracking-[0.2em] text-pink-300 uppercase font-roboto mb-6 flex items-center gap-2"><span className="w-1 h-1 bg-pink-300 rounded-full" /> {item.category}</div>
                <h3 className="text-xl text-slate-800 mb-8 leading-snug font-light">{item.title}</h3>
                <div className="flex justify-between items-center text-[10px] text-slate-300 font-roboto tracking-widest">
                  <span>{item.date}</span><ExternalLink size={14} className="text-pink-200" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 看世界 - 小红书瀑布流风格 */}
      <section id="看世界" className="min-h-screen bg-gradient-to-b from-[#FFF5F7] to-pink-50 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-6 py-32 w-full">
          <SectionTitle title="看世界" subtitle="Travel & Lifestyle" />
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {TRAVELS.map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.05 }}
                className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="relative">
                  <video
                    src={item.url}
                    className="w-full h-auto object-cover transition-all duration-500"
                    muted={true}
                    autoPlay={true}
                    loop={true}
                    playsInline={true}
                  />
                  <div className="absolute top-3 right-3 p-1.5 bg-black/20 backdrop-blur-md rounded-full text-white">
                    <Play size={12} fill="white" />
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-xs text-slate-800 font-medium leading-relaxed line-clamp-2">
                    {item.location}：{item.tag}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 opacity-60">
                      <div className="w-4 h-4 rounded-full bg-pink-100 flex items-center justify-center">
                        <User size={8} className="text-pink-400" />
                      </div>
                      <span className="text-[10px] text-slate-400">Flos</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-300">
                      <Heart size={10} />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 技能成长 */}
      <section id="成长" className="min-h-screen bg-[#2D1B1E] text-white flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-10 py-32 w-full relative z-10">
          <SectionTitle title="技能成长" subtitle="Growth & Skills" dark />
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-12">
              {SKILLS.map((skill, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between text-xs tracking-[0.2em] font-roboto font-light uppercase text-pink-100/60">
                    <span>{skill.name}</span>
                    <span className="text-pink-400">{skill.level}%</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "anticipate" }}
                      className="h-full bg-gradient-to-r from-pink-500/80 to-rose-400/80 shadow-[0_0_10px_rgba(244,114,182,0.3)]"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-10 border border-white/5 rounded-[3rem] bg-white/5 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-xl font-light mb-6 flex items-center gap-3 text-pink-200">
                <BookOpen size={20} className="text-pink-400" /> 最近在读
              </h4>
              <p className="text-white/90 italic font-serif text-2xl leading-relaxed mb-4">《认知觉醒》</p>
              <p className="text-pink-100/60 text-sm mb-8">—— 周岭</p>

              <div className="pt-6 border-t border-white/5">
                <p className="text-pink-200 font-light tracking-widest text-lg mb-2">"提升能力，保持耐心"</p>
                <div className="flex items-center gap-3 text-[10px] text-white/30 tracking-[0.3em] uppercase font-roboto">
                  <TrendingUp size={14} className="text-pink-400" /> ONGOING JOURNEY
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 text-center">
        <p className="text-pink-900/20 text-[10px] tracking-[0.4em] mb-4 uppercase font-roboto font-bold">MADE WITH LOVE & VIBE CODING</p>
        <div className="text-[10px] text-pink-900/10 font-roboto">© 2024 FLOS SPACE. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}