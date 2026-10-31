
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Fingerprint,
  LockKeyhole,
  X
} from 'lucide-react';

import { getResult } from '../services/api.js';
import {
  Brand,
  Button,
  ErrorNotice,
  Eyebrow,
  PageLoader
} from '../components/UI.jsx';

export default function Result() {
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getResult(id)
      .then(({ data }) => setResult(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (!result && !error) {
    return <PageLoader label="Unsealing the final report…" />;
  }

  if (error) {
    return (
      <main className="inner-page">
        <header className="inner-nav">
          <Link to={`/investigation/${id}`} className="back-link">
            <ArrowLeft size={15} /> CASE FILE
          </Link>
          <Brand />
        </header>

        <div className="center-message">
          <ErrorNotice>{error}</ErrorNotice>
          <Link className="text-link" to={`/investigation/${id}`}>
            Return to the investigation ↗
          </Link>
        </div>
      </main>
    );
  }

  const correct = result.isCorrect;

  return (
    <main className="result-page">
      <header className="inner-nav">
        <Link to="/" className="back-link">
          <ArrowLeft size={15} /> CASE DESK
        </Link>

        <Brand />

        <span className="file-state">
          <span className="file-done" /> CASE CLOSED
        </span>
      </header>

      <section className="result-shell">
        <div className="result-emblem">
          {correct ? <Check size={28} /> : <Fingerprint size={27} />}
        </div>

        <Eyebrow icon="LockKeyhole">
          FINAL REPORT &nbsp;·&nbsp; SEALED FILE OPENED
        </Eyebrow>

        <h1>
          {correct ? (
            <>
              You read
              <br />
              <em>the room.</em>
            </>
          ) : (
            <>
              The truth was
              <br />
              <em>in the details.</em>
            </>
          )}
        </h1>

        <div className={`verdict-result ${correct ? 'correct' : 'incorrect'}`}>
          {correct ? <BadgeCheck size={17} /> : <X size={17} />}
          YOUR VERDICT WAS {correct ? 'CORRECT' : 'INCORRECT'}
        </div>

        <div className="culprit-reveal">
          <div className="reveal-label">THE PERSON RESPONSIBLE</div>

          <div className="culprit-profile">
            <span className="culprit-icon">
              <Fingerprint size={24} />
            </span>

            <div>
              <strong>{result.actualCulprit?.name}</strong>
              <small>{result.actualCulprit?.occupation}</small>
            </div>

            <span className="culprit-tag">CULPRIT</span>
          </div>
        </div>

        <article className="solution-card">
          <div className="solution-heading">
            <span>
              <BadgeCheck size={16} /> THE MOTIVE
            </span>
            <span>CASE ANALYSIS</span>
          </div>

          <h2>{result.motive}</h2>
          <p>{result.explanation}</p>

          <div className="decisive-heading">
            THE CLUES THAT BROKE THE CASE
            <span>{result.decisiveEvidence?.length || 0} EXHIBITS</span>
          </div>

          <div className="decisive-list">
            {result.decisiveEvidence?.map((item, index) => (
              <div className="decisive-item" key={item.evidenceId}>
                <span>0{index + 1}</span>

                <div>
                  <strong>{item.title}</strong>
                  <p>{item.connection}</p>
                  <small>EXHIBIT {item.evidenceId}</small>
                </div>
              </div>
            ))}
          </div>
        </article>

        <div className="case-closed-note">
          <LockKeyhole size={14} />
          CASE CLOSED &nbsp;·&nbsp; EVERY DETAIL WAS FICTIONAL
        </div>

        <Link to="/create" className="new-case-link">
          OPEN A NEW CASE <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
