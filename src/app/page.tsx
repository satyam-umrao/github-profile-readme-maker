
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { 
  User, Share2, Eye, 
  Code, Github, 
  RotateCcw,
  Search, Sparkles,
  ArrowRight,
  Rocket, Palette, ClipboardCheck,
  Layout, 
  CheckCircle2,
  Terminal,
  Activity,
  Trophy,
  Quote,
  Twitter,
  Linkedin,
  Disc as Discord,
  Briefcase,
  GraduationCap,
  MapPin,
  Globe,
  Cpu,
  Sun,
  Moon,
  Image as ImageIcon
} from "lucide-react";
import { TECHNOLOGIES, SOCIAL_PLATFORMS } from "@/lib/constants";
import { generateMarkdown } from "@/lib/readme-generator";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const TAB_ORDER = ["identity", "tech", "socials", "assets"];

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const computedStyle = window.getComputedStyle(target);
      setIsPointer(
        computedStyle.cursor === 'pointer' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center transition-all duration-500 ease-out",
        isPointer ? "scale-150" : "scale-100",
        isClicked ? "scale-75" : ""
      )}
      style={{ 
        transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        width: '40px',
        height: '40px'
      }}
    >
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse" />
      <div className="relative flex items-center justify-center w-8 h-8 bg-background/80 rounded-full shadow-lg shadow-primary/20 transition-all duration-500 ease-out">
        <Github className={cn(
          "w-5 h-5 text-primary transition-all duration-500",
          isPointer ? "rotate-[360deg] scale-110" : "rotate-0",
          isClicked ? "text-accent" : "text-primary"
        )} />
      </div>
    </div>
  );
};

