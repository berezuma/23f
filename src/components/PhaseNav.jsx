import { PHASES } from '../data/events';

export default function PhaseNav({ activePhase, onPhaseClick }) {
  return (
    <nav className="phase-nav">
      {Object.entries(PHASES).map(([key, phase]) => (
        <button
          key={key}
          className={`phase-btn ${activePhase === key ? 'active' : ''}`}
          style={{ '--phase-color': phase.color }}
          onClick={() => onPhaseClick(key)}
        >
          <span className="phase-dot" style={{ backgroundColor: phase.color }} />
          {phase.label}
        </button>
      ))}
    </nav>
  );
}
