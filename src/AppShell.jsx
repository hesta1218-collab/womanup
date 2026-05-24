import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Gamepad2, ShieldCheck, Swords, TimerReset, Trophy } from 'lucide-react';
import { LANGUAGES, useI18n } from './i18n.jsx';

const navItems = [
  { path: '/test', labelKey: 'shell.nav.test', icon: TimerReset },
  { path: '/combat', labelKey: 'shell.nav.combat', icon: Swords },
  { path: '/survival', labelKey: 'shell.nav.survival', icon: ShieldCheck },
  { path: '/women-stories', labelKey: 'shell.nav.stories', icon: BookOpen },
  { path: '/game', labelKey: 'shell.nav.game', icon: Gamepad2 },
  { path: '/leaderboard', labelKey: 'shell.nav.leaderboard', icon: Trophy },
];

export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useI18n();
  const isLanding = location.pathname === '/';

  return (
    <div className="persona-shell min-h-screen bg-void bg-slash text-paper">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="persona-red-slice right-[-120px] top-6" />
        <div className="persona-red-slice persona-red-slice-alt left-[-140px] top-[48vh]" />
        <div className="halftone-panel right-[-60px] top-[190px]" />
        <div className="ink-splatter left-[-80px] top-[420px]" />
        <div className="comic-lines left-0 top-12" />
        <div className="absolute bottom-20 left-0 h-2 w-full -skew-y-6 bg-blood/80" />
      </div>

      <div className="language-switcher" aria-label={t('language.aria')}>
        <span>{t('language.label')}</span>
        <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t('language.aria')}>
          {LANGUAGES.map((item) => (
            <option key={item.code} value={item.code}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <main className="relative mx-auto min-h-screen w-full max-w-3xl px-4 pb-40 pt-5 sm:px-6 sm:pb-28">
        {!isLanding ? (
          <button type="button" onClick={() => navigate('/')} className="brand-badge" aria-label={t('shell.backHome')}>
            <img src="/assets/wp-logo.jpg" alt="Woman Up logo" />
          </button>
        ) : null}
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t-4 border-blood bg-void/95 backdrop-blur">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-1 px-2 py-2 sm:grid-cols-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              location.pathname === item.path ||
              (item.path === '/game' && ['/elevator-test', '/match', '/squad', '/training'].includes(location.pathname));
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`nav-button ${active ? 'nav-button-active' : ''}`}
              >
                <Icon size={18} strokeWidth={3} />
                <span>{t(item.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
