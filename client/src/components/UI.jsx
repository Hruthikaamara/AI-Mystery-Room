import { icons } from './Icons.jsx';

export function Button({ children, icon, variant = 'primary', className = '', type = 'button', ...props }) {
  const Icon = icon ? icons[icon] : null;
  return <button className={`button button-${variant} ${className}`} type={type} {...props}>{children}{Icon && <Icon size={16} strokeWidth={1.8} />}</button>;
}

export function Brand({ light = false }) { return <a href="/" className={`brand ${light ? 'brand-light' : ''}`}><span className="brand-mark"><icons.Crosshair size={18} strokeWidth={1.6} /></span><span>THE CASEFILE<span className="brand-sub">AN INTERACTIVE MYSTERY</span></span></a>; }

export function Eyebrow({ children, icon }) { const Icon = icon ? icons[icon] : null; return <span className="eyebrow">{Icon && <Icon size={13} />}{children}</span>; }

export function PageLoader({ label = 'Opening the case file…' }) { return <div className="page-loader"><icons.LoaderCircle className="spin" size={25} /><span>{label}</span></div>; }

export function ErrorNotice({ children }) { return <div className="error-notice"><icons.CircleAlert size={17} />{children}</div>; }
