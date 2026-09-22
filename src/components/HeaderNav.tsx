import React, { useState, useEffect } from 'react';
import { Terminal, Activity, Menu, X, Cpu, ShieldAlert, Sliders, Database, Network, TrendingUp } from 'lucide-react';

interface HeaderNavProps {
  onToggleTerminal: () => void;
  terminalOpen: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onToggleTerminal, terminalOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('es-ES', { hour12: false }) + ' UTC' + (now.getTimezoneOffset() > 0 ? '-' : '+') + Math.abs(now.getTimezoneOffset() / 60)
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#hero', icon: Activity },
    { label: 'Fundamentos', href: '#fundamentos', icon: Database },
    { label: 'Machine Learning', href: '#machine-learning', icon: Cpu },
    { label: 'Ciclo de Datos', href: '#ciclo-vida', icon: Network },
    { label: 'Redes LSTM', href: '#redes-lstm', icon: Cpu },
    { label: 'Escenarios', href: '#escenarios', icon: TrendingUp },
    { label: 'IP-Playground', href: '#playground', icon: Sliders },
    { label: 'Dashboard', href: '#dashboard', icon: Activity },
    { label: 'Anomalías', href: '#anomalias', icon: ShieldAlert },
    { label: 'Gobernanza', href: '#gobernanza', icon: Database }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e14]/90 backdrop-blur-md border-b border-[#00f0ff]/15">
      {/* Top micro-bar for market ticker status */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 text-[11px] font-mono bg-[#070a0e] text-slate-400 border-b border-white/5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#00ff88]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping inline-block" />
            LIVE FEED: SISTEMA ESTADÍSTICO CONECTADO
          </span>
          <span className="text-slate-600">|</span>
          <span>IPP AGRO: <span className="text-[#00ff88]">+1.85%</span></span>
          <span>IPP MINERÍA: <span className="text-rose-400">-0.92%</span></span>
          <span>IPP MANUFACTURA: <span className="text-[#00f0ff]">+0.42%</span></span>
          <span>PASS-THROUGH: <span className="text-[#ffb300]">0.74</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">LATENCIA: <span className="text-[#00ff88]">14ms</span></span>
          <span className="text-slate-600">|</span>
          <span className="text-[#00f0ff]">{currentTime}</span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00ff88]/20 via-[#00f0ff]/20 to-transparent border border-[#00ff88]/40 flex items-center justify-center group-hover:border-[#00ff88] transition-all">
            <Activity className="w-5 h-5 text-[#00ff88] group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold tracking-wider text-sm sm:text-base text-white">
                IPP <span className="text-[#00ff88]">ANALYTICS</span>
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                AI v4.2
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block font-mono">Terminal de Inteligencia Económica</p>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center space-x-1 font-mono text-xs">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2.5 py-1.5 rounded text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action: CLI Terminal Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTerminal}
            id="btn-toggle-terminal"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs transition-all border ${
              terminalOpen
                ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88] glow-green'
                : 'bg-white/5 text-slate-200 border-white/10 hover:border-[#00ff88]/50 hover:text-[#00ff88]'
            }`}
            title="Abrir o cerrar consola de comandos CLI"
          >
            <Terminal className="w-4 h-4 text-[#00ff88]" />
            <span className="hidden sm:inline">TERMINAL CLI</span>
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="btn-mobile-menu"
            className="xl:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0d1117] border-b border-white/10 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm text-slate-200 hover:bg-[#00ff88]/10 hover:text-[#00ff88] transition-colors"
            >
              <item.icon className="w-4 h-4 text-[#00f0ff]" />
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
