import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { api, getUser, logout, saveSession } from './lib/api.js';
import AdminEnrollments from './components/AdminEnrollments.jsx';
import './styles.css';

function Brand({ footer = false }) {
  return (
    <Link className={`brand${footer ? ' brand-footer' : ''}`} to="/" aria-label="Forma learning home">
      <span className="brand-mark">f.</span>
      <span className="brand-name">forma<span className="brand-period">.</span></span>
    </Link>
  );
}

function Shell({ children }) {
  const navigate = useNavigate();
  const user = getUser();
  const [open, setOpen] = useState(false);

  function signOut() {
    logout();
    setOpen(false);
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <header className="nav">
        <Brand />
        <button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
        <nav className={open ? 'open' : ''} aria-label="Main navigation">
          <NavLink to="/courses" onClick={() => setOpen(false)}>Explore</NavLink>
          {user && (
            <NavLink
              to={user.role === 'admin' ? '/admin' : '/dashboard'}
              onClick={() => setOpen(false)}
            >
              {user.role === 'admin' ? 'Studio' : 'My learning'}
            </NavLink>
          )}
          <a className="nav-about" href={`${import.meta.env.BASE_URL}#approach`} onClick={() => setOpen(false)}>Our approach</a>
          {user ? (
            <button className="nav-signout" onClick={signOut}>Sign out</button>
          ) : (
            <>
              <Link className="nav-login" to="/login" onClick={() => setOpen(false)}>Sign in</Link>
              <Link className="navcta" to="/register" onClick={() => setOpen(false)}>
                Begin learning <span aria-hidden="true">↗</span>
              </Link>
            </>
          )}
        </nav>
      </header>
      {children}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Brand footer />
            <p>A considered space to build skills, make progress, and do your best work.</p>
          </div>
          <div className="footer-links">
            <span className="footer-label">EXPLORE</span>
            <Link to="/courses">Course catalogue</Link>
            <Link to="/register">Create an account</Link>
          </div>
          <div className="footer-credit">
            <span className="footer-label">INDEPENDENTLY CREATED BY</span>
            <strong>Srujana Sharma</strong>
            <span>Developer &amp; designer</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Forma Learning Studio</span>
          <span>Thoughtfully made for curious minds.</span>
        </div>
      </footer>
    </div>
  );
}

