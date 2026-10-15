(function () {
  const canvas = document.getElementById("demo-canvas");
  const ctx = canvas.getContext("2d");
  const playBtn = document.getElementById("play");
  const pauseBtn = document.getElementById("pause");

  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = canvas.clientWidth || 390;
    const h = canvas.clientHeight || 820;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  let raf = null;
  let running = false;
  let start = 0;
  let t = 0;

  function drawFrame(timeMs) {
    if (!start) start = timeMs;
    t = (timeMs - start) / 1000;
    ctx.fillStyle = "#07090c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    const cx = w / 2 + Math.sin(t * 1.6) * (Math.min(w, h) * 0.22);
    const cy = h * 0.42 + Math.cos(t * 0.9) * 8;

    ctx.beginPath();
    ctx.fillStyle = "rgba(240,193,78,0.06)";
    ctx.ellipse(cx, cy, 120, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#f6f3ec";
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#1a1a1a";
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "20px system-ui, -apple-system, 'Segoe UI', Roboto";
    ctx.textAlign = "center";
    ctx.fillText("MESSI EDIT — Demo", w / 2, 34);

    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.font = "13px system-ui, -apple-system, 'Segoe UI', Roboto";
    ctx.fillText("Minimal preview (static demo)", w / 2, 54);
    ctx.fillText("t = " + t.toFixed(2) + "s", w - 70, h - 18);

    if (running) raf = requestAnimationFrame(drawFrame);
  }

  function startAnim() {
    if (running) return;
    running = true;
    start = 0;
    raf = requestAnimationFrame(drawFrame);
  }
  function stopAnim() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  }

  playBtn.addEventListener("click", () => startAnim());
  pauseBtn.addEventListener("click", () => stopAnim());

  stopAnim();
  drawFrame(performance.now());
})();
