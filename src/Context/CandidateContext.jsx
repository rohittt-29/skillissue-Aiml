import React, { createContext, useContext, useState } from 'react';

const CandidateContext = createContext();

export const useCandidate = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidate must be used within a CandidateProvider');
  }
  return context;
};

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState({
    totalCandidates: 0,
    resumesAnalyzed: 0,
    averageMatch: 0
  });

  const addCandidate = (candidate) => {
    setCandidates(prev => [...prev, candidate]);
  };

  const updateStats = (candidatesList) => {
    const total = candidatesList.length;
    const analyzed = candidatesList.filter(c => c.analyzed).length;
    const avgMatch = candidatesList.reduce((acc, curr) => acc + curr.matchPercentage, 0) / total || 0;

    setStats({
      totalCandidates: total,
      resumesAnalyzed: analyzed,
      averageMatch: Math.round(avgMatch)
    });
  };

  const value = {
    candidates,
    stats,
    addCandidate,
    updateStats
  };

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
}; 