function Protected({ children, role }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  if (!role && user.role === 'admin') return <Navigate to="/admin" replace />;
  return children;
}

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />THE ART OF MOVING FORWARD</p>
          <h1>Make room for<br />what you <em>could become.</em></h1>
          <p className="lead">
            Thoughtful courses for people who want to grow with intention.
            Find your next skill, learn at your own pace, and see how far you have come.
          </p>
          <div className="actions">
            <Link className="button button-gold" to="/courses">Explore the collection <span aria-hidden="true">↗</span></Link>
            <Link className="button button-quiet" to="/register">Create your account</Link>
          </div>
          <div className="hero-note">
            <span className="avatar-stack" aria-hidden="true"><i>S</i><i>F</i><i>M</i></span>
            <span>Made for lifelong learners</span>
            <span className="note-divider" />
            <span className="live-dot" />
            <span>Learning, in your own time</span>
          </div>
        </div>
        <div className="hero-art" aria-label="A connected learning journey">
          <div className="art-glow" />
          <svg className="connection-lines" viewBox="0 0 640 520" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="gold-line" x1="113" y1="68" x2="523" y2="432" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C9B8A0" />
                <stop offset="1" stopColor="#A78B71" stopOpacity=".12" />
              </linearGradient>
            </defs>
            <path d="M112 100C200 107 188 205 307 248" stroke="url(#gold-line)" />
            <path d="M513 95C412 130 453 212 339 254" stroke="url(#gold-line)" />
            <path d="M519 405C425 371 432 300 339 267" stroke="url(#gold-line)" />
            <path d="M115 396C222 365 201 297 307 263" stroke="url(#gold-line)" />
            <path className="flow-line" d="M112 100C200 107 188 205 307 248" />
            <path className="flow-line flow-delay" d="M513 95C412 130 453 212 339 254" />
          </svg>
          <div className="satellite satellite-top-left">
            <span className="satellite-icon">✳</span>
            <div><small>01 / BEGIN</small><strong>Find your focus</strong></div>
            <span className="satellite-arrow">↗</span>
          </div>
          <div className="satellite satellite-top-right">
            <span className="satellite-icon satellite-icon-2">⌘</span>
            <div><small>02 / EXPLORE</small><strong>Learn by doing</strong></div>
            <span className="satellite-arrow">↗</span>
          </div>
          <div className="satellite satellite-bottom-left">
            <span className="satellite-icon satellite-icon-3">◌</span>
            <div><small>03 / PRACTICE</small><strong>Build your rhythm</strong></div>
            <span className="satellite-arrow">↗</span>
          </div>
          <div className="satellite satellite-bottom-right">
            <span className="satellite-icon satellite-icon-4">✧</span>
            <div><small>04 / GROW</small><strong>See your progress</strong></div>
            <span className="satellite-arrow">↗</span>
          </div>
          <div className="neural-core">
            <div className="core-ring core-ring-one" />
            <div className="core-ring core-ring-two" />
            <span className="core-symbol">f.</span>
            <span className="core-label">YOUR NEXT CHAPTER</span>
          </div>
          <div className="art-caption"><span>LEARNING IS A PRACTICE</span><span>01 — 04</span></div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Platform highlights">
        <div><strong>Curated</strong><span>Practical learning paths</span></div>
        <div><strong>Yours</strong><span>Progress at your pace</span></div>
        <div><strong>Always</strong><span>A place to keep growing</span></div>
        <div className="proof-note"><span className="proof-star">✳</span><span>SMALL STEPS.<br />MEANINGFUL CHANGE.</span></div>
      </section>

      <section className="approach-section" id="approach">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" />A MORE HUMAN WAY TO LEARN</p>
            <h2>Progress, with <em>purpose.</em></h2>
          </div>
          <p>Good learning is not a race to the finish. It is a series of small discoveries that add up to something bigger.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-number">01</span><span className="feature-icon">⌕</span>
            <h3>Find what fits</h3>
            <p>Explore a growing catalogue of focused courses made for real-world curiosity.</p>
            <Link to="/courses" aria-label="Explore courses">↗</Link>
          </article>
          <article className="feature-card">
            <span className="feature-number">02</span><span className="feature-icon">◷</span>
            <h3>Learn your way</h3>
            <p>Make learning part of your life with a flexible pace that works for you.</p>
            <Link to="/courses" aria-label="Browse learning paths">↗</Link>
          </article>
          <article className="feature-card">
            <span className="feature-number">03</span><span className="feature-icon">↗</span>
            <h3>Notice the change</h3>
            <p>Track every step forward and let your progress become its own motivation.</p>
            <Link to="/register" aria-label="Start tracking your progress">↗</Link>
          </article>
          <article className="feature-card feature-card-highlight">
            <span className="feature-number">04</span><span className="feature-icon">✳</span>
            <h3>Keep becoming</h3>
            <p>There is always more to discover. Your next chapter can start right here.</p>
            <Link to="/register" aria-label="Begin your next chapter">↗</Link>
          </article>
        </div>
      </section>

      <section className="closing-cta">
        <div className="cta-orbit cta-orbit-one" /><div className="cta-orbit cta-orbit-two" />
        <p className="eyebrow">YOUR NEXT STEP STARTS HERE</p>
        <h2>Curiosity looks<br /><em>good on you.</em></h2>
        <p>Choose a course. Give yourself the time. See what happens next.</p>
        <Link className="button button-light" to="/courses">Find your next course <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify(form) });
      saveSession(data);
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Auth title="Welcome back." subtitle="Pick up where your curiosity left off.">
      <form onSubmit={submit}>
        {error && <div className="alert" role="alert">{error}</div>}
        <Field label="Email address" type="email" value={form.email} onChange={value => setForm({ ...form, email: value })} />
        <Field label="Password" type="password" value={form.password} onChange={value => setForm({ ...form, password: value })} />
        <button className="button button-gold button-submit">Sign in <span aria-hidden="true">↗</span></button>
        <p className="hint">Demo student: student@example.com / Student@12345</p>
        <p className="hint">Demo admin: admin@example.com / Admin@12345</p>
        <p className="auth-switch">New to Forma? <Link to="/register">Create an account</Link></p>
      </form>
    </Auth>
  );
}

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      const data = await api('/api/auth/register', { method: 'POST', body: JSON.stringify(form) });
      saveSession(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Auth title="A good place to begin." subtitle="Create an account and make space for something new.">
      <form onSubmit={submit}>
        {error && <div className="alert" role="alert">{error}</div>}
        <Field label="Full name" value={form.name} onChange={value => setForm({ ...form, name: value })} />
        <Field label="Email address" type="email" value={form.email} onChange={value => setForm({ ...form, email: value })} />
        <Field label="Password" type="password" value={form.password} onChange={value => setForm({ ...form, password: value })} />
        <button className="button button-gold button-submit">Create account <span aria-hidden="true">↗</span></button>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </Auth>
  );
}

