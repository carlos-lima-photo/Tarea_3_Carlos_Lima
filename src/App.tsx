import React, { useState } from 'react';
import { CyberBackground } from './components/CyberBackground';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { FundamentosSection } from './components/FundamentosSection';
import { MachineLearningSection } from './components/MachineLearningSection';
import { DataLifecycleSection } from './components/DataLifecycleSection';
import { NeuralNetworkSection } from './components/NeuralNetworkSection';
import { ScenariosSection } from './components/ScenariosSection';
import { PlaygroundSection } from './components/PlaygroundSection';
import { DashboardSection } from './components/DashboardSection';
import { AnomalyDetectionSection } from './components/AnomalyDetectionSection';
import { UseCasesSection } from './components/UseCasesSection';
import { TechStackSection } from './components/TechStackSection';
import { GovernanceSection } from './components/GovernanceSection';
import { TerminalConsole } from './components/TerminalConsole';
import { Footer } from './components/Footer';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e14] text-[#e2e8f0] relative scanline-grid selection:bg-[#00ff88]/20 selection:text-[#00ff88]">
      {/* 2D Interactive Canvas Background */}
      <CyberBackground />

      {/* Fixed Navigation Header */}
      <HeaderNav
        onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
        terminalOpen={terminalOpen}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <FundamentosSection />
        <MachineLearningSection />
        <DataLifecycleSection />
        <NeuralNetworkSection />
        <ScenariosSection />
        <PlaygroundSection />
        <DashboardSection />
        <AnomalyDetectionSection />
        <UseCasesSection />
        <TechStackSection />
        <GovernanceSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive CLI Terminal Console */}
      <TerminalConsole
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}
