import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './AppShell.jsx';
import LandingPage from './pages/LandingPage.jsx';
import HomePage from './pages/HomePage.jsx';
import TrajectoryPage from './pages/TrajectoryPage.jsx';
import ResultPage from './pages/ResultPage.jsx';
import CombatGuidePage from './pages/CombatGuidePage.jsx';
import SurvivalGuidePage from './pages/SurvivalGuidePage.jsx';
import WomenStoriesPage from './pages/WomenStoriesPage.jsx';
import ElevatorTestPage from './pages/ElevatorTestPage.jsx';
import GameHubPage from './pages/GameHubPage.jsx';
import MatchPage from './pages/MatchPage.jsx';
import SquadPage from './pages/SquadPage.jsx';
import TrainingPage from './pages/TrainingPage.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/test" element={<HomePage />} />
          <Route path="/trajectory" element={<TrajectoryPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/combat" element={<CombatGuidePage />} />
          <Route path="/survival" element={<SurvivalGuidePage />} />
          <Route path="/women-stories" element={<WomenStoriesPage />} />
          <Route path="/game" element={<GameHubPage />} />
          <Route path="/elevator-test" element={<ElevatorTestPage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/squad" element={<SquadPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