function Auth({ title, subtitle, children }) {
  return (
    <main className="auth-page">
      <div className="auth-decoration"><span>f.</span></div>
      <section className="authbox">
        <p className="eyebrow"><span className="eyebrow-line" />A SPACE TO GROW</p>
        <h1>{title}</h1>
        <p className="auth-subtitle">{subtitle}</p>
        {children}
        <p className="auth-credit">A learning studio by <strong>Srujana Sharma</strong></p>
      </section>
    </main>
  );
}

function Field({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        required
        type={type}
        minLength={type === 'password' ? 8 : undefined}
        autoComplete={type === 'email' ? 'email' : type === 'password' ? 'current-password' : 'name'}
        value={value}
        placeholder={placeholder}
        onChange={event => onChange(event.target.value)}
      />
    </label>
  );
}

function Courses() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [message, setMessage] = useState('');
  const user = getUser();

  async function load() {
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (category) params.set('category', category);
    if (level) params.set('level', level);
    const data = await api(`/api/courses?${params}`);
    setCourses(data.courses);
  }

  useEffect(() => {
    load().catch(error => setMessage(error.message));
  }, [query, category, level]);

  async function enroll(id) {
    try {
      await api(`/api/enrollments/${id}`, { method: 'POST' });
      setMessage('You are enrolled. Your next chapter starts now.');
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="page catalog-page">
      <div className="page-intro">
        <p className="eyebrow"><span className="eyebrow-line" />THE COURSE COLLECTION</p>
        <div className="pagehead">
          <div><h1>Follow your <em>curiosity.</em></h1><p>Good things begin with a question. Find a course that sparks yours.</p></div>
          <span className="collection-index">A small step<br />can change a lot.</span>
        </div>
      </div>
      <div className="filters">
        <label className="search-field"><span aria-hidden="true">⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search courses, instructors..." aria-label="Search courses and instructors" /></label>
        <select value={category} onChange={event => setCategory(event.target.value)} aria-label="Filter by category"><option value="">All categories</option><option>Web Development</option><option>Backend</option><option>Data Science</option></select>
        <select value={level} onChange={event => setLevel(event.target.value)} aria-label="Filter by level"><option value="">All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
      </div>
      {message && <div className="notice" role="status">{message}</div>}
      <div className="grid course-grid">
        {courses.map((course, index) => (
          <article className="course" key={course._id}>
            <div className={`course-art course-art-${index % 4}`}><span>{String(index + 1).padStart(2, '0')}</span><i aria-hidden="true">{['✳', '⌘', '◌', '✧'][index % 4]}</i></div>
            <div className="course-content">
              <div className="course-top"><span>{course.category}</span><span className="pill">{course.level}</span></div>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="meta"><span>{course.durationHours} hours</span><span>with Srujana Sharma</span></div>
              {user?.role === 'student' && <button className="button button-outline full" onClick={() => enroll(course._id)}>Join this course <span aria-hidden="true">↗</span></button>}
            </div>
          </article>
        ))}
      </div>
      {!courses.length && <div className="empty"><span>✳</span><h2>No courses found just yet.</h2><p>Try another search or check back soon for something new.</p></div>}
    </main>
  );
}

function Dashboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  async function load() {
    try {
      const data = await api('/api/enrollments/mine');
      setItems(data.enrollments);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => { load(); }, []);

  async function update(id, value) {
    try {
      await api(`/api/enrollments/${id}/progress`, { method: 'PATCH', body: JSON.stringify({ progress: Number(value) }) });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  const completed = items.filter(item => item.completed).length;
  const average = items.length ? Math.round(items.reduce((sum, item) => sum + item.progress, 0) / items.length) : 0;

  return (
    <main className="page dashboard-page">
      <div className="page-intro">
        <p className="eyebrow"><span className="eyebrow-line" />YOUR PERSONAL STUDIO</p>
        <div className="pagehead">
          <div><h1>Your learning, <em>in motion.</em></h1><p>Every little bit of progress is still progress. Keep going.</p></div>
          <Link className="button button-gold" to="/courses">Discover a course <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      {error && <div className="alert" role="alert">{error}</div>}
      <section className="dashboard-stats">
        <div><span>COURSES IN PROGRESS</span><strong>{items.length.toString().padStart(2, '0')}</strong></div>
        <div><span>COMPLETED</span><strong>{completed.toString().padStart(2, '0')}</strong></div>
        <div><span>AVERAGE PROGRESS</span><strong>{average}<i>%</i></strong></div>
        <div className="dashboard-note"><span className="proof-star">✳</span><p>Consistency is its own kind of achievement.</p></div>
      </section>
      <div className="section-subhead"><h2>Your courses</h2><span>{items.length} {items.length === 1 ? 'course' : 'courses'}</span></div>
      <div className="grid course-grid">
        {items.map((item, index) => (
          <article className="course progress-card" key={item._id}>
            <div className={`course-art course-art-${index % 4}`}><span>IN YOUR STUDIO</span><i aria-hidden="true">{['✳', '⌘', '◌', '✧'][index % 4]}</i></div>
            <div className="course-content">
              <span className="pill">{item.course.level}</span>
              <h2>{item.course.title}</h2>
              <p>{item.course.description}</p>
              <div className="bar" role="progressbar" aria-label={`${item.course.title} progress`} aria-valuenow={item.progress} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${item.progress}%` }} /></div>
              <div className="progress-row"><b>{item.progress}%</b><span>{item.completed ? 'A lovely milestone — complete' : 'Still unfolding'}</span></div>
              <label className="range">Update your progress <input type="range" min="0" max="100" value={item.progress} onChange={event => update(item._id, event.target.value)} /></label>
            </div>
          </article>
        ))}
      </div>
      {!items.length && <div className="empty"><span>◌</span><h2>Your story is just beginning.</h2><p>Choose a course and your learning journey will find its place here.</p><Link className="button button-outline" to="/courses">Browse the collection <span aria-hidden="true">↗</span></Link></div>}
    </main>
  );
}

function Admin() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', instructor: '', category: 'Web Development', level: 'Beginner', durationHours: 10, lessons: ['Lesson 1', 'Lesson 2'] });
  const [message, setMessage] = useState('');

  async function load() {
    const [courseData, enrollmentData] = await Promise.all([
      api('/api/courses/admin/all'),
      api('/api/enrollments/admin/all'),
    ]);
    setCourses(courseData.courses);
    setEnrollments(enrollmentData.enrollments);
  }

  useEffect(() => { load().catch(error => setMessage(error.message)); }, []);

  async function create(event) {
    event.preventDefault();
    try {
      await api('/api/courses', { method: 'POST', body: JSON.stringify({ ...form, durationHours: Number(form.durationHours) }) });
      setMessage('Your new course is ready for learners.');
      setForm({ title: '', description: '', instructor: '', category: 'Web Development', level: 'Beginner', durationHours: 10, lessons: ['Lesson 1', 'Lesson 2'] });
      await load();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function unpublish(id) {
    try {
      await api(`/api/courses/${id}`, { method: 'DELETE' });
      setMessage('Course unpublished.');
      await load();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="page dashboard-page">
      <div className="page-intro">
        <p className="eyebrow"><span className="eyebrow-line" />THE CREATOR STUDIO</p>
        <div className="pagehead">
          <div><h1>Make space for <em>good work.</em></h1><p>Shape the course collection and keep an eye on your learning community.</p></div>
          <div className="studio-owner"><span>STUDIO CURATED BY</span><strong>Srujana Sharma</strong></div>
        </div>
      </div>
      {message && <div className="notice" role="status">{message}</div>}
      <section className="dashboard-stats admin-stats">
        <div><span>PUBLISHED COURSES</span><strong>{courses.length.toString().padStart(2, '0')}</strong></div>
        <div><span>LEARNER ENROLLMENTS</span><strong>{enrollments.length.toString().padStart(2, '0')}</strong></div>
        <div><span>COMPLETED JOURNEYS</span><strong>{enrollments.filter(item => item.completed).length.toString().padStart(2, '0')}</strong></div>
        <div className="dashboard-note"><span className="proof-star">✳</span><p>Thoughtful teaching changes what is possible.</p></div>
      </section>
      <section className="admin-grid">
        <form className="panel admin-form" onSubmit={create}>
          <p className="eyebrow"><span className="eyebrow-line" />ADD TO THE COLLECTION</p>
          <h2>Create a course</h2>
          <Field label="Course title" value={form.title} onChange={value => setForm({ ...form, title: value })} />
          <label className="field"><span>Course description</span><textarea required value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} /></label>
          <Field label="Instructor" value={form.instructor} onChange={value => setForm({ ...form, instructor: value })} />
          <div className="two">
            <Field label="Category" value={form.category} onChange={value => setForm({ ...form, category: value })} />
            <Field label="Hours" type="number" value={form.durationHours} onChange={value => setForm({ ...form, durationHours: value })} />
          </div>
          <label className="field"><span>Level</span><select value={form.level} onChange={event => setForm({ ...form, level: event.target.value })}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
          <button className="button button-gold button-submit">Publish course <span aria-hidden="true">↗</span></button>
        </form>
        <section className="panel admin-course-list">
          <div className="admin-panel-heading"><div><p className="eyebrow"><span className="eyebrow-line" />YOUR WORK</p><h2>Course collection</h2></div><span className="count-badge">{courses.length}</span></div>
          {courses.map(course => (
            <article className="admin-item" key={course._id}>
              <span className="admin-course-symbol">✳</span>
              <div><b>{course.title}</b><small>{course.category} <span>·</span> {course.level}</small></div>
              {course.published && <button className="ghost" onClick={() => unpublish(course._id)}>Unpublish</button>}
            </article>
          ))}
          {!courses.length && <p className="admin-empty">Your collection is ready for its first course.</p>}
        </section>
      </section>
    </main>
  );
}

function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/admin" element={<Protected role="admin"><><Admin /><AdminEnrollments /></></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>,
);
