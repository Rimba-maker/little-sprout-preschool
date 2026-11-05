import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface Props {
  programs: string[];
  branches: string[];
  visits: string[];
}

type Values = Record<string, string>;
type Errors = Record<string, string>;

const FORM_NAME = 'campus-tour-booking';

const encode = (data: Values) =>
  Object.entries(data).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');

function validate(step: 1 | 2, v: Values): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!v['parent-name']?.trim()) e['parent-name'] = 'Tulis nama orangtua.';
    const wa = (v.whatsapp || '').replace(/[\s-]/g, '');
    if (!/^(\+62|62|0)8\d{7,12}$/.test(wa)) e.whatsapp = 'Isi nomor WhatsApp, contoh 0812 3456 7890.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email || '')) e.email = 'Isi email yang valid, contoh nama@email.com.';
  } else {
    if (!v['child-name']?.trim()) e['child-name'] = 'Tulis nama anak.';
    if (!v['child-age']?.trim()) e['child-age'] = 'Tulis usia anak, contoh 3 tahun 2 bulan.';
    if (!v.program) e.program = 'Pilih program.';
    if (!v.branch) e.branch = 'Pilih cabang.';
    if (!v['visit-type']) e['visit-type'] = 'Pilih jenis kunjungan.';
  }
  return e;
}

/** Two-step booking form. Posts to Netlify Forms; a static twin in the page registers the fields. */
export default function BookingForm({ programs, branches, visits }: Props) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<1 | 2>(1);
  const [v, setV] = useState<Values>({});
  const [err, setErr] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'fail'>('idle');

  const set = (k: string) => (ev: { target: { value: string } }) => {
    setV((p) => ({ ...p, [k]: ev.target.value }));
    if (err[k]) setErr((p) => ({ ...p, [k]: '' }));
  };

  const next = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(1, v);
    setErr(e);
    if (Object.keys(e).length === 0) setStep(2);
    else (document.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(2, v);
    setErr(e);
    if (Object.keys(e).length) {
      (document.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      return;
    }
    setState('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, ...v }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('done');
    } catch {
      setState('fail');
    }
  };

  const field = (id: string, label: string, props: { type?: string; placeholder?: string; autoComplete?: string; inputMode?: 'tel' | 'email' | 'text' } = {}) => (
    <div className="field">
      <label htmlFor={`bk-${id}`}>{label}</label>
      <input
        id={`bk-${id}`}
        name={id}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        inputMode={props.inputMode}
        value={v[id] ?? ''}
        onChange={set(id)}
        aria-invalid={!!err[id]}
        aria-describedby={err[id] ? `bk-${id}-err` : undefined}
      />
      <span className="field__err" id={`bk-${id}-err`} role={err[id] ? 'alert' : undefined}>{err[id]}</span>
    </div>
  );

  const select = (id: string, label: string, options: string[]) => (
    <div className="field">
      <label htmlFor={`bk-${id}`}>{label}</label>
      <select id={`bk-${id}`} name={id} value={v[id] ?? ''} onChange={set(id)} aria-invalid={!!err[id]} aria-describedby={err[id] ? `bk-${id}-err` : undefined}>
        <option value="">Pilih</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="field__err" id={`bk-${id}-err`} role={err[id] ? 'alert' : undefined}>{err[id]}</span>
    </div>
  );

  if (state === 'done') {
    return (
      <div className="form success" role="status">
        <span className="check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <h3>Terima kasih, {v['parent-name']?.split(' ')[0]}.</h3>
        <p>Tim admission akan menghubungi Anda lewat WhatsApp di {v.whatsapp} dalam 1 hari kerja untuk mengonfirmasi jadwal {v['visit-type']?.toLowerCase()}.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={step === 1 ? next : submit} noValidate aria-labelledby="bk-title">
      <h3 id="bk-title">{step === 1 ? 'Tentang Anda' : 'Tentang anak dan kunjungan'}</h3>
      <div className="form__step" aria-live="polite">
        <span>Langkah {step} dari 2</span>
        <span className="form__bar"><i style={{ width: step === 1 ? '50%' : '100%' }} /></span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: reduce ? 0 : 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reduce ? 0 : -24 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'grid', gap: '1.1rem' }}
        >
          {step === 1 ? (
            <>
              {field('parent-name', 'Nama orangtua', { placeholder: 'Nama lengkap', autoComplete: 'name' })}
              {field('whatsapp', 'WhatsApp', { type: 'tel', placeholder: '0812 3456 7890', autoComplete: 'tel', inputMode: 'tel' })}
              {field('email', 'Email', { type: 'email', placeholder: 'nama@email.com', autoComplete: 'email', inputMode: 'email' })}
            </>
          ) : (
            <>
              <div className="form__row">
                {field('child-name', 'Nama anak', { placeholder: 'Nama anak' })}
                {field('child-age', 'Usia anak', { placeholder: 'Mis. 3 tahun 2 bulan' })}
              </div>
              <div className="form__row">
                {select('program', 'Program preferensi', programs)}
                {select('branch', 'Cabang preferensi', branches)}
              </div>
              <div className="form__row">
                {select('visit-type', 'Tour atau Open House', visits)}
                <div className="field">
                  <label htmlFor="bk-preferred-date">Tanggal preferensi</label>
                  <input id="bk-preferred-date" name="preferred-date" type="date" value={v['preferred-date'] ?? ''} onChange={set('preferred-date')} />
                  <span className="field__hint">Boleh dikosongkan, tim kami akan menawarkan jadwal.</span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {state === 'fail' && <p className="form__fail" role="alert">Pesan belum terkirim. Periksa koneksi lalu coba lagi.</p>}

      <div className="form__actions">
        {step === 2 && <button type="button" className="btn btn-ghost" style={{ color: 'var(--ink)' }} onClick={() => setStep(1)}>Kembali</button>}
        <button type="submit" className="btn btn-ink" disabled={state === 'sending'}>
          {step === 1 ? 'Lanjut' : state === 'sending' ? 'Mengirim…' : 'Book Sekarang'}
        </button>
      </div>
      <p className="form__note">Response 1 hari kerja via WhatsApp · Tidak ada kewajiban mendaftar</p>
    </form>
  );
}
