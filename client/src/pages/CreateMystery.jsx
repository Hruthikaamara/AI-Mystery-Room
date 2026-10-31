import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen, Clock3, Fingerprint, LoaderCircle, Sparkles } from 'lucide-react';
import { generateInvestigation } from '../services/api.js';
import { Brand, Button, ErrorNotice, Eyebrow } from '../components/UI.jsx';

const categories = ['Any mystery', 'Locked-room mystery', 'Whodunit', 'Missing person', 'Art heist', 'Small-town secret', 'Corporate intrigue'];

export default function CreateMystery() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', scenario: '', category: 'Any mystery', difficulty: 'Standard', instructions: '' });
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const update = (key) => (event) => setForm((old) => ({ ...old, [key]: event.target.value }));
  async function handleSubmit(event) { event.preventDefault(); setError(''); setBusy(true); try { const { data } = await generateInvestigation(form); navigate(`/investigation/${data.investigationId}`); } catch (err) { setError(err.message); setBusy(false); } }
  return <main className="inner-page"><header className="inner-nav"><Link to="/" className="back-link"><ArrowLeft size={15}/> THE CASE DESK</Link><Brand/><span className="file-state"><span/> NEW FILE</span></header><div className="create-layout"><aside className="create-aside"><Eyebrow icon="Fingerprint">BEFORE YOU BEGIN</Eyebrow><h1>Every case<br/>starts with a<br/><em>question.</em></h1><p>A detail that doesn’t fit. A story left unfinished. Tell us what you have in mind and we’ll build the case around it.</p><div className="aside-note"><BookOpen size={17}/><span>THE GOOD ONES<br/><strong>START WITH A HUNCH.</strong></span></div><div className="aside-index">FIELD NOTE &nbsp; 01—A</div></aside><section className="form-panel"><div className="form-heading"><div><Eyebrow>OPEN A NEW CASE FILE</Eyebrow><h2>Set the scene.</h2></div><span className="form-case-no">CASE NO.<br/><strong>— — — —</strong></span></div><form onSubmit={handleSubmit}>
    <label className="field-label" htmlFor="title">CASE TITLE <span>OPTIONAL</span></label><input id="title" maxLength="90" value={form.title} onChange={update('title')} placeholder="Give your case a name…"/>
    <label className="field-label" htmlFor="scenario">WHAT HAPPENED? <span>REQUIRED</span></label><textarea id="scenario" required minLength="20" maxLength="4000" rows="6" value={form.scenario} onChange={update('scenario')} placeholder="A curator discovers a painting has vanished during a private viewing. The gallery was locked, the alarm never sounded, and four guests insist they never left their seats…"/><div className="char-count">{form.scenario.length} / 4,000</div>
    <div className="form-two"><div><label className="field-label" htmlFor="category">KIND OF MYSTERY</label><select id="category" value={form.category} onChange={update('category')}>{categories.map((option)=><option key={option}>{option}</option>)}</select></div><div><label className="field-label" htmlFor="difficulty">DIFFICULTY</label><select id="difficulty" value={form.difficulty} onChange={update('difficulty')}><option>Gentle</option><option>Standard</option><option>Challenging</option></select></div></div>
    <label className="field-label" htmlFor="instructions">ANYTHING ELSE? <span>OPTIONAL</span></label><input id="instructions" maxLength="500" value={form.instructions} onChange={update('instructions')} placeholder="A particular setting, tone, or detail to include…"/>
    <div className="form-privacy"><Clock3 size={15}/><span>Usually takes under a minute. Your culprit stays under lock and key until your verdict.</span></div>
    {error && <ErrorNotice>{error}</ErrorNotice>}
    <Button type="submit" icon={busy ? undefined : 'ArrowUpRight'} className="generate-button" disabled={busy || form.scenario.trim().length < 20}>{busy ? <><LoaderCircle size={17} className="spin"/> BUILDING YOUR CASE…</> : 'GENERATE INVESTIGATION'}</Button>
    <span className="fiction-note"><Sparkles size={13}/> ALL CASES AND EVIDENCE ARE FICTIONAL.</span>
  </form></section></div></main>;
}
