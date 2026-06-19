import { useState, useEffect, useRef } from 'react';

// ── The entire fake-login page lives in this HTML string ─────────────────────
// The iframe is sandboxed; postMessage sends events to the parent window.
const LOGIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Login</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, sans-serif;
      background: #f0f4ff;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .card {
      width: 340px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,.12);
      overflow: hidden;
    }
    .card-header {
      background: #1a56db;
      color: #fff;
      text-align: center;
      padding: 20px 16px;
    }
    .card-header h5 { font-size: 1.1rem; margin-bottom: 4px; }
    .card-header small { opacity: .8; font-size: .8rem; }
    .card-body { padding: 24px; }
    label { display: block; font-weight: 600; font-size: .875rem; margin-bottom: 4px; color: #374151; }
    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: .9rem;
      margin-bottom: 16px;
      outline: none;
      transition: border-color .15s;
    }
    input:focus { border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,.15); }
    button {
      width: 100%;
      padding: 10px;
      background: #1a56db;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: .95rem;
      font-weight: 600;
      cursor: pointer;
      transition: background .15s;
    }
    button:hover { background: #1648c0; }
    #msg {
      display: none;
      background: #d1fae5;
      color: #065f46;
      border: 1px solid #6ee7b7;
      border-radius: 6px;
      padding: 10px 12px;
      font-size: .85rem;
      margin-bottom: 16px;
    }
    .links { text-align: center; margin-top: 14px; font-size: .8rem; color: #6b7280; }
    .links a { color: #1a56db; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <h5>&#x1F510; Company Portal</h5>
      <small>Sign in to continue</small>
    </div>
    <div class="card-body">
      <div id="msg"></div>
      <label for="username">Username</label>
      <input id="username" type="text" placeholder="e.g. john.doe" autocomplete="username" />
      <label for="password">Password</label>
      <input id="password" type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" autocomplete="current-password" />
      <button id="loginBtn" type="button">Sign In</button>
      <div class="links">
        <a href="#">Forgot password?</a> &nbsp;&middot;&nbsp; <a href="#">Register</a>
      </div>
    </div>
  </div>

  <script>
    document.getElementById('loginBtn').addEventListener('click', function() {
      var username = document.getElementById('username').value.trim();
      var password = document.getElementById('password').value;

      window.parent.postMessage(
        { type: 'FAKE_LOGIN', username: username, password: password },
        '*'
      );

      var msg = document.getElementById('msg');
      msg.style.display = 'block';
      msg.textContent = 'Login event sent to parent window!';
    });
  </script>
</body>
</html>`;

// ── Parent React component ────────────────────────────────────────────────────
export default function IframeLoginDemo() {
  const [events, setEvents] = useState([]);
  const iframeRef = useRef(null);

  // Listen for postMessage events from the iframe
  useEffect(() => {
    function handleMessage(e) {
      if (e.data?.type === 'FAKE_LOGIN') {
        setEvents(prev => [
          { id: Date.now(), username: e.data.username, password: e.data.password, time: new Date().toLocaleTimeString() },
          ...prev,
        ]);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const clearEvents = () => setEvents([]);

  return (
    <div className="container py-4">
      <h2 className="mb-1">iframe + postMessage Demo</h2>
      <p className="text-muted mb-4">
        The login form runs inside a sandboxed <code>&lt;iframe srcdoc&gt;</code>. On submit it
        calls <code>window.parent.postMessage()</code> and this React component receives the event
        via <code>window.addEventListener('message', …)</code>.
      </p>

      <div className="row g-4">

        {/* ── iframe column ── */}
        <div className="col-lg-6">
          <h6 className="fw-semibold text-muted text-uppercase small mb-2">iframe (sandboxed)</h6>
          <iframe
            ref={iframeRef}
            title="Fake Login"
            srcDoc={LOGIN_HTML}
            sandbox="allow-scripts allow-forms"
            style={{ width: '100%', height: 420, border: '2px solid #dee2e6', borderRadius: 8 }}
          />
          <p className="small text-muted mt-1">
            The iframe is isolated — it has its own <code>window</code>, DOM, and JavaScript scope.
          </p>
        </div>

        {/* ── events log column ── */}
        <div className="col-lg-6">
          <div className="d-flex align-items-center mb-2">
            <h6 className="fw-semibold text-muted text-uppercase small mb-0">Parent received events</h6>
            {events.length > 0 && (
              <button className="btn btn-sm btn-outline-secondary ms-auto" onClick={clearEvents}>
                Clear
              </button>
            )}
          </div>

          {events.length === 0 ? (
            <div className="border rounded p-4 text-center text-muted" style={{ height: 320 }}>
              <div className="fs-1 mb-2">📭</div>
              Submit the login form to see the postMessage event appear here.
            </div>
          ) : (
            <div className="d-flex flex-column gap-2" style={{ maxHeight: 380, overflowY: 'auto' }}>
              {events.map(ev => (
                <div key={ev.id} className="card border-primary border-opacity-50">
                  <div className="card-body py-2 px-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="badge bg-primary">FAKE_LOGIN</span>
                      <small className="text-muted">{ev.time}</small>
                    </div>
                    <table className="table table-sm mb-0 small">
                      <tbody>
                        <tr>
                          <th className="text-muted" style={{ width: 90 }}>username</th>
                          <td><code>{ev.username || <em>empty</em>}</code></td>
                        </tr>
                        <tr>
                          <th className="text-muted">password</th>
                          <td><code>{'*'.repeat(ev.password.length) || <em>empty</em>}</code></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* concept callouts */}
          <div className="mt-3 d-flex flex-column gap-2">
            {[
              { label: 'srcdoc', text: 'Inlines a full HTML document into the iframe — no separate URL needed.' },
              { label: 'sandbox', text: '"allow-scripts allow-same-origin" limits what the iframe can do.' },
              { label: 'postMessage', text: 'The safe cross-origin channel between a frame and its parent.' },
              { label: 'message event', text: 'Parent listens on window; always check e.data.type before acting.' },
            ].map(({ label, text }) => (
              <div key={label} className="d-flex gap-2 align-items-start">
                <code className="badge bg-secondary text-wrap" style={{ minWidth: 110 }}>{label}</code>
                <small className="text-muted">{text}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
