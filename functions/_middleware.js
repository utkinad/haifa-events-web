/**
 * Cloudflare Pages Middleware — Early Access PIN Gate
 *
 * Configure the PIN in Cloudflare Pages → Settings → Environment Variables:
 *   EARLY_ACCESS_PIN = your 6-digit PIN
 *
 * Default fallback: 240426 (change it!)
 */

const COOKIE_NAME = "ea_v1";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // Handle PIN submission
  if (url.pathname === "/api/pin-check" && request.method === "POST") {
    return handlePinCheck(request, env);
  }

  // Pass through if already authenticated
  if (isAuthenticated(request)) {
    return next();
  }

  // Block and show PIN page
  return pinPage(false);
}

// ─── PIN check handler ────────────────────────────────────────────────────────

async function handlePinCheck(request, env) {
  const VALID_PIN = env.EARLY_ACCESS_PIN || "240426";

  let pin = "";
  try {
    const form = await request.formData();
    pin = (form.get("pin") || "").trim();
  } catch {
    return pinPage(true);
  }

  if (pin === VALID_PIN) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": `${COOKIE_NAME}=granted; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`,
      },
    });
  }

  return pinPage(true);
}

// ─── Cookie helper ────────────────────────────────────────────────────────────

function isAuthenticated(request) {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const [k, v] = part.trim().split("=");
    if (k === COOKIE_NAME && v === "granted") return true;
  }
  return false;
}

// ─── PIN page HTML ────────────────────────────────────────────────────────────

function pinPage(hasError) {
  const html = `<!DOCTYPE html>
<html lang="en" style="height:100%">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Haifa Events — Early Access</title>
  <meta name="robots" content="noindex,nofollow" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;700&display=swap" rel="stylesheet" />

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      height: 100%;
      font-family: 'Sora', sans-serif;
      background: #ffffff;
      color: #111111;
    }

    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .wrap {
      text-align: center;
      width: 100%;
      max-width: 340px;
    }

    /* Logo — same as main site */
    .logo {
      margin-bottom: 56px;
      user-select: none;
    }
    .logo-haifa {
      display: block;
      font-weight: 300;
      font-size: clamp(12px, 2.5vw, 18px);
      letter-spacing: 0.18em;
      color: #111;
      margin-bottom: 3px;
      text-transform: uppercase;
    }
    .logo-events {
      display: block;
      font-weight: 700;
      font-size: clamp(20px, 4vw, 32px);
      letter-spacing: 0.06em;
      color: #111;
      line-height: 1;
      text-transform: uppercase;
    }

    /* Badge */
    .badge {
      display: inline-block;
      font-weight: 300;
      font-size: 11px;
      letter-spacing: 0.2em;
      color: #999;
      text-transform: uppercase;
      margin-bottom: 40px;
    }

    /* PIN input */
    .pin-input {
      display: block;
      width: 100%;
      padding: 16px 20px;
      font-family: 'Sora', sans-serif;
      font-size: 28px;
      font-weight: 300;
      letter-spacing: 14px;
      text-align: center;
      background: #fff;
      border: 1px solid ${hasError ? "#e5533d" : "#ddd"};
      border-radius: 12px;
      color: #111;
      outline: none;
      transition: border-color 0.2s;
      -webkit-appearance: none;
    }
    .pin-input:focus {
      border-color: #111;
    }
    ${hasError ? `.pin-input { animation: shake 0.35s ease; }` : ""}

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }

    .error-msg {
      font-weight: 300;
      font-size: 12px;
      letter-spacing: 0.05em;
      color: #e5533d;
      margin-top: 10px;
      height: 16px;
    }

    /* Submit button */
    .btn {
      display: block;
      width: 100%;
      margin-top: 20px;
      padding: 14px 20px;
      font-family: 'Sora', sans-serif;
      font-size: 13px;
      font-weight: 300;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #111;
      background: transparent;
      border: 1px solid #ccc;
      border-radius: 100px;
      cursor: pointer;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .btn:hover {
      border-color: #111;
      box-shadow: 0 2px 14px rgba(0,0,0,0.07);
    }

    footer {
      margin-top: 64px;
      font-weight: 300;
      font-size: 11px;
      letter-spacing: 0.12em;
      color: #ccc;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="logo">
      <span class="logo-haifa">Haifa</span>
      <span class="logo-events">Events</span>
    </div>

    <div class="badge">Early Access</div>

    <form method="POST" action="/api/pin-check" id="pinForm">
      <input
        type="password"
        name="pin"
        id="pinInput"
        class="pin-input"
        maxlength="6"
        placeholder="······"
        autocomplete="off"
        inputmode="numeric"
        autofocus
      />
      <div class="error-msg">${hasError ? "Incorrect PIN — try again" : ""}</div>
      <button type="submit" class="btn">Enter →</button>
    </form>

    <footer>haifa.events</footer>
  </div>

  <script>
    // Auto-submit when 6 digits entered
    document.getElementById('pinInput').addEventListener('input', function () {
      if (this.value.length === 6) {
        document.getElementById('pinForm').submit();
      }
    });
  </script>
</body>
</html>`;

  return new Response(html, {
    status: hasError ? 401 : 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