const HeroSection = () => {
  const scrollToMaker = () => {
    document.getElementById('readme-maker')?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-setup');

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden force-dark">
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroImage?.imageUrl || "https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/d48893bd-0757-481c-8d7e-ba3e163feae7"} 
          alt="Architect Workspace"
          fill
          className="object-cover opacity-50"
          priority
          unoptimized
          data-ai-hint="tech background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-3.5 h-3.5" /> Studio Release v2.0
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-foreground leading-none">
              GITHUB PROFILE <br />
              <span className="text-primary italic">ARCHITECT</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Forge architectural-grade README profiles with our precision-built workshop tools. Engineered for developers who value precision and style.
            </p>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
            <Button 
              onClick={scrollToMaker}
              className="h-16 px-12 rounded-full bg-primary text-primary-foreground font-black text-lg uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-105 transition-all group"
            >
              Get Started <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ReadMate() {
  const [identity, setIdentity] = useState({
    name: "", role: "", roles: "", location: "", education: "",
    currentWork: "", learning: "", about: "", github: "",
    website: "", tagline: "", bannerUrl: "", gifUrl: "",
    focus: "", approach: "", mindset: "", company: "",
    showVisitorCount: true, 
    showTrophies: true, 
    showTopLangs: true,
    showStatsCard: true,
    showStreak: true,
    showActivityGraph: false,
    showQuotes: true,
    showTopRepo: true
  });

  const [techSearch, setTechSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [iconTheme, setIconTheme] = useState<'dark' | 'light'>('dark');
  const [includeSnake, setIncludeSnake] = useState(true);
  const [socials, setSocials] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("identity");
  const [previewMode, setPreviewMode] = useState<"visual" | "markdown">("visual");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light' || document.documentElement.classList.contains('light');
    setIsDark(!isLight);
    setIconTheme(isLight ? 'light' : 'dark');
    if (isLight) document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const currentIsLight = root.classList.contains('light');
    if (currentIsLight) {
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
      setIconTheme('dark');
    } else {
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
      setIconTheme('light');
    }
  };

  const filteredTech = useMemo(() => {
    if (!techSearch) return TECHNOLOGIES;
    return TECHNOLOGIES.filter(t => t.toLowerCase().includes(techSearch.toLowerCase()));
  }, [techSearch]);

  const readmeContent = useMemo(() => {
    return generateMarkdown({
      identity,
      techStack: { selected: selectedTech, theme: iconTheme, includeSnake, includeStats: true },
      socials
    });
  }, [identity, selectedTech, iconTheme, includeSnake, socials]);

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(readmeContent);
      toast({ title: "Blueprint Copied!", description: "Paste it directly into your GitHub README.md" });
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([readmeContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Build Exported!", description: "Your architectural profile has been forged successfully." });
  };

  const handleNextAction = () => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    if (currentIndex < TAB_ORDER.length - 1) {
      setActiveTab(TAB_ORDER[currentIndex + 1]);
      window.scrollTo({ top: document.getElementById('readme-maker')?.offsetTop || 0, behavior: 'smooth' });
    } else {
      downloadMarkdown();
    }
  };

  const resetForm = () => {
    setIdentity({
      name: "", role: "", roles: "", location: "", education: "",
      currentWork: "", learning: "", about: "", github: "",
      website: "", tagline: "", bannerUrl: "", gifUrl: "",
      focus: "", approach: "", mindset: "", company: "",
      showVisitorCount: true, 
      showTrophies: true, 
      showTopLangs: true,
      showStatsCard: true,
      showStreak: true,
      showActivityGraph: false,
      showQuotes: true,
      showTopRepo: true
    });
    setSelectedTech([]);
    setSocials({});
    setActiveTab("identity");
    toast({ title: "Workshop Cleared", description: "All configurations have been reset.", variant: "destructive" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300 selection:bg-primary/20 cursor-none">
      <CustomCursor />
      
      <nav className="fixed top-0 z-50 w-full bg-background/10 backdrop-blur-xl border-b border-border force-dark">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-bold text-lg tracking-tight uppercase text-foreground">
              READ<span className="text-primary">MATE</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-xl w-10 h-10 text-muted-foreground hover:text-foreground">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      <HeroSection />

      <main id="readme-maker" className="bg-background text-foreground py-24 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-[120px] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" /> Workspace
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter text-foreground">
              The Profile <span className="text-primary italic">Workshop</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden glass-card border-border bg-card/40 h-full flex flex-col min-h-[800px]">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
                  <div className="px-8 pt-8">
                    <TabsList className="grid grid-cols-4 gap-2 bg-muted p-1 rounded-2xl h-auto border border-border">
                      <TabsTrigger value="identity" className="h-10 rounded-xl gap-2 font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><User className="w-4 h-4" /> Identity</TabsTrigger>
                      <TabsTrigger value="tech" className="h-10 rounded-xl gap-2 font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Cpu className="w-4 h-4" /> Toolbox</TabsTrigger>
                      <TabsTrigger value="socials" className="h-10 rounded-xl gap-2 font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Share2 className="w-4 h-4" /> Socials</TabsTrigger>
                      <TabsTrigger value="assets" className="h-10 rounded-xl gap-2 font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Palette className="w-4 h-4" /> Assets</TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="p-8 flex-1 overflow-y-auto">
                    <TabsContent value="identity" className="space-y-6 m-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                            <Input placeholder="John Doe" value={identity.name} onChange={e => setIdentity({...identity, name: e.target.value})} className="h-12 pl-10 bg-muted/50 border-border text-foreground rounded-xl focus-visible:ring-primary" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">GitHub Username</Label>
                          <div className="relative">
                            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                            <Input placeholder="johndoe" value={identity.github} onChange={e => setIdentity({...identity, github: e.target.value})} className="h-12 pl-10 bg-muted/50 border-border text-foreground rounded-xl focus-visible:ring-primary" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                            <Input placeholder="San Francisco, CA" value={identity.location} onChange={e => setIdentity({...identity, location: e.target.value})} className="h-12 pl-10 bg-muted/50 border-border text-foreground rounded-xl" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Company / Team</Label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                            <Input placeholder="Acme Inc" value={identity.company} onChange={e => setIdentity({...identity, company: e.target.value})} className="h-12 pl-10 bg-muted/50 border-border text-foreground rounded-xl" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Education</Label>
                          <div className="relative">
                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                            <Input placeholder="Computer Science" value={identity.education} onChange={e => setIdentity({...identity, education: e.target.value})} className="h-12 pl-10 bg-muted/50 border-border text-foreground rounded-xl" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Roles (Comma separated)</Label>
                        <Input placeholder="Full Stack Developer, UI/UX Designer, Open Source Contributor" value={identity.roles} onChange={e => setIdentity({...identity, roles: e.target.value})} className="h-12 bg-muted/50 border-border text-foreground rounded-xl" />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Tagline Quote</Label>
                        <div className="relative">
                          <Quote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                          <Input placeholder="Building the future, one commit at a time." value={identity.tagline} onChange={e => setIdentity({...identity, tagline: e.target.value})} className="h-12 pl-10 bg-muted/50 border-border text-foreground rounded-xl focus-visible:ring-primary" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Professional Summary</Label>
                        <Textarea 
                          placeholder="Experienced developer focusing on building accessible and performant web applications..." 
                          value={identity.about} 
                          onChange={e => setIdentity({...identity, about: e.target.value})} 
                          className="min-h-[100px] bg-muted/50 border-border text-foreground rounded-xl resize-none focus-visible:ring-primary" 
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Current Focus</Label>
                          <Input placeholder="Cloud Native Architectures" value={identity.focus} onChange={e => setIdentity({...identity, focus: e.target.value})} className="h-12 bg-muted/50 border-border text-foreground rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Learning Goals</Label>
                          <Input placeholder="WebAssembly, Rust" value={identity.learning} onChange={e => setIdentity({...identity, learning: e.target.value})} className="h-12 bg-muted/50 border-border text-foreground rounded-xl" />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="tech" className="space-y-6 m-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search toolbox (React, Node, Firebase...)" 
                          className="pl-11 h-12 bg-muted/50 border-border text-foreground rounded-xl focus-visible:ring-primary"
                          value={techSearch}
                          onChange={e => setTechSearch(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredTech.map(tech => (
                          <button
                            key={tech}
                            onClick={() => toggleTech(tech)}
                            className={cn(
                              "flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all aspect-square border",
                              selectedTech.includes(tech) 
                                ? "bg-primary/20 border-primary shadow-lg scale-[0.98]" 
                                : "bg-muted/50 border-transparent hover:border-border hover:bg-muted"
                            )}
                          >
                            <img 
                              src={`https://skillicons.dev/icons?i=${tech}&theme=${iconTheme}`} 
                              alt={tech} 
                              className="w-10 h-10 object-contain"
                            />
                            <span className="text-[10px] font-bold truncate w-full text-center text-muted-foreground">{tech}</span>
                          </button>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="socials" className="space-y-6 m-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {SOCIAL_PLATFORMS.map(platform => (
                          <div key={platform.id} className="flex items-center gap-4 bg-muted/20 border border-border p-3 rounded-2xl hover:border-primary/30 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors shrink-0">
                              <img src={platform.iconUrl} alt={platform.label} className="w-6 h-6 object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block">{platform.label}</Label>
                              <Input 
                                placeholder="username" 
                                value={socials[platform.id] || ""}
                                onChange={e => setSocials({...socials, [platform.id]: e.target.value})}
                                className="h-9 px-3 bg-muted/40 border border-border/50 text-sm font-bold text-foreground rounded-lg focus-visible:ring-primary/50"
                              />
                            </div>
                          </div>
                        ))}
                        <div className="flex items-center gap-4 bg-muted/20 border border-border p-3 rounded-2xl hover:border-primary/30 transition-all group md:col-span-2">
                           <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors shrink-0">
                              <Globe className="w-5 h-5 text-muted-foreground" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <Label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block">Portfolio Website</Label>
                              <Input 
                                placeholder="https://my-site.com" 
                                value={identity.website}
                                onChange={e => setIdentity({...identity, website: e.target.value})}
                                className="h-9 px-3 bg-muted/40 border border-border/50 text-sm font-bold text-foreground rounded-lg focus-visible:ring-primary/50"
                              />
                           </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="assets" className="space-y-6 m-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Banner Image URL</Label>
                            <div className="relative">
                              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                              <Input placeholder="https://..." value={identity.bannerUrl} onChange={e => setIdentity({...identity, bannerUrl: e.target.value})} className="h-12 pl-10 bg-muted/50 border-border text-foreground rounded-xl focus-visible:ring-primary" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Coding GIF URL</Label>
                            <div className="relative">
                              <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                              <Input placeholder="https://..." value={identity.gifUrl} onChange={e => setIdentity({...identity, gifUrl: e.target.value})} className="h-12 pl-10 bg-muted/50 border-border text-foreground rounded-xl focus-visible:ring-primary" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[
                            { id: 'snake', label: 'Snake Anim', icon: <Activity className="w-3.5 h-3.5" />, state: includeSnake, setter: setIncludeSnake },
                            { id: 'visitor', label: 'Visitor Count', icon: <Eye className="w-3.5 h-3.5" />, state: identity.showVisitorCount, setter: (v: boolean) => setIdentity({...identity, showVisitorCount: v}) },
                            { id: 'trophies', label: 'Trophies', icon: <Trophy className="w-3.5 h-3.5" />, state: identity.showTrophies, setter: (v: boolean) => setIdentity({...identity, showTrophies: v}) },
                            { id: 'stats', label: 'Stats Card', icon: <Code className="w-3.5 h-3.5" />, state: identity.showStatsCard, setter: (v: boolean) => setIdentity({...identity, showStatsCard: v}) },
                            { id: 'streak', label: 'Streak', icon: <Sparkles className="w-3.5 h-3.5" />, state: identity.showStreak, setter: (v: boolean) => setIdentity({...identity, showStreak: v}) },
                            { id: 'langs', label: 'Languages', icon: <Layout className="w-3.5 h-3.5" />, state: identity.showTopLangs, setter: (v: boolean) => setIdentity({...identity, showTopLangs: v}) },
                            { id: 'activity', label: 'Activity Graph', icon: <Activity className="w-3.5 h-3.5" />, state: identity.showActivityGraph, setter: (v: boolean) => setIdentity({...identity, showActivityGraph: v}) },
                            { id: 'quotes', label: 'Dev Quotes', icon: <Quote className="w-3.5 h-3.5" />, state: identity.showQuotes, setter: (v: boolean) => setIdentity({...identity, showQuotes: v}) },
                            { id: 'repos', label: 'Top Repos', icon: <Rocket className="w-3.5 h-3.5" />, state: identity.showTopRepo, setter: (v: boolean) => setIdentity({...identity, showTopRepo: v}) },
                          ].map(widget => (
                            <div key={widget.id} className="flex items-center justify-between bg-muted/50 border border-border px-4 py-3 rounded-xl hover:border-primary/20 transition-colors">
                              <div className="flex items-center gap-2">
                                <span className="text-primary">{widget.icon}</span>
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{widget.label}</Label>
                              </div>
                              <Switch checked={widget.state} onCheckedChange={widget.setter} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </div>

                  <div className="p-8 bg-muted/20 flex items-center justify-between border-t border-border">
                    <Button variant="ghost" size="sm" onClick={resetForm} className="rounded-xl font-bold h-10 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                      <RotateCcw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                    <Button onClick={handleNextAction} className="h-12 px-8 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                      {activeTab === "assets" ? "Finalize Blueprint" : "Next Step"} 
                      {activeTab === "assets" ? <Rocket className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </Button>
                  </div>
                </Tabs>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden flex flex-col min-h-[800px] h-full sticky top-24 glass-card border-border bg-card/40">
                <div className="p-6 flex flex-col gap-6 bg-muted/20 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Eye className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">Live Preview</h3>
                    </div>
                    <Button variant="secondary" size="sm" onClick={copyToClipboard} className="rounded-xl h-9 font-bold gap-2 border border-border bg-background text-foreground hover:bg-muted">
                      <ClipboardCheck className="w-4 h-4" /> Copy Blueprint
                    </Button>
                  </div>
                  
                  <Tabs value={previewMode} onValueChange={(v) => setPreviewMode(v as any)} className="w-full">
                    <TabsList className="grid grid-cols-2 bg-muted p-1 rounded-xl h-11 border border-border">
                      <TabsTrigger value="visual" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Architectural</TabsTrigger>
                      <TabsTrigger value="markdown" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Markdown</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-background/50">
                  {previewMode === 'visual' ? (
                    <div className="space-y-10 text-center animate-in fade-in duration-500">
                      {identity.bannerUrl && (
                        <div className="w-full rounded-xl overflow-hidden shadow-lg border border-border">
                          <img src={identity.bannerUrl} alt="Banner" className="w-full h-auto" />
                        </div>
                      )}
                      
                      <div className="w-full flex justify-center">
                        <img 
                          src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" 
                          className="w-[90%] h-auto drop-shadow-2xl brightness-100 dark:brightness-125"
                          alt="Top Animation"
                        />
                      </div>

                      <div className="w-full flex justify-center">
                        <img 
                          src={`https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&duration=3000&pause=1000&color=10B981&center=true&vCenter=true&width=600&lines=${encodeURIComponent((identity.roles || "Architectural Developer"))}`} 
                          alt="Typing"
                          className="brightness-100 dark:brightness-200"
                        />
                      </div>
                      
                      <div className="pt-6">
                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-6 text-muted-foreground">💫 Architectural Summary</h4>
                        <div className="grid grid-cols-1 gap-6 items-center bg-muted/20 border border-border p-6 rounded-2xl text-left shadow-inner">
                           <div className="space-y-4 text-sm font-medium text-foreground/80">
                            {identity.name && <p className="text-xl font-black uppercase tracking-tight text-foreground">I am {identity.name}</p>}
                            {identity.location && <p className="flex items-center gap-2 text-primary font-bold"><MapPin className="w-3.5 h-3.5" /> Based in {identity.location}</p>}
                            {identity.education && <p className="flex items-center gap-2"><GraduationCap className="w-3.5 h-3.5 text-primary" /> {identity.education}</p>}
                            {identity.about && <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-4">{identity.about}</p>}
                            
                            <div className="grid grid-cols-2 gap-4 pt-2">
                              {identity.focus && (
                                <div className="p-3 bg-muted/40 rounded-xl border border-border">
                                  <p className="text-[8px] font-black uppercase text-muted-foreground mb-1">Current Focus</p>
                                  <p className="text-xs font-bold text-foreground">{identity.focus}</p>
                                </div>
                              )}
                              {identity.learning && (
                                <div className="p-3 bg-muted/40 rounded-xl border border-border">
                                  <p className="text-[8px] font-black uppercase text-muted-foreground mb-1">Learning</p>
                                  <p className="text-xs font-bold text-foreground">{identity.learning}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-center pt-4">
                            <img src={identity.gifUrl || "https://raw.githubusercontent.com/Satyam-Umrao/Satyam-Umrao/main/lets-code.gif"} width="300" className="rounded-xl shadow-xl border border-border" alt="Coding GIF" />
                          </div>
                        </div>
                      </div>

                      {selectedTech.length > 0 && (
                        <div className="pt-6">
                          <h4 className="text-[10px] font-black uppercase tracking-widest mb-6 text-muted-foreground">💻 Tech Toolbox</h4>
                          <div className="flex flex-wrap justify-center gap-4">
                            {selectedTech.map(tech => (
                              <div key={tech} className="bg-muted/50 p-2 rounded-xl border border-border hover:border-primary transition-colors">
                                <img 
                                  src={`https://skillicons.dev/icons?i=${tech}&theme=${iconTheme}`} 
                                  alt={tech} 
                                  className="w-10 h-10 object-contain hover:scale-110 transition-transform" 
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {(identity.showStatsCard || identity.showStreak || identity.showTrophies) && (
                        <div className="pt-6 space-y-6">
                           <h4 className="text-[10px] font-black uppercase tracking-widest mb-6 text-muted-foreground">📊 Developer Metrics</h4>
                           <div className="flex flex-col items-center gap-6">
                             {identity.showTrophies && (
                               <img src={`https://github-trophies.vercel.app/?username=${identity.github || 'architect'}`} alt="Trophies" className="w-full drop-shadow-xl" />
                             )}
                             {identity.showStatsCard && <img src={`https://github-readme-stats.vercel.app/api?username=${identity.github || 'architect'}&theme=${isDark ? 'dark' : 'light'}&hide_border=false`} alt="Stats" className="w-full drop-shadow-xl" />}
                             {identity.showStreak && <img src={`https://nirzak-streak-stats.herokuapp.com/?user=${identity.github || 'architect'}&theme=${isDark ? 'dark' : 'light'}`} alt="Streak" className="w-full drop-shadow-xl" />}
                           </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative animate-in fade-in duration-300 h-full">
                      <pre className="text-primary font-code text-[11px] leading-[1.6] overflow-x-auto p-6 bg-muted/40 rounded-2xl h-full custom-scrollbar border border-border">
                        <code>{readmeContent}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-background text-foreground relative overflow-hidden py-12 border-t border-border/5 h-auto">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-[20vw] font-black uppercase tracking-tighter text-primary/[0.03] select-none leading-none">
            READMATE
          </h2>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                <Rocket className="w-3.5 h-3.5" /> Join Developers
              </div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                FORGE YOUR <br />
                <span className="gradient-text italic">LEGACY</span>
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pb-8">
              {[
                { label: 'GitHub', icon: <Github className="w-4 h-4" />, href: 'https://github.com/satyam-umrao' },
                { label: 'Discord', icon: <Discord className="w-4 h-4" />, href: 'https://discord.com' },
                { label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/satyam-umrao' },
                { label: 'Twitter', icon: <Twitter className="w-4 h-4" />, href: 'https://x.com/SatyamUmrao_' },
              ].map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-muted/50 border border-border/10 hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 group shadow-lg"
                >
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
}
