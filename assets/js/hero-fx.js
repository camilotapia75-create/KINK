/* DungeonKing hero background — interactive fluid smoke.
   A coarse-grid stable-fluids solver (semi-Lagrangian advection + Jacobi
   pressure projection) drives glowing red smoke that swirls with the cursor,
   plus swinging chains, rising embers and a cursor spotlight. Runs idle as a
   slow rising plume, erupts when the mouse moves. Set STORE.heroVideo to a
   video path to play real footage underneath with mouse parallax. */

(function () {
  const hero = document.getElementById("hero");
  const canvas = document.getElementById("hero-canvas");
  if (!hero || !canvas) return;
  const ctx = canvas.getContext("2d");

  /* optional real video layer */
  const useVideo = typeof STORE !== "undefined" && STORE.heroVideo;
  let videoEl = null;
  if (useVideo) {
    videoEl = document.createElement("video");
    Object.assign(videoEl, { src: STORE.heroVideo, autoplay: true, muted: true, loop: true, playsInline: true });
    videoEl.className = "hero-video";
    hero.prepend(videoEl);
  }

  let W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener("resize", resize);

  /* ---------- fluid simulation (Stam stable fluids) ---------- */
  const GN = 110;                       // grid width (inner cells)
  const GM = 62;                        // grid height
  const GW = GN + 2, GH = GM + 2;       // with boundary
  const SIZE = GW * GH;
  const IX = (i, j) => i + j * GW;
  let u = new Float32Array(SIZE), v = new Float32Array(SIZE);
  let u0 = new Float32Array(SIZE), v0 = new Float32Array(SIZE);
  let dye = new Float32Array(SIZE), dye0 = new Float32Array(SIZE);
  const p = new Float32Array(SIZE), div = new Float32Array(SIZE);

  function setBnd(b, x) {
    for (let i = 1; i <= GN; i++) {
      x[IX(i, 0)] = b === 2 ? -x[IX(i, 1)] : x[IX(i, 1)];
      x[IX(i, GM + 1)] = b === 2 ? -x[IX(i, GM)] : x[IX(i, GM)];
    }
    for (let j = 1; j <= GM; j++) {
      x[IX(0, j)] = b === 1 ? -x[IX(1, j)] : x[IX(1, j)];
      x[IX(GN + 1, j)] = b === 1 ? -x[IX(GN, j)] : x[IX(GN, j)];
    }
  }

  function project() {
    const h = 1 / GN;
    for (let j = 1; j <= GM; j++) for (let i = 1; i <= GN; i++) {
      div[IX(i, j)] = -0.5 * h * (u[IX(i + 1, j)] - u[IX(i - 1, j)] + v[IX(i, j + 1)] - v[IX(i, j - 1)]);
      p[IX(i, j)] = 0;
    }
    setBnd(0, div); setBnd(0, p);
    for (let k = 0; k < 14; k++) {
      for (let j = 1; j <= GM; j++) for (let i = 1; i <= GN; i++) {
        p[IX(i, j)] = (div[IX(i, j)] + p[IX(i - 1, j)] + p[IX(i + 1, j)] + p[IX(i, j - 1)] + p[IX(i, j + 1)]) / 4;
      }
      setBnd(0, p);
    }
    for (let j = 1; j <= GM; j++) for (let i = 1; i <= GN; i++) {
      u[IX(i, j)] -= 0.5 * (p[IX(i + 1, j)] - p[IX(i - 1, j)]) / h;
      v[IX(i, j)] -= 0.5 * (p[IX(i, j + 1)] - p[IX(i, j - 1)]) / h;
    }
    setBnd(1, u); setBnd(2, v);
  }

  function advect(b, d, d0, uu, vv, dt, decay) {
    const dt0 = dt * GN;
    for (let j = 1; j <= GM; j++) for (let i = 1; i <= GN; i++) {
      let x = i - dt0 * uu[IX(i, j)];
      let y = j - dt0 * vv[IX(i, j)];
      x = Math.max(0.5, Math.min(GN + 0.5, x));
      y = Math.max(0.5, Math.min(GM + 0.5, y));
      const i0 = x | 0, j0 = y | 0, i1 = i0 + 1, j1 = j0 + 1;
      const s1 = x - i0, s0 = 1 - s1, t1 = y - j0, t0 = 1 - t1;
      d[IX(i, j)] = decay * (
        s0 * (t0 * d0[IX(i0, j0)] + t1 * d0[IX(i0, j1)]) +
        s1 * (t0 * d0[IX(i1, j0)] + t1 * d0[IX(i1, j1)]));
    }
    setBnd(b, d);
  }

  function fluidStep(dt) {
    project();
    [u0, u] = [u, u0]; [v0, v] = [v, v0];
    advect(1, u, u0, u0, v0, dt, 0.999);
    advect(2, v, v0, u0, v0, dt, 0.999);
    project();
    [dye0, dye] = [dye, dye0];
    advect(0, dye, dye0, u, v, dt, 0.975);
  }

  function splat(gx, gy, dx, dy, amount, radius) {
    const r2 = radius * radius;
    const x0 = Math.max(1, gx - radius | 0), x1 = Math.min(GN, gx + radius | 0);
    const y0 = Math.max(1, gy - radius | 0), y1 = Math.min(GM, gy + radius | 0);
    for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) {
      const q = ((i - gx) ** 2 + (j - gy) ** 2) / r2;
      if (q > 1) continue;
      const fall = 1 - q;
      u[IX(i, j)] += dx * fall;
      v[IX(i, j)] += dy * fall;
      dye[IX(i, j)] = Math.min(2.2, dye[IX(i, j)] + amount * fall);
    }
  }

  /* offscreen buffer for dye rendering */
  const buf = document.createElement("canvas");
  buf.width = GN; buf.height = GM;
  const bctx = buf.getContext("2d");
  const img = bctx.createImageData(GN, GM);
  const pix = img.data;

  function drawDye() {
    for (let j = 1; j <= GM; j++) for (let i = 1; i <= GN; i++) {
      const d = dye[IX(i, j)];
      const k = ((j - 1) * GN + (i - 1)) * 4;
      const c = Math.min(1, d);
      /* ember palette: deep red -> orange -> white-hot */
      pix[k] = 90 + 165 * c;
      pix[k + 1] = 8 + 120 * c * c;
      pix[k + 2] = 14 + 70 * c * c * c;
      pix[k + 3] = 235 * Math.min(1, d * 1.1);
    }
    bctx.putImageData(img, 0, 0);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(buf, 0, 0, W, H);
    ctx.restore();
  }

  /* ---------- mouse ---------- */
  const mouse = { x: 0.5, y: 0.5, px: 0.5, py: 0.5, lx: 0.5, ly: 0.5, active: false };
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width;
    mouse.y = (e.clientY - r.top) / r.height;
    mouse.active = true;
  });
  hero.addEventListener("mouseleave", () => { mouse.active = false; });
  hero.addEventListener("touchmove", (e) => {
    const r = hero.getBoundingClientRect();
    const t0 = e.touches[0];
    mouse.x = (t0.clientX - r.left) / r.width;
    mouse.y = (t0.clientY - r.top) / r.height;
    mouse.active = true;
  }, { passive: true });

  /* ---------- chains & embers ---------- */
  const chains = [0.09, 0.26, 0.76, 0.93].map((fx, i) => ({
    fx, len: 0.5 + (i % 2) * 0.24, a: (i - 1.5) * 0.04, va: 0, links: 10 + (i % 2) * 4,
  }));
  const embers = Array.from({ length: 55 }, () => ({
    x: Math.random(), y: Math.random(), s: 0.6 + Math.random() * 1.7,
    vy: 0.0004 + Math.random() * 0.001, drift: Math.random() * 6.28, ox: 0, ovx: 0,
  }));

  const content = hero.querySelector(".hero-content");
  let t = 0, running = true;
  new IntersectionObserver((es) => { running = es[0].isIntersecting; }, { threshold: 0 }).observe(hero);

  function frame() {
    requestAnimationFrame(frame);
    if (!running || document.hidden) return;
    t += 1 / 60;

    /* idle plume: wandering source near the bottom keeps the "video" alive */
    const plumeX = GN * (0.5 + 0.3 * Math.sin(t * 0.23) + 0.1 * Math.sin(t * 0.71));
    splat(plumeX, GM - 3, Math.sin(t * 0.5) * 1.2, -6 - 2 * Math.sin(t * 0.9), 0.055, 5);

    /* cursor: inject dye + velocity along the drag direction */
    if (mouse.active) {
      const gx = mouse.x * GN, gy = mouse.y * GM;
      const dx = (mouse.x - mouse.lx) * GN, dy = (mouse.y - mouse.ly) * GM;
      const speed = Math.hypot(dx, dy);
      if (speed > 0.02) splat(gx, gy, dx * 14, dy * 14, Math.min(0.9, 0.12 + speed * 0.22), 4.5);
    }
    mouse.lx = mouse.x; mouse.ly = mouse.y;
    mouse.px += (mouse.x - mouse.px) * 0.08;
    mouse.py += (mouse.y - mouse.py) * 0.08;
    const mx = mouse.px * W, my = mouse.py * H;
    const cx = mouse.px - 0.5, cy = mouse.py - 0.5;

    fluidStep(1 / 60);

    ctx.clearRect(0, 0, W, H);
    drawDye();

    /* chains — shoved by the cursor */
    if (!useVideo) {
      ctx.strokeStyle = "rgba(215,205,210,.5)";
      ctx.lineWidth = 2.2;
      for (const c of chains) {
        const ax = c.fx * W - cx * 60, ay = -8;
        const L = c.len * H;
        let force = -0.9 * Math.sin(c.a) * 0.016 + Math.sin(t * 0.5 + c.fx * 9) * 0.00015;
        const tipX = ax + Math.sin(c.a) * L, tipY = ay + Math.cos(c.a) * L;
        for (const [px2, py2] of [[tipX, tipY], [(ax + tipX) / 2, (ay + tipY) / 2]]) {
          const dx2 = px2 - mx, dy2 = py2 - my, d = Math.hypot(dx2, dy2);
          if (d < 130) force += (dx2 > 0 ? 1 : -1) * (1 - d / 130) * 0.0045;
        }
        c.va = (c.va + force) * 0.985;
        c.a += c.va;
        for (let i = 0; i < c.links; i++) {
          const q = (i + 0.5) / c.links;
          const lx = ax + Math.sin(c.a * (0.4 + 0.6 * q)) * L * q;
          const ly = ay + Math.cos(c.a * (0.4 + 0.6 * q)) * L * q;
          ctx.beginPath();
          ctx.ellipse(lx, ly, 4, 7.5, c.a * q, 0, 6.29);
          ctx.stroke();
        }
      }
    }

    /* embers — repelled by cursor */
    for (const e of embers) {
      e.y -= e.vy; e.drift += 0.02;
      if (e.y < -0.05) { e.y = 1.05; e.x = Math.random(); }
      let ex = (e.x + Math.sin(e.drift) * 0.01 + e.ox) * W;
      const ey = e.y * H;
      const dx2 = ex - mx, dy2 = ey - my, d = Math.hypot(dx2, dy2);
      if (d < 110 && d > 0.1) e.ovx += (dx2 / d) * (1 - d / 110) * 0.0016;
      e.ovx *= 0.92; e.ox = (e.ox + e.ovx) * 0.995;
      ex = (e.x + Math.sin(e.drift) * 0.01 + e.ox) * W;
      ctx.fillStyle = `hsla(${20 + e.s * 8}, 100%, 60%, ${0.35 + 0.3 * Math.sin(e.drift * 3)})`;
      ctx.beginPath();
      ctx.arc(ex, ey, e.s, 0, 6.29);
      ctx.fill();
    }

    /* spotlight follows the cursor */
    const sp = ctx.createRadialGradient(mx, my, 0, mx, my, Math.max(W, H) * 0.55);
    sp.addColorStop(0, "rgba(255,120,90,.12)");
    sp.addColorStop(0.45, "rgba(255,40,40,.04)");
    sp.addColorStop(1, "rgba(0,0,0,.3)");
    ctx.fillStyle = sp;
    ctx.fillRect(0, 0, W, H);

    /* parallax */
    if (content) content.style.transform = `translate(${-cx * 22}px, ${-cy * 14}px)`;
    if (videoEl) videoEl.style.transform = `scale(1.12) translate(${-cx * 26}px, ${-cy * 18}px)`;
  }
  frame();
})();
