<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"/>
<style>
/* ── Fluid адаптив для любого устройства ── */
:root {
  --vw: 1vw;
  /* Fluid font: мин 13px на 320px, макс 17px на 480px+ */
  --fs-base:   clamp(13px, 3.5vw, 17px);
  --fs-sm:     clamp(10px, 2.8vw, 13px);
  --fs-xs:     clamp(9px,  2.4vw, 11px);
  --fs-lg:     clamp(16px, 4.5vw, 22px);
  --fs-xl:     clamp(20px, 5.5vw, 28px);
  --fs-2xl:    clamp(24px, 7vw,   36px);
  /* Fluid spacing */
  --sp-xs:  clamp(4px,  1.2vw, 8px);
  --sp-sm:  clamp(8px,  2.5vw, 14px);
  --sp-md:  clamp(12px, 3.5vw, 20px);
  --sp-lg:  clamp(16px, 4.5vw, 28px);
  /* Card */
  --card-r: clamp(14px, 4vw, 22px);
  /* Tablet max width */
  --app-w: min(100vw, 480px);
}
html, body { font-size: var(--fs-base); }
.app { max-width: var(--app-w); margin: 0 auto; }

/* Fluid grid карточек */
#mgrid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(clamp(140px,42vw,200px), 1fr)) !important;
  gap: var(--sp-sm) !important;
  padding: var(--sp-sm) var(--sp-md) !important;
}

/* Fluid nav */
.nav { max-width: var(--app-w) !important; }
.nb  { padding: clamp(8px,2.5vw,12px) 4px clamp(6px,2vw,10px) !important; }
.nico { font-size: clamp(20px,5.5vw,26px) !important; }
.nlbl { font-size: clamp(9px,2.5vw,11px) !important; }

/* Fluid back btn */
.back { width:clamp(34px,9vw,42px); height:clamp(34px,9vw,42px); font-size:clamp(17px,5vw,22px); }

/* --- Arena v31 Final Premium --- */
:root {
  --app-w: min(100vw, 450px);
  --glass: rgba(255, 255, 255, 0.06);
  --glass-border: rgba(255, 255, 255, 0.12);
  --accent: #7c5cff;
}

body {
  background: #000 !important;
  display: flex !important;
  justify-content: center !important;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif !important;
}

.app {
  width: var(--app-w) !important;
  max-width: var(--app-w) !important;
  background: #080810 !important;
  box-shadow: 0 0 100px #000 !important;
  min-height: 100dvh;
  position: relative !important;
  display: flex;
  flex-direction: column;
}

/* TON Icon */
.ton-icon-v31 {
    width: 16px; height: 16px; display: inline-block; vertical-align: middle;
    background: url('https://ton.org/download/ton_symbol.svg') center/contain no-repeat;
    margin-right: 4px;
}

/* Premium Banners */
.banner-container { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 0; padding: 15px 0 25px; scrollbar-width: none; scroll-behavior: smooth; }
.banner-card {
    flex: 0 0 calc(100% - 32px); margin: 0 16px; scroll-snap-align: center;
    background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(35px); -webkit-backdrop-filter: blur(35px);
    border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 26px; padding: 18px;
    display: flex; align-items: center; gap: 15px; box-sizing: border-box; height: 110px;
}
.banner-img { width: 70px; height: 70px; border-radius: 18px; object-fit: contain; background: rgba(0,0,0,0.3); }
.banner-title { font-size: 15px; font-weight: 700; color: #fff; line-height: 1.25; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.banner-tag { font-size: 8px; font-weight: 900; background: var(--accent); color: #fff; padding: 3px 8px; border-radius: 6px; margin-bottom: 5px; display: inline-block; }

/* Price Animation */
.price-box-v31 { margin-top: 8px; background: rgba(255,255,255,0.03); border-radius: 14px; padding: 10px; border: 1px solid rgba(255,255,255,0.05); transition: all 0.3s ease; }
.flash-up { animation: flashG 1s ease-out; }
.flash-hot { animation: flashGold 1.2s ease-out; }
@keyframes flashG { 0% { background: rgba(34, 212, 122, 0.2); } 100% { background: rgba(255,255,255,0.03); } }
@keyframes flashGold { 0% { background: rgba(240, 180, 41, 0.3); } 100% { background: rgba(255,255,255,0.03); } }

</style>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="theme-color" content="#080810"/>
<meta name="theme-color" content="#080810"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<title>CursorGift v3.1</title><!-- BUILD:2026-05-20-v3 -->
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
<script src="https://unpkg.com/@tonconnect/ui@latest/dist/tonconnect-ui.min.js"></script>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{background:#080810;color:#f0f0ff;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;font-size:15px;min-height:100dvh;overflow-x:hidden;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:0;height:0}
button{font-family:inherit;cursor:pointer;border:none;outline:none;background:none}
input{font-family:inherit;outline:none;border:none;background:none}
a{text-decoration:none}

/* ── АНИМАЦИИ ── */
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(124,92,255,.3)}50%{box-shadow:0 0 44px rgba(124,92,255,.75)}}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes priceUp{0%{background:transparent}40%{background:rgba(34,212,122,.2)}100%{background:transparent}}
@keyframes priceDown{0%{background:transparent}40%{background:rgba(255,77,106,.2)}100%{background:transparent}}
@keyframes confetti{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(140px) rotate(720deg);opacity:0}}
@keyframes bounce{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
@keyframes popIn{0%{transform:scale(0) rotate(-10deg);opacity:0}70%{transform:scale(1.1) rotate(3deg)}100%{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes onlinePulse{0%{transform:scale(1)}50%{transform:scale(1.2)}100%{transform:scale(1)}}

/* SPLASH анимации */
@keyframes giftReveal{
  0%  {opacity:0;transform:scale(.45) translateY(50px)}
  55% {opacity:1;transform:scale(1.08) translateY(-8px)}
  75% {transform:scale(.97) translateY(2px)}
  100%{opacity:1;transform:scale(1) translateY(0)}
}
@keyframes giftFloat{
  0%,100%{transform:translateY(0px) rotate(-1deg)}
  50%    {transform:translateY(-16px) rotate(1deg)}
}
@keyframes glowPulse{
  0%,100%{opacity:.4;transform:translate(-50%,-50%) scale(1)}
  50%    {opacity:.75;transform:translate(-50%,-50%) scale(1.12)}
}
@keyframes glowPulse2{
  0%,100%{opacity:.18;transform:translate(-50%,-50%) scale(1)}
  50%    {opacity:.35;transform:translate(-50%,-50%) scale(1.08)}
}
@keyframes titleFade{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}
@keyframes subFade{0%{opacity:0}100%{opacity:1}}
@keyframes loadBar{from{width:0}to{width:100%}}
@keyframes dotPulse{0%,80%,100%{opacity:.3;transform:scale(.7)}40%{opacity:1;transform:scale(1)}}
@keyframes cursorMove{
  0%  {opacity:0;transform:translate(85px,65px) scale(.65)}
  22% {opacity:1;transform:translate(85px,65px) scale(1)}
  62% {opacity:1;transform:translate(2px,2px) scale(1)}
  73% {opacity:1;transform:translate(2px,2px) scale(.76)}
  85% {opacity:1;transform:translate(2px,2px) scale(1.04)}
  100%{opacity:0;transform:translate(2px,2px) scale(1)}
}
@keyframes splashOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.07)}}
@keyframes marketIn{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:none}}

/* ── LAYOUT ── */
.app{display:flex;flex-direction:column;min-height:100dvh;width:100%;max-width:100%;margin:0}
.page{overflow-y:auto;padding-bottom:96px;min-height:100dvh}

/* ── FLOATING GLASS NAV ── */
.nav{position:fixed;bottom:calc(14px + env(safe-area-inset-bottom,0));left:50%;transform:translateX(-50%) translateY(0) scale(1);width:min(390px,calc(100% - 28px));z-index:9999;display:flex;align-items:center;justify-content:space-around;padding:6px;background:rgba(8,8,18,.34);-webkit-backdrop-filter:blur(40px) saturate(200%);backdrop-filter:blur(40px) saturate(200%);border-radius:26px;border:1px solid rgba(255,255,255,.08);box-shadow:0 20px 60px rgba(0,0,0,.45),0 8px 24px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.07),inset 0 -1px 0 rgba(255,255,255,.02);transition:transform .32s cubic-bezier(.4,0,.2,1),opacity .32s cubic-bezier(.4,0,.2,1),filter .32s cubic-bezier(.4,0,.2,1),box-shadow .8s ease,border-color .8s ease;will-change:transform,opacity;filter:drop-shadow(0 4px 18px rgba(124,92,255,.10));overflow:hidden}
.nav-tint{position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:0;background:radial-gradient(ellipse at 25% 50%,rgba(124,92,255,.10) 0%,transparent 70%),radial-gradient(ellipse at 75% 50%,rgba(77,159,255,.06) 0%,transparent 70%);transition:background .9s cubic-bezier(.4,0,.2,1)}
.nav-glow{position:absolute;bottom:-8px;left:12%;right:12%;height:36px;border-radius:50%;background:radial-gradient(ellipse,rgba(124,92,255,.14) 0%,transparent 70%);pointer-events:none;z-index:-1;transition:background .8s ease}
.nav-pill{position:absolute;top:6px;left:0;height:calc(100% - 12px);width:64px;border-radius:18px;pointer-events:none;z-index:0;opacity:1;transition:transform .42s cubic-bezier(.4,0,.12,1),width .42s cubic-bezier(.4,0,.12,1),opacity .3s ease;background:linear-gradient(135deg,rgba(124,92,255,.20),rgba(77,159,255,.10));box-shadow:inset 0 0 0 1px rgba(124,92,255,.22),0 6px 22px rgba(124,92,255,.16),0 2px 8px rgba(77,159,255,.08)}
.nav-pill::after{content:'';position:absolute;inset:0;border-radius:inherit;background:radial-gradient(ellipse at 30% 20%,rgba(255,255,255,.06) 0%,transparent 60%);pointer-events:none}
.nav-pill-line{position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:20px;height:3px;border-radius:2px;background:linear-gradient(90deg,transparent,rgba(124,92,255,.55),transparent);animation:pillPulse 2.8s ease-in-out infinite;pointer-events:none}
@keyframes pillPulse{0%,100%{opacity:.4;transform:translateX(-50%) scaleX(1)}50%{opacity:1;transform:translateX(-50%) scaleX(1.5)}}
.nav.nav-hidden{transform:translateX(-50%) translateY(130%) scale(.94);opacity:0;pointer-events:none;filter:drop-shadow(0 4px 18px rgba(124,92,255,0)) blur(2px);transition:transform .22s cubic-bezier(.4,0,1,1),opacity .22s cubic-bezier(.4,0,1,1),filter .22s cubic-bezier(.4,0,1,1)}
.nb{flex:1;min-width:64px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:8px 8px;border-radius:18px;cursor:pointer;position:relative;z-index:1;-webkit-user-select:none;user-select:none;transition:transform .22s ease;background:transparent;border:0;color:inherit}
.nb:active{transform:scale(.92)}
.npip{display:none!important}
.nico{font-size:22px;line-height:1;transition:transform .3s cubic-bezier(.34,1.56,.64,1),filter .3s ease;position:relative;z-index:1}
.nav-img{width:28px;height:28px;border-radius:8px;object-fit:cover;display:block;box-shadow:0 0 0 1px rgba(255,255,255,.08);image-rendering:auto}.nb.active .nav-img{box-shadow:0 0 0 1px rgba(90,255,180,.22),0 0 14px rgba(34,212,122,.18)}
.nlbl{font-size:10px;font-weight:600;letter-spacing:.2px;color:rgba(255,255,255,.35);transition:color .3s ease,transform .25s ease;position:relative;z-index:1;white-space:nowrap}
.nb.active .nico,.nico.on{transform:scale(1.15) translateY(-1px);filter:drop-shadow(0 3px 10px rgba(124,92,255,.55))}
.nb.active .nlbl{color:rgba(210,195,255,.95)}
.nb:not(.active):hover .nlbl{color:rgba(255,255,255,.52)}
.nb:not(.active):hover .nico{transform:scale(1.06)}

/* ── CARDS ── */
.gcard{border-radius:20px;cursor:pointer;position:relative;overflow:hidden;transition:transform .15s;display:flex;flex-direction:column;background:linear-gradient(160deg,rgba(22,18,40,.98),rgba(12,12,22,.99));border:1px solid rgba(255,255,255,.07);box-shadow:0 4px 20px rgba(0,0,0,.5)}
.gcard:active{transform:scale(.95)}
.shim{background:linear-gradient(90deg,rgba(255,255,255,.03) 25%,rgba(255,255,255,.07) 50%,rgba(255,255,255,.03) 75%);background-size:200% 100%;animation:shimmer 1.8s infinite}

/* ── PILLS ── */
.spill{padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;transition:all .18s;cursor:pointer;white-space:nowrap}
.spill.on{background:rgba(77,159,255,.15);border:1px solid rgba(77,159,255,.35);color:#4d9fff}
.spill.off{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);color:#404060}

/* ── MISC ── */
.back{width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:#f0f0ff;font-size:20px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.tabs{display:flex;border-bottom:1px solid rgba(255,255,255,.07);margin:0 16px}
.tab{flex:1;padding:11px 0;font-size:12px;font-weight:600;background:none;margin-bottom:-1px;cursor:pointer;transition:all .2s}
.online-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(34,212,122,.1);border:1px solid rgba(34,212,122,.25);border-radius:20px;padding:4px 10px}
.online-dot{width:6px;height:6px;border-radius:50%;background:#22d47a;animation:onlinePulse 2s infinite}
.avatar{border-radius:50%;object-fit:cover;border:2px solid rgba(124,92,255,.5)}
.avatar-ph{border-radius:50%;background:linear-gradient(135deg,#7c5cff,#4d9fff);display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;border:2px solid rgba(124,92,255,.5)}
.modal-overlay{position:fixed;inset:0;z-index:700;background:rgba(0,0,0,.85);backdrop-filter:blur(16px);display:flex;flex-direction:column;align-items:center;justify-content:flex-end;animation:fadeIn .2s ease}
.modal-sheet{background:linear-gradient(180deg,#12101e,#0a0a15);border-radius:24px 24px 0 0;width:100%;max-width:430px;padding:20px 20px 36px;border-top:1px solid rgba(255,255,255,.08)}
.conf{position:fixed;width:8px;height:8px;border-radius:2px;pointer-events:none;z-index:999;animation:confetti 1.2s ease-out forwards}
.toast{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:500;background:linear-gradient(135deg,rgba(124,92,255,.97),rgba(77,159,255,.97));border-radius:14px;padding:10px 18px;display:flex;align-items:center;gap:10px;box-shadow:0 8px 32px rgba(124,92,255,.5);animation:fadeIn .3s ease;backdrop-filter:blur(10px);white-space:nowrap}


/* ═══ CRT UPGRADE MACHINE / WHEEL ═══ */
.crt-page{min-height:100dvh;padding:12px 14px 112px;display:flex;flex-direction:column;align-items:center;background:radial-gradient(circle at 50% 0%,rgba(124,92,255,.16),transparent 32%),radial-gradient(circle at 12% 18%,rgba(77,159,255,.10),transparent 28%),linear-gradient(180deg,#090912 0%,#050508 100%);animation:fadeIn .28s ease;background:linear-gradient(160deg,#0a0818 0%,#060612 40%,#0a0a1a 100%);position:relative;overflow:hidden}
.crt-top{display:flex;align-items:center;gap:12px;margin-bottom:10px;width:min(82vw,340px)}.crt-top h1{font-size:18px;font-weight:950;letter-spacing:-.4px}.crt-top p{font-size:10px;color:#68708f;margin-top:2px}.crt-live{margin-left:auto;display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;background:rgba(34,212,122,.08);border:1px solid rgba(34,212,122,.22);font-size:10px;color:#22d47a;font-weight:800}.crt-live::before{content:'';width:6px;height:6px;border-radius:50%;background:#22d47a;box-shadow:0 0 10px #22d47a;animation:pulse 1.6s infinite}
.crt-machine{position:relative;margin:2px auto 16px;width:min(82vw,340px);perspective:900px}.crt-monitor{position:relative;padding:20px 18px 26px;border-radius:34px 34px 28px 28px;background:linear-gradient(145deg,#35313a 0%,#17171d 42%,#0a0a0e 100%);border:1px solid rgba(255,255,255,.10);box-shadow:0 34px 80px rgba(0,0,0,.72),inset 0 2px 0 rgba(255,255,255,.09),inset 0 -18px 38px rgba(0,0,0,.48);transform:rotateX(.8deg)}
.crt-monitor::before{content:'';position:absolute;inset:8px 10px auto;height:34px;border-radius:28px;background:linear-gradient(180deg,rgba(255,255,255,.08),transparent);pointer-events:none}.crt-brand{position:absolute;left:50%;bottom:6px;transform:translateX(-50%);font-size:9px;font-weight:900;letter-spacing:2px;color:rgba(255,255,255,.18)}.crt-led{position:absolute;right:24px;bottom:9px;width:8px;height:8px;border-radius:50%;background:#22d47a;box-shadow:0 0 12px #22d47a}.crt-vents{position:absolute;left:24px;bottom:10px;display:flex;gap:4px}.crt-vents i{display:block;width:16px;height:3px;border-radius:3px;background:rgba(0,0,0,.38);box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}
.crt-screen{position:relative;height:clamp(382px,58vh,468px);min-height:clamp(382px,58vh,468px);max-height:clamp(382px,58vh,468px);border-radius:30px / 42px;overflow:hidden;background:radial-gradient(ellipse at 50% 45%,#102419 0%,#07110d 52%,#020403 100%);border:10px solid #050507;box-shadow:inset 0 0 0 1px rgba(90,255,190,.10),inset 0 0 34px rgba(0,0,0,.85),inset 0 0 80px rgba(20,255,160,.08),0 0 0 1px rgba(255,255,255,.07);transform:translateZ(0)}
.crt-screen::before{content:'';position:absolute;inset:0;z-index:6;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(255,255,255,.045) 0 1px,transparent 1px 4px);mix-blend-mode:overlay;opacity:.55}.crt-screen::after{content:'';position:absolute;inset:-16px;z-index:7;pointer-events:none;border-radius:38px / 54px;background:radial-gradient(ellipse at 50% 50%,transparent 48%,rgba(0,0,0,.35) 75%,rgba(0,0,0,.86) 100%),linear-gradient(90deg,rgba(255,255,255,.035),transparent 18%,transparent 82%,rgba(255,255,255,.035));box-shadow:inset 0 0 42px rgba(0,0,0,.75)}
.crt-content{position:relative;z-index:2;height:100%;min-height:0;padding:18px 16px;color:#baffdd;overflow-y:auto;scrollbar-width:none;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;text-shadow:0 0 8px rgba(34,212,122,.42)}.crt-content::-webkit-scrollbar{display:none}.crt-noise{position:absolute;inset:0;z-index:1;pointer-events:none;opacity:.10;background-image:radial-gradient(circle at 20% 30%,#fff 0 1px,transparent 1px),radial-gradient(circle at 70% 60%,#fff 0 1px,transparent 1px),radial-gradient(circle at 40% 80%,#fff 0 1px,transparent 1px);background-size:19px 17px,23px 21px,29px 31px;animation:crtNoise .22s steps(2) infinite}.crt-static .crt-noise{opacity:.62;filter:contrast(3) brightness(1.55);background-size:7px 5px,11px 9px,13px 15px;animation:crtNoise .055s steps(2) infinite}.crt-static .crt-content{animation:crtJitter .08s steps(2) infinite;filter:contrast(1.18) brightness(1.1)}.crt-off .crt-content{opacity:.16;filter:brightness(.45)}.crt-off .crt-noise{opacity:.03}.crt-offline{position:absolute;inset:0;z-index:8;pointer-events:none;background:radial-gradient(ellipse at center,rgba(255,255,255,.10),transparent 8%,rgba(0,0,0,.92) 52%);animation:crtPowerDown 1.15s ease forwards}
@keyframes crtNoise{0%{transform:translate(0,0)}25%{transform:translate(-2px,1px)}50%{transform:translate(1px,-1px)}75%{transform:translate(2px,2px)}100%{transform:translate(-1px,0)}}@keyframes crtJitter{0%,100%{transform:translate(0)}50%{transform:translate(1px,-1px)}}@keyframes crtPowerDown{0%{clip-path:inset(0 0 0 0);opacity:0}45%{clip-path:inset(42% 0 42% 0);opacity:.75}100%{clip-path:inset(50% 0 50% 0);opacity:1}}
.crt-stand{width:120px;height:36px;margin:-6px auto 0;background:linear-gradient(180deg,#17171d,#07070a);border-radius:0 0 18px 18px;border:1px solid rgba(255,255,255,.06);box-shadow:0 20px 35px rgba(0,0,0,.55)}.crt-base{width:210px;height:22px;margin:-2px auto 0;border-radius:50%;background:radial-gradient(ellipse,#23212a 0%,#09090d 70%);box-shadow:0 22px 45px rgba(0,0,0,.65)}
.crt-line{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:10px}.crt-kicker{font-size:10px;font-weight:900;letter-spacing:1.5px;color:#5affb4}.crt-terminal-title{font-size:22px;font-weight:950;line-height:1.05;letter-spacing:-1px;color:#d8ffe9;text-shadow:0 0 18px rgba(34,212,122,.5)}.crt-terminal-sub{font-size:11px;line-height:1.55;color:rgba(186,255,221,.66);margin-top:8px}.crt-status{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(90,255,180,.18);background:rgba(20,255,140,.06);border-radius:10px;padding:5px 8px;font-size:9px;font-weight:900;color:#7dffc2}.crt-status.err{border-color:rgba(255,77,106,.28);background:rgba(255,77,106,.08);color:#ff91a4}.crt-status.warn{border-color:rgba(240,180,41,.28);background:rgba(240,180,41,.08);color:#ffd36b}
.crt-inv{display:flex;gap:9px;overflow-x:auto;padding:10px 2px 4px;scrollbar-width:none}.crt-inv::-webkit-scrollbar{display:none}.crt-gift{flex:0 0 102px;border-radius:16px;padding:10px 8px;background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.025));border:1px solid rgba(255,255,255,.08);box-shadow:0 10px 30px rgba(0,0,0,.28);cursor:pointer;transition:transform .18s,border-color .18s,box-shadow .18s}.crt-gift:active{transform:scale(.96)}.crt-gift.on{border-color:rgba(90,255,180,.55);box-shadow:0 0 0 1px rgba(90,255,180,.18),0 0 26px rgba(34,212,122,.18)}.crt-gift-img{width:58px;height:58px;margin:0 auto 7px;border-radius:14px;background:radial-gradient(circle,rgba(124,92,255,.22),rgba(0,0,0,.22));display:flex;align-items:center;justify-content:center;overflow:hidden;font-size:30px}.crt-gift-img img{width:100%;height:100%;object-fit:contain}.crt-gift-name{font-size:10px;font-weight:900;color:#eef;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}.crt-gift-price{font-size:10px;color:#f0b429;font-weight:950;text-align:center;margin-top:3px}.crt-panel{width:min(82vw,340px);margin:14px auto 0;padding:14px;border-radius:20px;background:linear-gradient(160deg,rgba(18,18,30,.72),rgba(8,8,14,.86));border:1px solid rgba(255,255,255,.08);box-shadow:0 12px 32px rgba(0,0,0,.38)}.crt-panel-title{font-size:11px;color:#8a88b8;font-weight:900;letter-spacing:.8px;margin-bottom:9px}.crt-targets{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:12px}.crt-target{border-radius:14px;padding:9px;background:rgba(0,0,0,.24);border:1px solid rgba(90,255,180,.12);cursor:pointer;transition:transform .16s,border-color .16s,background .16s}.crt-target:active{transform:scale(.96)}.crt-target:hover,.crt-target.on{border-color:rgba(90,255,180,.48);background:rgba(34,212,122,.07)}.crt-target-row{display:flex;align-items:center;gap:8px}.crt-target img{width:38px;height:38px;object-fit:contain;border-radius:10px;background:rgba(255,255,255,.04)}.crt-target-name{font-size:10px;font-weight:950;color:#eafff2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.crt-target-price{font-size:10px;color:#ffd36b;font-weight:950}.crt-chance{margin-top:14px;border-radius:16px;background:rgba(0,0,0,.32);border:1px solid rgba(255,255,255,.07);padding:11px}.crt-meter{height:16px;border-radius:999px;background:rgba(255,77,106,.16);overflow:hidden;border:1px solid rgba(255,255,255,.08);box-shadow:inset 0 2px 8px rgba(0,0,0,.45)}.crt-meter-fill{height:100%;border-radius:inherit;background:linear-gradient(90deg,#22d47a,#a8ff78,#f0b429);box-shadow:0 0 18px rgba(34,212,122,.35)}.crt-upgrade-btn{width:100%;margin-top:12px;padding:12px;border-radius:14px;background:linear-gradient(135deg,#22d47a,#4d9fff);color:#00130a;font-size:12px;font-weight:950;border:0;box-shadow:0 10px 30px rgba(34,212,122,.24);cursor:pointer}.crt-upgrade-btn:active{transform:scale(.98)}.crt-upgrade-btn:disabled{opacity:.45;filter:grayscale(1);pointer-events:none}
.crt-roulette{position:relative;height:120px;margin-top:15px;border-radius:18px;overflow:hidden;background:linear-gradient(180deg,rgba(0,0,0,.42),rgba(0,0,0,.22));border:1px solid rgba(90,255,180,.16)}.crt-win-zone{position:absolute;top:0;bottom:0;left:50%;width:78px;transform:translateX(-50%);z-index:5;border-left:2px solid #22d47a;border-right:2px solid #22d47a;background:linear-gradient(90deg,transparent,rgba(34,212,122,.16),transparent);box-shadow:0 0 24px rgba(34,212,122,.25)}.crt-win-zone::before{content:'WIN ZONE';position:absolute;top:6px;left:50%;transform:translateX(-50%);font-size:8px;font-weight:950;color:#72ffc0;white-space:nowrap}.crt-tape{position:absolute;left:0;top:26px;height:76px;display:flex;gap:0;transition:transform 4.15s cubic-bezier(.08,.72,.04,1);will-change:transform}.crt-cell{width:72px;height:76px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-right:1px solid rgba(255,255,255,.05)}.crt-cell img{width:42px;height:42px;object-fit:contain;border-radius:10px;background:rgba(255,255,255,.04)}.crt-cell div{font-size:8px;color:#baffdd;max-width:62px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:4px}.crt-result{min-height:250px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.crt-result-icon{font-size:54px;filter:drop-shadow(0 0 22px currentColor);margin-bottom:14px}.crt-result-title{font-size:23px;font-weight:950;letter-spacing:-.8px}.crt-result-title.win{color:#74ffbd}.crt-result-title.lose{color:#ff6b82}.crt-result-sub{font-size:11px;color:rgba(186,255,221,.62);line-height:1.6;margin-top:8px;max-width:260px}.crt-actions{display:flex;gap:10px;margin:14px auto;width:min(82vw,340px)}.crt-actions button{flex:1;padding:12px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.06);color:#e8e8ff;font-size:12px;font-weight:900}.crt-actions button.primary{background:linear-gradient(135deg,#7c5cff,#4d9fff);color:#fff;border:0}.crt-wheelbox{position:relative;width:min(300px,82vw);height:min(300px,82vw);max-width:300px;max-height:300px;margin:12px auto 8px;border-radius:50%;filter:drop-shadow(0 0 24px rgba(34,212,122,.12))}.crt-dial{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(90,255,180,.22);box-shadow:inset 0 0 26px rgba(0,0,0,.72),0 0 0 8px rgba(0,0,0,.18);overflow:hidden}.crt-dial::before{content:'';position:absolute;inset:18px;border-radius:50%;background:radial-gradient(circle,#07110d 0%,#020403 70%);border:1px solid rgba(90,255,180,.14);box-shadow:inset 0 0 22px rgba(0,0,0,.8);z-index:2}.crt-dial::after{content:'WIN';position:absolute;top:13px;left:50%;transform:translateX(-50%);z-index:3;font-size:9px;font-weight:950;color:#03150a;background:#70ffb7;border-radius:999px;padding:3px 8px;box-shadow:0 0 12px rgba(34,212,122,.55)}.crt-needle{position:absolute;inset:0;z-index:5;transition:transform 6.8s cubic-bezier(.08,.72,.04,1);will-change:transform}.crt-needle::before{content:'';position:absolute;left:50%;top:50%;width:4px;height:102px;background:linear-gradient(180deg,#ffed8a,#ff4d6a);border-radius:8px;transform:translate(-50%,-100%);box-shadow:0 0 14px rgba(255,77,106,.55)}.crt-needle::after{content:'';position:absolute;left:50%;top:50%;width:18px;height:18px;border-radius:50%;background:#f4f2ff;transform:translate(-50%,-50%);box-shadow:0 0 18px rgba(255,255,255,.35);border:3px solid #0a0a10}.crt-wheel-legend{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:8px}.crt-wheel-legend span{font-size:9px;font-weight:900;border-radius:999px;padding:4px 8px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04)}.crt-spin-caption{text-align:center;font-size:10px;color:#7dffc2;margin-top:8px;line-height:1.5}.crt-off .crt-result{opacity:.18;filter:brightness(.55)}.crt-fade .crt-content{animation:crtSlowFade 2.6s ease forwards}.crt-fade .crt-noise{opacity:.22;animation:crtNoise .08s steps(2) infinite}@keyframes crtSlowFade{0%{opacity:1;filter:brightness(1)}55%{opacity:.58;filter:brightness(.72) saturate(.8)}100%{opacity:.10;filter:brightness(.22) saturate(.2)}}.crt-empty{padding:20px;text-align:center}.crt-empty .big{font-size:42px;margin-bottom:10px}.crt-empty h3{font-size:17px;margin-bottom:6px}.crt-empty p{font-size:12px;color:#7d86a6;line-height:1.6}.crt-connect{margin-top:14px;padding:12px 18px;border-radius:14px;background:linear-gradient(135deg,#4d9fff,#7c5cff);color:#fff;font-weight:950;font-size:12px}

</style>
</head>
<body>
<div class="app">

<!-- ═══ SPLASH ═══ -->
<div id="splash" style="position:fixed;inset:0;z-index:999;background:linear-gradient(135deg,#f0eeff 0%,#ffffff 50%,#e8f4ff 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;">

  <!-- Фоновые частицы -->
  <div id="splash-particles" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;"></div>

  <!-- Планшет -->
  <div id="splash-tablet" style="position:relative;width:280px;height:200px;transform:scale(0.85);opacity:0;transition:none;">
    
    <!-- Корпус планшета -->
    <div style="position:absolute;inset:0;background:linear-gradient(145deg,#2a2a3a,#1a1a28);border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.25),0 4px 12px rgba(0,0,0,.15),inset 0 1px 0 rgba(255,255,255,.1);">
      
      <!-- Камера -->
      <div style="position:absolute;top:8px;left:50%;transform:translateX(-50%);width:6px;height:6px;background:#111;border-radius:50%;box-shadow:0 0 0 1px #333;"></div>
      
      <!-- Экран планшета -->
      <div id="tablet-screen" style="position:absolute;top:16px;left:8px;right:8px;bottom:8px;background:#f8f8ff;border-radius:12px;overflow:hidden;">
        
        <!-- Топбар внутри экрана -->
        <div style="padding:8px 10px 4px;background:#fff;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between;">
          <div style="font-size:9px;font-weight:800;color:#1a1a2e;letter-spacing:-.3px;">Cursor Market</div>
          <div style="display:flex;align-items:center;gap:4px;">
            <div style="width:5px;height:5px;border-radius:50%;background:#22d47a;box-shadow:0 0 4px #22d47a;"></div>
            <div style="font-size:7px;color:#22d47a;font-weight:700;">LIVE</div>
          </div>
        </div>
        
        <!-- Скролл-контейнер карточек -->
        <div id="tablet-scroll" style="display:flex;flex-wrap:wrap;gap:4px;padding:6px;overflow:hidden;height:calc(100% - 28px);">
          <!-- Карточки появятся динамически -->
        </div>
      </div>
    </div>
  </div>

  <!-- Подарки которые летят -->
  <div id="flying-gifts" style="position:absolute;inset:0;pointer-events:none;"></div>

  <!-- Лого и статус снизу -->
  <div id="splash-bottom" style="position:absolute;bottom:60px;left:0;right:0;text-align:center;opacity:0;transition:opacity .4s;">
    <div style="font-size:22px;font-weight:900;color:#1a1a2e;letter-spacing:-.5px;margin-bottom:4px;">Cursor Market</div>
    <div style="font-size:12px;color:#7c3aed;font-weight:600;letter-spacing:.3px;">Telegram Gifts Market</div>
    <div id="splash-status" style="font-size:11px;color:#9ca3af;margin-top:8px;">Загружаем рынок...</div>
  </div>

</div>

<!-- ═══ APP ═══ -->
<div id="main" style="display:none;flex:1;flex-direction:column;width:100%">
  <div class="page" id="pg-market"></div>
  <div class="page" id="pg-news" style="display:none"></div>
  <div class="page" id="pg-prof" style="display:none"></div>
  <div class="page" id="pg-detail" style="display:none"></div>
  <div class="page" id="pg-wheel" style="display:none"></div>

  <nav class="nav" id="bottomNav">
    <div class="nav-tint" id="navTint"></div>
    <div class="nav-glow" id="navGlow"></div>
    <div class="nav-pill" id="navPill"><div class="nav-pill-line"></div></div>

    <button class="nb active" data-tab="market" onclick="go('market')">
      <div class="npip" id="pip-market"></div>
      <span class="nico on" id="ico-market">🏪</span>
      <span class="nlbl" id="lbl-market">Рынок</span>
    </button>
    <button class="nb" data-tab="news" onclick="go('news')">
      <div class="npip" id="pip-news"></div>
      <span class="nico" id="ico-news">📰</span>
      <span class="nlbl" id="lbl-news">Новости</span>
    </button>
    <button class="nb" data-tab="wheel" onclick="go('wheel')">
      <div class="npip" id="pip-wheel"></div>
      <img class="nico nav-img" id="ico-wheel" src="upgrade-pepe.jpg" alt="Апгрейд" onerror="this.outerHTML='<span class=&quot;nico&quot; id=&quot;ico-wheel&quot;>📺</span>'">
      <span class="nlbl" id="lbl-wheel">Апгрейд</span>
    </button>
    <button class="nb" data-tab="prof" onclick="go('prof')">
      <div class="npip" id="pip-prof"></div>
      <span class="nico" id="ico-prof">👤</span>
      <span class="nlbl" id="lbl-prof">Профиль</span>
    </button>
  </nav>
</div>
</div>

<script>
'use strict';

// ═══ CONFIG ═══
const PROXY_HTTP = 'https://web-production-ad0c.up.railway.app';
const PROXY_WS   = 'wss://web-production-ad0c.up.railway.app';

// ═══ TELEGRAM USER ═══
const tg = window.Telegram?.WebApp;
let TG_USER = null;

// ═══ TON WALLET / USER GIFTS ═══
const TONCONNECT_MANIFEST = 'https://stepik-tech.github.io/market/tonconnect-manifest.json';
let tonConnectUI = null;
let walletAddress = localStorage.getItem('cg_wallet_address') || '';
let walletBalance = 0;
let walletGifts = [];
let walletLoading = false;
let walletLastUpdate = 0;


let bannerInterval = null;
let lastInteraction = 0;

function initBannerAutoScroll() {
    if(bannerInterval) clearInterval(bannerInterval);
    const container = document.querySelector('.banner-container');
    if(!container) return;
    container.addEventListener('touchstart', () => { lastInteraction = Date.now(); }, {passive: true});
    bannerInterval = setInterval(() => {
        if(curTab !== 'market' || (Date.now() - lastInteraction < 8000)) return;
        const banners = container.querySelectorAll('.banner-card');
        if (banners.length <= 1) return;
        let currentIndex = Math.round(container.scrollLeft / container.offsetWidth);
        let nextIndex = (currentIndex + 1) % banners.length;
        container.scrollTo({left: banners[nextIndex].offsetLeft - 16, behavior: 'smooth'});
    }, 5000);
}

function animateValue(id, start, end) {
    if (start === end) return;
    const obj = document.getElementById(id);
    if (!obj) return;
    const duration = 600;
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const val = (start + progress * (end - start)).toFixed(2);
        obj.innerHTML = `<i class="ton-icon-v31"></i>${val}`;
        if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

function getLatestNews() {
    const news = [];
    const topUp = [...GIFTS].sort((a,b)=>(prices[b.slug]?.change24h||0)-(prices[a.slug]?.change24h||0))[0];
    if(topUp && (prices[topUp.slug]?.change24h||0) > 5) {
        news.push({ id:'up', slug: topUp.slug, tag:'ВЗЛЕТ ЦЕНЫ', color:'#22d47a', title: `${topUp.name} +${prices[topUp.slug].change24h}%!`, source:'Fragment' });
    }
    const topDown = [...GIFTS].sort((a,b)=>(prices[a.slug]?.change24h||0)-(prices[b.slug]?.change24h||0))[0];
    if(topDown && (prices[topDown.slug]?.change24h||0) < -5) {
        news.push({ id:'down', slug: topDown.slug, tag:'ДИСКОНТ', color:'#ff4d6a', title: `Падение ${topDown.name} на ${Math.abs(prices[topDown.slug].change24h)}%`, source:'Portal' });
    }
    if(news.length < 2) news.push({ id:'ok', slug:'snoopdogg', tag:'LIVE', color:'#7c5cff', title: 'Cursor Market: Мониторинг спроса активен', source:'System' });
    return news;
}

function buildAvatar(user, size = 64) {
    const color = user?.color || '#7c5cff';
    const photo = user?.photo || user?.avatar;
    const initials = user?.initials || '?';
    if (photo) return `<div style="width:${size}px;height:${size}px;border-radius:50%;border:2px solid rgba(255,255,255,0.1);overflow:hidden;display:inline-block;vertical-align:middle;"><img src="${photo}" style="width:100%;height:100%;object-fit:cover;" onerror="this.parentElement.innerHTML='${initials}'"></div>`;
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(135deg,${color},${color}99);display:flex;align-items:center;justify-content:center;font-size:${size/2.5}px;font-weight:900;color:#fff;border:2px solid rgba(255,255,255,0.1);display:inline-block;vertical-align:middle;line-height:${size}px;text-align:center;">${initials}</div>`;
}

function initTgUser() {
  if (tg) {
    try { tg.ready(); } catch(e){}
    try { tg.expand(); } catch(e){}
    // iOS Telegram: requestFullscreen только если поддерживается
    try { if(tg.requestFullscreen) tg.requestFullscreen(); } catch(e){}
    try { tg.enableClosingConfirmation(); } catch(e){}
    
    const u = tg.initDataUnsafe?.user;
    if (u && u.id) {
      const firstName = String(u.first_name || '').trim();
      const lastName = String(u.last_name || '').trim();
      const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Пользователь';
      const initials = ((firstName[0]||'')+(lastName[0]||'')).toUpperCase() || (fullName[0]||'?').toUpperCase();
      const username = u.username ? '@' + String(u.username).replace(/^@+/, '') : '';
      
      TG_USER = {
        id: u.id,                         // Telegram ID для UI и WebSocket
        tgId: String(u.id),
        firstName,
        lastName,
        name: fullName,
        username,
        displayUsername: username || 'Без username',
        photo: u.photo_url || null,
        avatar: u.photo_url || null,
        isPremium: Boolean(u.is_premium),
        initials: initials.slice(0,2),
        initData: tg.initData || '',
        isGuest: false,
        // Генерируем цвет аватара по id если нет фото
        color: ['#7c5cff','#ff6eb4','#4d9fff','#22d47a','#f0b429','#ff4d6a'][Number(u.id) % 6]
      };
    }
  }
  if (!TG_USER || !TG_USER.id) {
    TG_USER = { id:0, tgId:'0', firstName:'', lastName:'', name:'Гость', username:'', displayUsername:'Без username', photo:null, avatar:null, isPremium:false, initials:'?', initData:'', isGuest:true, color:'#7c5cff' };
  }
  const el = document.getElementById('splash-user');
  if (el && TG_USER.id) el.textContent = 'Привет, ' + TG_USER.name + '! 👋';
}


// ═══ SPLASH LOGIC ═══
let splashReady = false, splashDone = false;

function splashClick() {
  if (splashDone) return;
  splashDone = true;
  const logo = document.getElementById('splash-logo-wrap');
  if (logo) { logo.style.transition = 'transform .1s'; logo.style.transform = 'scale(.86)'; setTimeout(()=>logo.style.transform='scale(1)',100); }
  const splash = document.getElementById('splash');
  if (splash) {
    splash.style.transition = 'opacity .42s ease, transform .42s ease';
    setTimeout(() => {
      splash.style.opacity = '0'; splash.style.transform = 'scale(1.06)';
      setTimeout(() => {
        splash.style.display = 'none';
        const main = document.getElementById('main');
        main.style.display = 'flex';
        main.style.opacity = '1';
        main.style.transform = 'none';
        main.style.animation = 'marketIn .5s ease forwards';
        // Важно: transform на родителе ломает position:fixed у нижней панели в Telegram WebView.
        // После входной анимации полностью убираем animation/transform, чтобы nav всегда был fixed к экрану.
        setTimeout(()=>{
          if (main) { main.style.animation = 'none'; main.style.transform = 'none'; }
          requestAnimationFrame(()=>moveNavPill(curTab));
        }, 560);
        go('market');
      }, 400);
    }, 110);
  }
}

function scheduleSplashAutoClick() {
  setTimeout(() => { if (!splashDone && splashReady) splashClick(); else if (!splashDone) setTimeout(()=>{ if(!splashDone) splashClick(); }, 2000); }, 3200);
}

// ═══ STATE ═══
let GIFTS = [], prices = {}, histories = {}, tonUsd = 2.0;
let onlineCount = 0, onlineUsers = [];
let curTab = 'market', detailSlug = null, wheelTarget = null;
let mSort = 'vol24h', mQuery = '', detailPeriod = 24;
let lotties = {}, countdown = 20, ws = null;
const nftAttrsData = {};

// ═══ FLOATING GLASS NAV UI ═══
const NAV_TINTS = {
  market:[124,92,255],
  news:[77,159,255],
  wheel:[255,110,180],
  prof:[160,128,255],
  detail:[124,92,255]
};
let navHideTimer = null;
let navTouchY = null;
let navAutoHideBound = false;

function getNav(){ return document.getElementById('bottomNav') || document.querySelector('.nav'); }
function setNavHidden(hidden){
  const nav = getNav();
  if (!nav) return;
  nav.classList.toggle('nav-hidden', Boolean(hidden));
}
function showNav(delay=0){
  clearTimeout(navHideTimer);
  if (delay > 0) navHideTimer = setTimeout(()=>setNavHidden(false), delay);
  else setNavHidden(false);
}
function hideNavWhileMoving(){
  setNavHidden(true);
  clearTimeout(navHideTimer);
  navHideTimer = setTimeout(()=>setNavHidden(false), 560);
}
function moveNavPill(tabName=curTab){
  const nav = getNav();
  const pill = document.getElementById('navPill');
  if (!nav || !pill) return;
  const btn = nav.querySelector(`.nb[data-tab="${tabName}"]`);
  if (!btn) { pill.style.opacity = '0'; return; }
  const navRect = nav.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  if (!navRect.width || !btnRect.width) return;
  pill.style.opacity = '1';
  pill.style.width = btnRect.width + 'px';
  pill.style.transform = 'translateX(' + (btnRect.left - navRect.left) + 'px)';
}
function setNavTint(r,g,b){
  const nav=getNav(), tint=document.getElementById('navTint'), glow=document.getElementById('navGlow'), pill=document.getElementById('navPill');
  if (!nav || !tint || !glow || !pill) return;
  tint.style.background = `radial-gradient(ellipse at 20% 50%,rgba(${r},${g},${b},.14) 0%,transparent 65%),radial-gradient(ellipse at 80% 50%,rgba(${r},${g},${b},.08) 0%,transparent 65%)`;
  glow.style.background = `radial-gradient(ellipse,rgba(${r},${g},${b},.16) 0%,transparent 70%)`;
  nav.style.filter = `drop-shadow(0 4px 20px rgba(${r},${g},${b},.14))`;
  nav.style.borderColor = `rgba(${r},${g},${b},.10)`;
  nav.style.boxShadow = `0 20px 60px rgba(0,0,0,.42),0 8px 24px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.07),inset 0 -1px 0 rgba(255,255,255,.02),0 0 0 .5px rgba(${r},${g},${b},.08)`;
  pill.style.background = `linear-gradient(135deg,rgba(${r},${g},${b},.22) 0%,rgba(${r},${g},${b},.08) 100%)`;
  pill.style.boxShadow = `inset 0 0 0 1px rgba(${r},${g},${b},.22),0 6px 22px rgba(${r},${g},${b},.16),0 2px 8px rgba(${r},${g},${b},.08)`;
  const line = pill.querySelector('.nav-pill-line');
  if (line) line.style.background = `linear-gradient(90deg,transparent,rgba(${r},${g},${b},.55),transparent)`;
}
function setNavTintFor(tab){
  const c = NAV_TINTS[tab] || NAV_TINTS.market;
  setNavTint(c[0],c[1],c[2]);
}
function updateNavActive(tab){
  const nav=getNav();
  if (!nav) return;
  nav.querySelectorAll('.nb').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab));
  requestAnimationFrame(()=>moveNavPill(tab));
  setNavTintFor(tab);
}
function bindFloatingNavAutoHide(){
  if (navAutoHideBound) return;
  navAutoHideBound = true;
  const opts = { passive:true };
  const bind = el => {
    if (!el || el.__cgNavBound) return;
    el.__cgNavBound = true;
    el.addEventListener('scroll', hideNavWhileMoving, opts);
    el.addEventListener('wheel', hideNavWhileMoving, opts);
    el.addEventListener('touchstart', e => { navTouchY = e.touches?.[0]?.clientY ?? null; }, opts);
    el.addEventListener('touchmove', e => {
      const y = e.touches?.[0]?.clientY ?? null;
      if (navTouchY === null || y === null || Math.abs(y-navTouchY) > 2) hideNavWhileMoving();
      navTouchY = y;
    }, opts);
    el.addEventListener('touchend', ()=>showNav(360), opts);
  };
  document.querySelectorAll('.page').forEach(bind);
  bind(window);
  const nav=getNav();
  if (nav) nav.addEventListener('click', ()=>{ showNav(); requestAnimationFrame(()=>moveNavPill(curTab)); }, opts);
  window.addEventListener('resize', ()=>requestAnimationFrame(()=>moveNavPill(curTab)), opts);
  requestAnimationFrame(()=>{ updateNavActive(curTab); showNav(); });
}


const thumb  = s => `https://fragment.com/file/gifts/${s}/thumb.webp`;
const lottieUrl = (s,n) => `https://nft.fragment.com/gift/${s}-${n}.lottie.json`;
const nftImg = (s,n) => `https://nft.fragment.com/gift/${s}-${n}.webp`;
function getCardImg(g) { return (g.photo && g.photo.includes('storage.portal-market')) ? g.photo : thumb(g.slug); }

// ═══ WEBSOCKET ═══
function connectWS() {
  try {
    ws = new WebSocket(PROXY_WS);
    ws.onopen = () => {
      if (TG_USER?.id) {
        const ping = () => ws.readyState===1 && ws.send(JSON.stringify({type:'ping',userId:TG_USER.id,name:TG_USER.name,avatar:TG_USER.photo}));
        ping(); setInterval(ping, 25000);
      }
    };
    ws.onmessage = e => {
      try {
        const m = JSON.parse(e.data);
        if (m.type==='online') {
          onlineCount=m.count; onlineUsers=m.users||[];
          document.querySelectorAll('.online-count').forEach(el=>el.textContent=onlineCount);
        }
        if (m.type==='prices') {
          // Реальное обновление с WS — обновляем цены и мини-графики
          m.ton_usd && (tonUsd=m.ton_usd);
          const wasCount=GIFTS.length, oldSlugs=new Set(GIFTS.map(g=>g.slug));
          (m.collections||[]).forEach(c=>{
            const prev=prices[c.slug]?.floor;
            prices[c.slug]={floor:c.floor,change24h:c.change24h,vol24h:c.vol24h,listed:c.listed,supply:c.supply,sales24h:c.sales24h,marketCap:c.marketCap,prevFloor:prev||c.floor,updated:Date.now()};
            if(!histories[c.slug])histories[c.slug]=[];
            histories[c.slug].push({time:Date.now(),price:c.floor});
            if(histories[c.slug].length>8640)histories[c.slug].shift();
          });
          GIFTS=(m.collections||[]).map(c=>({slug:c.slug,name:c.name,photo:c.portalPhoto||thumb(c.slug),tg_id:1,isNew:!oldSlugs.has(c.slug)&&wasCount>0}));
          
    GIFTS.forEach(g => {
        const p = prices[g.slug];
        if (!p) return;
        const priceEl = document.getElementById(`pr-${g.slug}`);
        const boxEl = document.getElementById(`box-${g.slug}`);
        if (priceEl && boxEl) {
            const oldPrice = parseFloat(priceEl.innerText.replace(/[^0-9.]/g, '')) || 0;
            if (oldPrice !== p.floor) {
                animateValue(`pr-${g.slug}`, oldPrice, p.floor);
                boxEl.classList.remove('flash-up', 'flash-hot');
                void boxEl.offsetWidth;
                boxEl.classList.add(p.hotSale ? 'flash-hot' : 'flash-up');
            }
        }
    });
    updatePriceDom();

          countdown=20;
        }
      } catch(e){}
    };
    ws.onclose = () => setTimeout(connectWS, 5000);
    ws.onerror = () => ws.close();
  } catch(e) {}
}

// ═══ SAVE PROFILE ═══
async function saveProfile() {
  if (!TG_USER?.id || TG_USER.isGuest) return null;
  try {
    const payload = {
      tgId: TG_USER.tgId || String(TG_USER.id),
      firstName: TG_USER.firstName || '',
      lastName: TG_USER.lastName || '',
      name: TG_USER.name || 'Пользователь',
      username: TG_USER.username || '',
      avatar: TG_USER.photo || TG_USER.avatar || null,
      isPremium: Boolean(TG_USER.isPremium),
      initData: TG_USER.initData || tg?.initData || '',
      walletAddress: walletAddress || null,
      walletBalance: Number(walletBalance || 0),
      gifts: walletGifts.map(g=>({address:g.address,name:g.name,image:g.image,collection:g.collection,url:g.url})).slice(0,100)
    };
    const r = await fetch(PROXY_HTTP+'/api/profile',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
        ...(payload.initData ? {'X-Telegram-Init-Data': payload.initData} : {})
      },
      body:JSON.stringify(payload)
    });
    if (!r.ok) return null;
    const json = await r.json().catch(()=>null);
    const p = json?.data || json;
    if (p && (p.tgId || p.id)) {
      // Не перезаписываем TG_USER.id UUID-ом сервера — id должен остаться Telegram ID.
      TG_USER = {
        ...TG_USER,
        tgId: p.tgId || TG_USER.tgId,
        firstName: p.firstName ?? TG_USER.firstName,
        lastName: p.lastName ?? TG_USER.lastName,
        name: p.name || TG_USER.name,
        username: p.username !== undefined ? p.username : TG_USER.username,
        displayUsername: (p.username !== undefined ? p.username : TG_USER.username) || 'Без username',
        photo: p.avatar !== undefined ? (p.avatar || null) : TG_USER.photo,
        avatar: p.avatar !== undefined ? (p.avatar || null) : TG_USER.avatar,
        isPremium: p.isPremium !== undefined ? Boolean(p.isPremium) : TG_USER.isPremium
      };
      if (curTab === 'prof') renderProfile();
    }
    return p || null;
  } catch(e){
    console.warn('[profile] backend unavailable, using Telegram local data', e?.message || e);
    return null;
  }
}


async function loadProfileFromApiByTgId(tgId) {
  if (!tgId || tgId === '0') return null;
  try {
    const r = await fetch(PROXY_HTTP + '/api/profile/' + encodeURIComponent(tgId), { headers:{'Accept':'application/json'}, cache:'no-store' });
    if (!r.ok) return null;
    const json = await r.json().catch(()=>null);
    return json?.data || json || null;
  } catch(e) { return null; }
}
function applyApiProfileToTgUser(p) {
  if (!p) return false;
  const tgId = String(p.tgId || p.telegramId || p.id || '0');
  if (!tgId || tgId === '0') return false;
  const firstName = String(p.firstName || '').trim();
  const lastName = String(p.lastName || '').trim();
  const name = p.name || [firstName,lastName].filter(Boolean).join(' ') || 'Пользователь';
  const username = p.username ? (String(p.username).startsWith('@') ? String(p.username) : '@'+String(p.username)) : '';
  const initials = ((firstName[0]||'')+(lastName[0]||'')).toUpperCase() || (name[0]||'?').toUpperCase();
  TG_USER = {
    id: Number(tgId) || tgId,
    tgId,
    firstName,
    lastName,
    name,
    username,
    displayUsername: username || 'Без username',
    photo: p.avatar || null,
    avatar: p.avatar || null,
    isPremium: Boolean(p.isPremium),
    initials: initials.slice(0,2),
    initData: tg?.initData || '',
    isGuest: false,
    color: ['#7c5cff','#ff6eb4','#4d9fff','#22d47a','#f0b429','#ff4d6a'][(Number(tgId)||0) % 6]
  };
  if (p.wallet) { walletAddress = p.wallet.address || walletAddress; walletBalance = Number(p.wallet.balance || walletBalance || 0); }
  if (Array.isArray(p.gifts)) walletGifts = p.gifts;
  const el = document.getElementById('splash-user');
  if (el) el.textContent = 'Привет, ' + TG_USER.name + '! 👋';
  return true;
}
async function loadProfileFallbackFromUrl() {
  // Фолбэк: если Telegram WebApp API не отдал user, но пользователь открыл приложение кнопкой бота,
  // бот добавляет ?tgId=... в URL. Тогда берём уже сохранённый профиль с backend.
  try {
    const q = new URLSearchParams(location.search);
    const tgId = q.get('tgId') || q.get('user_id');
    if (!tgId || !TG_USER?.isGuest) return false;
    const p = await loadProfileFromApiByTgId(tgId);
    return applyApiProfileToTgUser(p);
  } catch(e) { return false; }
}


// ═══ TON CONNECT / WALLET BALANCE / TELEGRAM GIFTS ═══
function esc(v){
  return String(v ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}
function shortAddr(a){
  a=String(a||'');
  return a.length>14 ? a.slice(0,6)+'…'+a.slice(-6) : (a||'—');
}
function fmtTon(v, d=3){
  const n = Number(v||0);
  return n > 0 ? n.toFixed(d).replace(/\.?(0+)$/,'') : '0';
}
function getTestGifts(){
  try { return JSON.parse(localStorage.getItem('cg_test_gifts') || '[]') || []; }
  catch(e){ return []; }
}
function saveTestGifts(list){
  try { localStorage.setItem('cg_test_gifts', JSON.stringify(list || [])); } catch(e){}
}
function addTestGift(){
  const exists = getTestGifts();
  const gift = {
    type:'test',
    address:'TEST-'+Date.now(),
    name:'Test CRT Gift',
    collection:'CursorGift Test Inventory',
    image:'',
    url:'#',
    test:true
  };
  saveTestGifts([gift, ...exists].slice(0,5));
  showToast('🎁 Тестовый подарок добавлен','Теперь можно проверить CRT Upgrade');
  if (curTab==='wheel') { resetWheelCrtState(); renderWheel(); }
  if (curTab==='prof') renderProfile();
}
function clearTestGifts(){
  saveTestGifts([]);
  showToast('🧹 Тестовые подарки удалены','Инвентарь очищен');
  if (curTab==='wheel') { resetWheelCrtState(); renderWheel(); }
  if (curTab==='prof') renderProfile();
}
function profileGiftList(){ return [...(walletGifts || []), ...getTestGifts()]; }
function isTelegramGiftNft(n){
  const meta=n?.metadata||{};
  const col=n?.collection||{};
  const blob=[meta.name,meta.description,meta.image,meta.content_url,meta.external_url,col.name,col.description,n?.address].filter(Boolean).join(' ').toLowerCase();
  return (blob.includes('telegram') && blob.includes('gift')) || blob.includes('fragment.com/gift') || blob.includes('nft.fragment.com');
}
function normalizeWalletGift(n){
  const meta=n?.metadata||{};
  const img = meta.image || meta.preview || meta.content_url || n?.previews?.[2]?.url || n?.previews?.[1]?.url || n?.previews?.[0]?.url || '';
  const addr = n?.address || '';
  return {
    type:'wallet',
    address: addr,
    name: meta.name || n?.dns || 'Telegram Gift',
    image: img,
    collection: n?.collection?.name || 'Telegram NFT',
    description: meta.description || '',
    url: meta.external_url || (addr ? 'https://getgems.io/nft/'+addr : '#'),
    floor: 0
  };
}
async function initTonConnect(){
  if (tonConnectUI) return tonConnectUI;
  try {
    const UI = window.TON_CONNECT_UI;
    if (!UI?.TonConnectUI) return null;
    tonConnectUI = new UI.TonConnectUI({ manifestUrl: TONCONNECT_MANIFEST });
    tonConnectUI.onStatusChange(wallet => handleTonWallet(wallet));
    if (tonConnectUI.wallet) handleTonWallet(tonConnectUI.wallet);
    return tonConnectUI;
  } catch(e) {
    console.warn('[tonconnect]', e.message);
    return null;
  }
}
function handleTonWallet(wallet){
  const address = wallet?.account?.address || '';
  if (address) {
    walletAddress = address;
    localStorage.setItem('cg_wallet_address', walletAddress);
    loadWalletData(true);
  } else {
    walletAddress=''; walletBalance=0; walletGifts=[]; walletLastUpdate=0;
    localStorage.removeItem('cg_wallet_address');
    if (curTab==='prof') renderProfile();
    if (curTab==='market') renderMarket();
    if (curTab==='wheel') renderWheel();
  }
}
async function connectTonWallet(){
  const ui = await initTonConnect();
  if (ui?.openModal) {
    ui.openModal();
    return;
  }
  // Fallback, если SDK не загрузился (например, в sandbox preview без сети)
  if (tg?.openLink) tg.openLink('https://app.tonkeeper.com/ton-connect');
  else window.open('https://app.tonkeeper.com/ton-connect','_blank');
  showToast('<i class="ton-icon-v31"></i> TON Connect', 'Открой в браузере/Telegram, чтобы подключить кошелёк');
}
async function disconnectTonWallet(){
  try { await tonConnectUI?.disconnect?.(); } catch(e){}
  walletAddress=''; walletBalance=0; walletGifts=[]; walletLastUpdate=0;
  localStorage.removeItem('cg_wallet_address');
  saveProfile();
  if (curTab==='prof') renderProfile();
  if (curTab==='market') renderMarket();
  if (curTab==='wheel') renderWheel();
}
async function refreshWalletData(){ await loadWalletData(true); }
async function loadWalletData(force=false){
  if (!walletAddress || walletLoading) return;
  if (!force && Date.now()-walletLastUpdate < 45000) return;
  walletLoading = true;
  if (curTab==='prof') renderProfile();
  if (curTab==='wheel') renderWheel();
  try {
    const [acc,nfts] = await Promise.allSettled([
      fetch('https://tonapi.io/v2/accounts/'+encodeURIComponent(walletAddress), {cache:'no-store'}).then(r=>r.ok?r.json():null),
      fetch('https://tonapi.io/v2/accounts/'+encodeURIComponent(walletAddress)+'/nfts?limit=1000&offset=0', {cache:'no-store'}).then(r=>r.ok?r.json():null)
    ]);
    const account = acc.status==='fulfilled' ? acc.value : null;
    walletBalance = Number(account?.balance || 0) / 1e9;
    if (!Number.isFinite(walletBalance) || walletBalance < 0) walletBalance = 0;
    const items = (nfts.status==='fulfilled' ? (nfts.value?.nft_items || nfts.value?.items || []) : []);
    walletGifts = items.filter(isTelegramGiftNft).map(normalizeWalletGift);
    walletLastUpdate = Date.now();
    saveProfile();
  } catch(e) {
    console.warn('[wallet]', e.message);
    walletBalance = 0;
    walletGifts = [];
  }
  walletLoading = false;
  if (curTab==='prof') renderProfile();
  if (curTab==='market') renderMarket();
  if (curTab==='wheel') renderWheel();
}
function walletCardHtml(){
  if (!walletAddress) {
    return `<div style="margin:14px 16px 0;background:linear-gradient(135deg,rgba(77,159,255,.12),rgba(124,92,255,.08));border:1px solid rgba(77,159,255,.25);border-radius:16px;padding:14px">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:42px;height:42px;border-radius:12px;background:rgba(77,159,255,.12);display:flex;align-items:center;justify-content:center;font-size:22px"><i class="ton-icon-v31"></i></div>
        <div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:800;color:#f0f0ff">TON-кошелёк не подключён</div><div style="font-size:11px;color:#7080a0;margin-top:2px">Подключи Tonkeeper / Wallet, чтобы увидеть баланс и подарки</div></div>
      </div>
      <button onclick="connectTonWallet()" style="margin-top:12px;width:100%;padding:12px;border-radius:13px;background:linear-gradient(135deg,#4d9fff,#7c5cff);color:#fff;font-size:13px;font-weight:800;box-shadow:0 6px 20px rgba(77,159,255,.25)">🔗 Подключить кошелёк</button>
    </div>`;
  }
  return `<div style="margin:14px 16px 0;background:linear-gradient(135deg,rgba(34,212,122,.10),rgba(124,92,255,.07));border:1px solid rgba(34,212,122,.22);border-radius:16px;padding:14px">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
      <div style="min-width:0"><div style="font-size:10px;color:#22d47a;font-weight:800;letter-spacing:.5px">КОШЕЛЁК ПОДКЛЮЧЁН</div><div style="font-size:13px;font-weight:800;color:#d0d0f0;margin-top:3px;font-family:monospace">${esc(shortAddr(walletAddress))}</div></div>
      <div style="text-align:right"><div style="font-size:22px;font-weight:900;color:#f0b429">${fmtTon(walletBalance,4)}</div><div style="font-size:10px;color:#606080">TON баланс</div></div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px">
      <div style="background:rgba(255,255,255,.04);border-radius:11px;padding:8px;text-align:center"><div style="font-size:13px;font-weight:900;color:#a480ff">${walletGifts.length}</div><div style="font-size:9px;color:#606080">подарков</div></div>
      <button onclick="refreshWalletData()" style="background:rgba(77,159,255,.10);border:1px solid rgba(77,159,255,.22);border-radius:11px;padding:8px;text-align:center;color:#4d9fff;font-size:10px;font-weight:800">${walletLoading?'⏳':'↻'} Обновить</button>
      <button onclick="disconnectTonWallet()" style="background:rgba(255,77,106,.09);border:1px solid rgba(255,77,106,.20);border-radius:11px;padding:8px;text-align:center;color:#ff4d6a;font-size:10px;font-weight:800">Отключить</button>
    </div>
    <div style="font-size:9px;color:#505070;margin-top:9px">Если средств нет — баланс показывается как 0 TON.</div>
  </div>`;
}
function marketWalletButtonHtml(){
  if (walletAddress) return `<button onclick="event.stopPropagation();connectTonWallet()" style="margin-top:10px;display:inline-flex;align-items:center;gap:7px;background:rgba(34,212,122,.08);border:1px solid rgba(34,212,122,.22);border-radius:10px;padding:6px 11px;color:#22d47a;font-size:11px;font-weight:800"><i class="ton-icon-v31"></i> ${fmtTon(walletBalance,3)} TON · ${esc(shortAddr(walletAddress))}</button>`;
  return `<button onclick="event.stopPropagation();connectTonWallet()" style="margin-top:10px;display:inline-flex;align-items:center;gap:7px;background:rgba(124,92,255,.10);border:1px solid rgba(124,92,255,.28);border-radius:10px;padding:6px 11px;color:#a480ff;font-size:11px;font-weight:800">🔗 Подключить кошелёк</button>`;
}

// ═══ NFT ATTRS ═══
async function loadNftAttrs(slug) {
  if (nftAttrsData[slug] || nftAttrsData[slug+'_l']) return;
  nftAttrsData[slug+'_l'] = true;
  try {
    const r = await fetch(PROXY_HTTP+'/api/attrs/'+slug);
    const j = await r.json();
    if (j.loading) { setTimeout(()=>{delete nftAttrsData[slug+'_l'];loadNftAttrs(slug);},4000); return; }
    nftAttrsData[slug] = j;
    const el = document.getElementById('attrs-block-'+slug);
    if (el) el.innerHTML = renderAttrsBlock(j);
  } catch(e){}
  delete nftAttrsData[slug+'_l'];
}

function renderAttrsBlock(a) {
  if (!a||!a.models?.length) return '<div style="text-align:center;padding:14px;color:#404060;font-size:12px">Данные загружаются...</div>';
  const rc=p=>p<=5?'#f0b429':p<=15?'#c77dff':p<=30?'#4d9fff':'#78c87a';
  const rl=p=>p<=5?'Редкий':p<=15?'Необычный':p<=30?'Частый':'Обычный';
  const sec=(t,items)=>{
    if(!items?.length)return'';
    return '<div style="margin-bottom:13px"><div style="font-size:10px;font-weight:700;color:#505070;margin-bottom:7px;letter-spacing:.5px">'+t+'</div><div style="display:flex;flex-direction:column;gap:4px">'+
    items.slice(0,15).map(it=>'<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;background:rgba(255,255,255,.04);border-radius:9px">'+
    '<div style="flex:1;font-size:12px;font-weight:600;color:#d0d0f0">'+it.name+'</div>'+
    '<span style="font-size:9px;font-weight:700;color:'+rc(it.rarity)+';padding:2px 6px;border-radius:5px;background:'+rc(it.rarity)+'18">'+rl(it.rarity)+'</span>'+
    '<div style="font-size:12px;font-weight:800;color:'+rc(it.rarity)+';min-width:38px;text-align:right">'+it.rarity.toFixed(1)+'%</div></div>').join('')+
    (items.length>15?'<div style="text-align:center;font-size:10px;color:#404060;padding:4px">+'+(items.length-15)+' ещё</div>':'')+
    '</div></div>';
  };
  return '<div style="animation:fadeIn .3s ease">'+sec('🎭 МОДЕЛИ',a.models)+sec('🖼️ ФОНЫ',a.backdrops)+sec('✨ СИМВОЛЫ',a.symbols)+'<div style="text-align:center;font-size:9px;color:#303050;margin-top:6px">Сканировано '+(a.scanned||0)+' NFT · Fragment CDN</div></div>';
}

// ═══ FETCH PRICES ═══
async function fetchPrices() {
  try {
    const r = await fetch(PROXY_HTTP+'/api/prices',{cache:'no-store'});
    const j = await r.json();
    tonUsd = j.ton_usd || tonUsd;
    const oldSlugs = new Set(GIFTS.map(g=>g.slug)), wasCount = GIFTS.length;
    (j.collections||[]).forEach(c=>{
      const prev = prices[c.slug]?.floor;
      prices[c.slug] = {floor:c.floor,change24h:c.change24h,vol24h:c.vol24h,listed:c.listed,supply:c.supply,sales24h:c.sales24h,marketCap:c.marketCap,prevFloor:prev||c.floor,updated:Date.now()};
      if (!histories[c.slug]) histories[c.slug]=[];
      histories[c.slug].push({time:Date.now(),price:c.floor});
      if (histories[c.slug].length>8640) histories[c.slug].shift();
    });
    GIFTS = (j.collections||[]).map(c=>({slug:c.slug,name:c.name,photo:c.portalPhoto||thumb(c.slug),tg_id:1,isNew:!oldSlugs.has(c.slug)&&wasCount>0}));
    GIFTS.filter(g=>g.isNew).forEach(g=>showToast('🆕 '+g.name,'Новый подарок!'));
    
    GIFTS.forEach(g => {
        const p = prices[g.slug];
        if (!p) return;
        const priceEl = document.getElementById(`pr-${g.slug}`);
        const boxEl = document.getElementById(`box-${g.slug}`);
        if (priceEl && boxEl) {
            const oldPrice = parseFloat(priceEl.innerText.replace(/[^0-9.]/g, '')) || 0;
            if (oldPrice !== p.floor) {
                animateValue(`pr-${g.slug}`, oldPrice, p.floor);
                boxEl.classList.remove('flash-up', 'flash-hot');
                void boxEl.offsetWidth;
                boxEl.classList.add(p.hotSale ? 'flash-hot' : 'flash-up');
            }
        }
    });
    updatePriceDom();
 countdown=20; return true;
  } catch(e){ return false; }
}

async function fetchHistory(slug) {
  try {
    // Загружаем полную историю с реальными продажами
    const r = await fetch(`${PROXY_HTTP}/api/history/${slug}?hours=99999`);
    const j = await r.json();
    if (j.history?.length > 1) {
      const sales = j.history;
      const current = histories[slug]||[];
      // Мержим реальные продажи с текущей историей (накопленной за сессию)
      const merged = [...sales, ...current]
        .sort((a,b)=>a.time-b.time)
        .filter((p,i,arr)=>i===0||p.time!==arr[i-1].time);
      histories[slug] = merged;
      console.log(`[${slug}] history: ${merged.length} points, from ${new Date(merged[0].time).toLocaleDateString('ru')}`);
    }
  } catch(e){ console.warn('[history]', slug, e.message); }
}

function updatePriceDom() {
  GIFTS.forEach(g=>{
    const p=prices[g.slug]; if(!p)return;
    const up=p.change24h>=0;
    const pEl=document.getElementById('pv-'+g.slug);
    if(pEl){
      const prev=parseFloat(pEl.dataset.prev||0); pEl.textContent=p.floor.toFixed(2); pEl.dataset.prev=p.floor;
      if(prev>0&&prev!==p.floor){const box=pEl.closest('.price-box');if(box){box.style.animation='none';void box.offsetWidth;box.style.animation=p.floor>prev?'priceUp .9s ease':'priceDown .9s ease';}pEl.style.color=p.floor>prev?'#22d47a':'#ff4d6a';setTimeout(()=>{if(pEl)pEl.style.color='';},900);}
    }
    const cEl=document.getElementById('pc-'+g.slug); if(cEl){cEl.textContent=(up?'▲':'▼')+' '+Math.abs(p.change24h)+'%';cEl.style.color=up?'#22d47a':'#ff4d6a';}
    const mcEl=document.getElementById('mc-'+g.slug); if(mcEl)mcEl.innerHTML=miniChart(g.slug);
    const dpEl=document.getElementById('dp-'+g.slug); if(dpEl)dpEl.textContent=p.floor.toFixed(2);
  });
  const tEl=document.getElementById('update-timer'); if(tEl)tEl.textContent='↻ '+countdown+'с';
  const tonEl=document.getElementById('ton-price'); if(tonEl)tonEl.textContent='$'+tonUsd.toFixed(2);
}

// ═══ CHARTS ═══
function miniChart(slug,w=84,h=28) {
  const pts=(histories[slug]||[]).slice(-30).map(p=>p.price);
  if(pts.length<2)return `<div class="shim" style="width:${w}px;height:${h}px;border-radius:6px"></div>`;
  const mn=Math.min(...pts),mx=Math.max(...pts),rng=mx-mn||0.01,st=w/(pts.length-1);
  const up=pts[pts.length-1]>=pts[0],col=up?'#22d47a':'#ff4d6a';
  const lp=pts.map((p,i)=>`${i?'L':'M'} ${(i*st).toFixed(1)} ${(h-((p-mn)/rng)*h*.86-h*.07).toFixed(1)}`).join(' ');
  const lx=(pts.length-1)*st,gid='mc'+slug.replace(/[^a-z0-9]/g,'');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow:visible"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${col}" stop-opacity=".28"/><stop offset="100%" stop-color="${col}" stop-opacity="0"/></linearGradient></defs><path d="${lp} L ${lx} ${h} L 0 ${h} Z" fill="url(#${gid})"/><path d="${lp}" stroke="${col}" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function bigChart(slug,period) {
  const allPts = histories[slug]||[];
  let pts;
  if (period >= 99999) {
    // ВСЁ — показываем от самой первой продажи
    pts = allPts;
  } else {
    const cutoff = Date.now() - period*3600000;
    pts = allPts.filter(p=>p.time>=cutoff);
    // Если мало точек для выбранного периода — показываем что есть
    if (pts.length < 3 && allPts.length > 0) pts = allPts.slice(-Math.min(allPts.length, 50));
  }
  if(pts.length<2)return `<div style="height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#303050;gap:8px"><div style="font-size:26px">⏳</div><div style="font-size:13px">Накапливаем данные...</div><div style="font-size:10px">Каждые 20 сек</div></div>`;
  const W=320,H=150,st=W/(pts.length-1);
  const pa=pts.map(p=>p.price),mn=Math.min(...pa),mx=Math.max(...pa),rng=mx-mn||0.01;
  const lp=pts.map((p,i)=>`${i?'L':'M'} ${(i*st).toFixed(1)} ${(H-((p.price-mn)/rng)*H*.78-H*.11).toFixed(1)}`).join(' ');
  const last=pts[pts.length-1],lx=(pts.length-1)*st,ly=H-((last.price-mn)/rng)*H*.78-H*.11;
  const up=last.price>=pts[0].price,col=up?'#22d47a':'#ff4d6a';
  const gid='bc'+slug.replace(/[^a-z0-9]/g,''),avg=pa.reduce((a,b)=>a+b,0)/pa.length;
  const fmt=ts=>{const d=new Date(ts);return d.getDate()+'.'+(d.getMonth()+1)+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');};
  const gr=[.25,.5,.75].map(r=>({y:(H-r*H*.78-H*.11).toFixed(1),p:(mn+rng*r).toFixed(2)}));
  const gs=gr.map(g=>`<line x1="0" y1="${g.y}" x2="${W}" y2="${g.y}" stroke="rgba(255,255,255,.04)" stroke-width="1" stroke-dasharray="3 3"/><text x="2" y="${(parseFloat(g.y)-3).toFixed(0)}" fill="rgba(255,255,255,.2)" font-size="7">${g.p}</text>`).join('');
  const avgY=(H-((avg-mn)/rng)*H*.78-H*.11).toFixed(1);
  return `<div>
<div style="display:flex;justify-content:space-between;font-size:9px;color:#404060;margin-bottom:4px;padding:0 4px"><span>${fmt(pts[0].time)}</span><span style="color:${col};font-weight:700">${last.price.toFixed(2)} TON ${up?'▲':'▼'}</span><span>${fmt(last.time)}</span></div>
<div style="background:rgba(255,255,255,.02);border-radius:14px;padding:10px 6px 14px">
<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:${H}px;overflow:visible">
<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${col}" stop-opacity=".22"/><stop offset="100%" stop-color="${col}" stop-opacity="0"/></linearGradient></defs>
${gs}
<path d="${lp} L ${lx} ${H} L 0 ${H} Z" fill="url(#${gid})"/>
<path d="${lp}" stroke="${col}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<line x1="0" y1="${avgY}" x2="${W}" y2="${avgY}" stroke="rgba(255,255,255,.14)" stroke-width="1" stroke-dasharray="3 3"/>
<circle cx="${lx}" cy="${ly}" r="6" fill="${col}" opacity=".25"/><circle cx="${lx}" cy="${ly}" r="3.5" fill="${col}"/>
</svg></div>
<div style="display:flex;justify-content:space-between;margin-top:10px;padding:0 2px">
<div style="text-align:center"><div style="font-size:9px;color:#404060;margin-bottom:2px">Мин</div><div style="font-size:13px;font-weight:800;color:#4d9fff">${mn.toFixed(2)}</div></div>
<div style="text-align:center"><div style="font-size:9px;color:#404060;margin-bottom:2px">Среднее</div><div style="font-size:13px;font-weight:800;color:#a0a0c0">${avg.toFixed(2)}</div></div>
<div style="text-align:center"><div style="font-size:9px;color:#404060;margin-bottom:2px">Макс</div><div style="font-size:13px;font-weight:800;color:#f0b429">${mx.toFixed(2)}</div></div>
<div style="text-align:center"><div style="font-size:9px;color:#404060;margin-bottom:2px">Сейчас</div><div style="font-size:13px;font-weight:800;color:${col}">${last.price.toFixed(2)}</div></div>
</div></div>`;
}

// ═══ HELPERS ═══
function showToast(title,body){const t=document.createElement('div');t.className='toast';t.innerHTML=`<div><div style="font-size:11px;font-weight:800;color:#fff">${title}</div><div style="font-size:10px;color:rgba(255,255,255,.7)">${body}</div></div>`;document.body.appendChild(t);setTimeout(()=>t.style.opacity='0',3500);setTimeout(()=>t.remove(),4000);}
function avatarHtml(size=40){
  const u = TG_USER||{};
  const col = u.color||'#7c5cff';
  const fs = Math.round(size*.38);
  const ph = `<div class="avatar-ph" style="width:${size}px;height:${size}px;font-size:${fs}px;background:linear-gradient(135deg,${col},${col}99)">${u.initials||'🎁'}</div>`;
  if(u.photo){
    return `<img src="${u.photo}" class="avatar" style="width:${size}px;height:${size}px" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="avatar-ph" style="display:none;width:${size}px;height:${size}px;font-size:${fs}px;background:linear-gradient(135deg,${col},${col}99)">${u.initials||'🎁'}</div>`;
  }
  return ph;
}
function spawnConfetti(){const cols=['#7c5cff','#22d47a','#f0b429','#ff6eb4','#4d9fff','#ff4d6a','#fff'];for(let i=0;i<40;i++){setTimeout(()=>{const c=document.createElement('div');c.className='conf';c.style.cssText=`left:${Math.random()*100}vw;top:${Math.random()*25}vh;background:${cols[~~(Math.random()*cols.length)]};animation-duration:${.8+Math.random()*.9}s;animation-delay:${Math.random()*.25}s`;document.body.appendChild(c);setTimeout(()=>c.remove(),1600);},i*50);}}
function loadLottie(cid,url){const el=document.getElementById(cid);if(!el||typeof lottie==='undefined')return;if(lotties[cid]){try{lotties[cid].destroy();}catch(e){}delete lotties[cid];}try{lotties[cid]=lottie.loadAnimation({container:el,renderer:'svg',loop:true,autoplay:true,path:url});lotties[cid].addEventListener('data_failed',()=>{if(el)el.innerHTML=`<img src="${url.replace('.lottie.json','.webp')}" style="width:100%;height:100%;object-fit:contain;border-radius:inherit" onerror="this.src='${url.replace(/gift\/.+$/,'')}'"/>`;});}catch(e){if(el)el.innerHTML=`<img src="${url.replace('.lottie.json','.webp')}" style="width:100%;height:100%;object-fit:contain"/>`;}}

// ═══ NAVIGATION ═══
function go(tab) {
  const prevTab = curTab;
  showNav();
  ['market','news','prof','detail','wheel'].forEach(t=>{
    const pg=document.getElementById('pg-'+t);if(pg)pg.style.display='none';
    const ico=document.getElementById('ico-'+t);if(ico)ico.classList.remove('on');
  });
  const pg=document.getElementById('pg-'+tab);if(pg)pg.style.display='block';
  const ico=document.getElementById('ico-'+tab);if(ico)ico.classList.add('on');
  if(tab==='wheel' && prevTab!=='wheel') resetWheelCrtState();
  curTab=tab;
  updateNavActive(tab);
  if(tab==='market')renderMarket();
  if(tab==='news')renderNews();
  if(tab==='prof')renderProfile();
  if(tab==='wheel')renderWheel();
}

function openDetail(slug){showNav();requestAnimationFrame(()=>moveNavPill(curTab));detailSlug=slug;['pg-market','pg-news','pg-prof','pg-wheel'].forEach(x=>{const e=document.getElementById(x);if(e)e.style.display='none';});document.getElementById('pg-detail').style.display='block';renderDetail(slug);fetchHistory(slug);}
function closeDetail(){document.getElementById('pg-detail').style.display='none';go(['market','news','prof'].includes(curTab)?curTab:'market');}

// ═══ MARKET PAGE ═══

function renderMarket() {
    const pg = document.getElementById('pg-market');
    const signals = getLatestNews();
    pg.innerHTML = `
        <div class="market-mesh-bg">
            <div style="padding: 24px 20px 10px; display:flex; justify-content:space-between; align-items:center;">
               <div><h1 style="font-size:26px; font-weight:950; margin:0; letter-spacing:-1px;">Cursor Market</h1><div style="display:flex; align-items:center; gap:6px; margin-top:4px;"><div style="width:7px; height:7px; background:#22d47a; border-radius:50%; animation: pulse 2s infinite;"></div><span style="font-size:11px; color:#22d47a; font-weight:800;">LIVE</span></div></div>
               <div style="text-align:right;"><div style="font-size:18px; font-weight:900; color:#f0b429;"><i class="ton-icon-v31"></i>$${tonUsd.toFixed(2)}</div></div>
            </div>
            <div class="banner-container">
                ${signals.map(s => `<div class="banner-card" onclick="go('news')"><img src="https://fragment.com/file/gifts/${s.slug}/thumb.webp" class="banner-img"><div class="banner-content"><span class="banner-tag" style="background:${s.color}20; color:${s.color}; border:1px solid ${s.color}40">${s.tag}</span><div class="banner-title">${s.title}</div><div style="font-size:10px; color:rgba(255,255,255,0.4); margin-top:4px; font-weight:700;">Verified by ${s.source}</div></div></div>`).join('')}
            </div>
        </div>
        <div style="padding:15px 16px 0"><div style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:10px 14px"><span style="font-size:14px;opacity:.4">🔍</span><input id="si" placeholder="Поиск коллекции..." value="${mQuery}" oninput="mQuery=this.value;renderGrid()" style="flex:1;color:#f0f0ff;font-size:14px;border:none;background:none;outline:none;"/></div></div>
        <div style="padding:12px 16px 0; overflow-x:auto; display:flex; gap:6px; scrollbar-width:none;">${[['vol24h','📊 Объём'],['floor_desc','↓ Цена'],['floor_asc','↑ Цена'],['change_up','🔥 Рост']].map(([s,l])=>`<button class="spill ${s===mSort?'on':'off'}" style="flex:0 0 auto;" onclick="mSort='${s}'; renderMarket()">${l}</button>`).join('')}</div>
        <div id="mgrid" style="margin-top:15px; display:grid; grid-template-columns: 1fr 1fr; gap:10px; padding: 0 16px 120px;"></div>
    `;
    renderGrid();
    initBannerAutoScroll();
}



function renderGrid() {
  const gr = document.getElementById('mgrid'); if(!gr) return;
  let list = [...GIFTS];
  if(mQuery) list = list.filter(g => g.name.toLowerCase().includes(mQuery.toLowerCase()));
  list.sort((a,b) => {
    const pa = prices[a.slug]||{}, pb = prices[b.slug]||{};
    if(mSort==='vol24h') return (pb.vol24h||0)-(pa.vol24h||0);
    return (pa.floor||0)-(pb.floor||0);
  });
  gr.innerHTML = list.map((g, i) => {
    const p = prices[g.slug]||{floor:0, change24h:0, listed: 0};
    const up = p.change24h >= 0;
    return `<div class="gcard" onclick="openDetail('${g.slug}')" style="animation:fadeUp .3s ease ${i*0.02}s both">
        <div style="width:100%; padding-top:100%; position:relative; background:rgba(0,0,0,0.2);"><img src="${getCardImg(g)}" style="position:absolute; inset:0; width:100%; height:100%; object-fit:contain; padding:12px;"></div>
        <div style="padding:12px;">
            <div style="font-size:12px; font-weight:700; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${g.name}</div>
            <div id="box-${g.slug}" class="price-box-v31">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div id="pr-${g.slug}" style="font-size:16px; font-weight:900;"><i class="ton-icon-v31"></i>${p.floor.toFixed(2)}</div>
                    <div style="font-size:10px; font-weight:800; color:${up?'#22d47a':'#ff4d6a'}">${up?'+':''}${p.change24h}%</div>
                </div>
                <div style="font-size:9px; color:rgba(255,255,255,0.2); margin-top:4px; font-weight:700;">ЛИСТИНГИ: ${p.listed || '—'}</div>
            </div>
        </div>
    </div>`;
  }).join('');
}


// ═══ DETAIL PAGE ═══
function renderDetail(slug) {
  const g=GIFTS.find(x=>x.slug===slug);if(!g)return;
  const p=prices[slug]||{floor:0,change24h:0,vol24h:0};
  const up=p.change24h>=0;
  detailPeriod=24;
  document.getElementById('pg-detail').innerHTML=`
<div style="animation:slideUp .3s cubic-bezier(.34,1.2,.64,1)">
  <div style="display:flex;align-items:center;gap:11px;padding:14px 16px 8px;position:sticky;top:0;z-index:10;background:linear-gradient(to bottom,#080810 85%,transparent)">
    <button class="back" onclick="closeDetail()">‹</button>
    <div style="flex:1;min-width:0"><div style="font-size:16px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${g.name}</div><div style="font-size:10px;color:#404060">${slug} · Portal Market</div></div>
    <a href="https://fragment.com/gifts/${slug}" target="_blank" style="background:rgba(124,92,255,.15);border:1px solid rgba(124,92,255,.35);border-radius:9px;padding:4px 10px;font-size:10px;color:#a480ff;font-weight:700;white-space:nowrap">Fragment ↗</a>
  </div>
  <div style="margin:0 16px;border-radius:22px;overflow:hidden;background:linear-gradient(135deg,#0d0720,#060510);border:1px solid rgba(124,92,255,.15);position:relative">
    <div style="padding-bottom:88%;position:relative">
      <div id="lottie-main" style="position:absolute;inset:0;width:100%;height:100%"></div>
      <img id="detail-fallback" src="${nftImg(slug,g.tg_id||1)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:none;border-radius:22px;image-rendering:-webkit-optimize-contrast" onerror="this.src='${thumb(slug)}'"/>
    </div>
    <div style="position:absolute;bottom:12px;left:12px;right:12px;display:flex;justify-content:space-between;align-items:flex-end;pointer-events:none">
      <div style="background:rgba(0,0,0,.75);backdrop-filter:blur(14px);border-radius:14px;padding:9px 13px;border:1px solid rgba(255,255,255,.08)">
        <div style="font-size:10px;color:#606080;margin-bottom:2px">Floor Price</div>
        <div style="font-size:26px;font-weight:900;letter-spacing:-.5px" id="dp-${slug}">${p.floor.toFixed(2)}</div>
        <div style="font-size:10px;color:#606080">TON · $${(p.floor*tonUsd).toFixed(0)}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:5px">
        <div style="background:rgba(0,0,0,.75);backdrop-filter:blur(14px);border-radius:10px;padding:6px 10px;text-align:right;border:1px solid rgba(255,255,255,.07)"><div style="font-size:8px;color:#606080">24ч</div><div style="font-size:14px;font-weight:800;color:${up?'#22d47a':'#ff4d6a'}">${up?'+':''}${p.change24h}%</div></div>
        <div style="background:rgba(0,0,0,.75);backdrop-filter:blur(14px);border-radius:10px;padding:6px 10px;text-align:right;border:1px solid rgba(255,255,255,.07)"><div style="font-size:8px;color:#606080">Объём</div><div style="font-size:14px;font-weight:800;color:#4d9fff">${p.vol24h.toFixed(0)}</div></div>
      </div>
    </div>
  </div>
  <div style="display:flex;gap:9px;padding:13px 16px 0">
    <button onclick="openGiftAction('${slug}','sell')" style="flex:1;padding:11px;border-radius:13px;background:linear-gradient(135deg,rgba(34,212,122,.15),rgba(34,212,122,.05));border:1px solid rgba(34,212,122,.3);color:#22d47a;font-size:12px;font-weight:700">💰 Продать</button>
    <button onclick="openGiftAction('${slug}','withdraw')" style="flex:1;padding:11px;border-radius:13px;background:linear-gradient(135deg,rgba(77,159,255,.15),rgba(77,159,255,.05));border:1px solid rgba(77,159,255,.3);color:#4d9fff;font-size:12px;font-weight:700">📤 Вывести</button>
    <button onclick="openWheelWith('${slug}')" style="flex:1;padding:11px;border-radius:13px;background:linear-gradient(135deg,rgba(124,92,255,.2),rgba(92,61,255,.1));border:1px solid rgba(124,92,255,.4);color:#a480ff;font-size:12px;font-weight:700">🎡 Колесо</button>
  </div>
  <div class="tabs" style="margin-top:13px">
    <button class="tab" id="dt-info" onclick="dtab('info')" style="border-bottom:2px solid #7c5cff;color:#a480ff">📋 Инфо</button>
    <button class="tab" id="dt-chart" onclick="dtab('chart')" style="border-bottom:2px solid transparent;color:#505070">📈 График</button>
    <button class="tab" id="dt-nfts" onclick="dtab('nfts')" style="border-bottom:2px solid transparent;color:#505070">🎭 Скины</button>
  </div>
  <div id="dtcontent" style="padding:16px">${dtInfo(g,p)}</div>
  <div style="height:80px"></div>
</div>`;
  setTimeout(()=>{
    loadLottie('lottie-main',lottieUrl(slug,g.tg_id||1));
    if(lotties['lottie-main'])lotties['lottie-main'].addEventListener('data_failed',()=>{const l=document.getElementById('lottie-main'),f=document.getElementById('detail-fallback');if(l)l.style.display='none';if(f)f.style.display='block';});
  },80);
}

function dtab(t){
  ['info','chart','nfts'].forEach(x=>{const b=document.getElementById('dt-'+x);if(b){b.style.borderBottom=t===x?'2px solid #7c5cff':'2px solid transparent';b.style.color=t===x?'#a480ff':'#505070';}});
  const g=GIFTS.find(x=>x.slug===detailSlug),p=prices[detailSlug]||{},el=document.getElementById('dtcontent');
  if(!el||!g)return;
  if(t==='info')el.innerHTML=dtInfo(g,p);
  else if(t==='chart')el.innerHTML=dtChart(g);
  else if(t==='nfts'){el.innerHTML=dtNfts(g);setTimeout(()=>initNftLotties(g),150);}
}

function dtInfo(g,p){
  const rows=[['💰 Floor',`<strong style="color:#f0b429">${(p.floor||0).toFixed(2)} TON</strong> · $${((p.floor||0)*tonUsd).toFixed(0)}`],['📈 24ч',`<span style="color:${(p.change24h||0)>=0?'#22d47a':'#ff4d6a'}">${(p.change24h||0)>=0?'+':''}${p.change24h||0}%</span>`],['📊 Объём',`${(p.vol24h||0).toFixed(0)} TON`],['🛒 Сделок',`${p.sales24h||0}`],['📋 Листинги',`${p.listed||0}`],['🏭 Supply',`${(p.supply||0).toLocaleString()}`],['<i class="ton-icon-v31"></i> Market Cap',`${((p.marketCap||0)/1000).toFixed(1)}K TON`],['🕒 Обновлено',p.updated?new Date(p.updated).toLocaleTimeString('ru'):'—']];
  return `<div style="animation:fadeIn .2s ease">${rows.map(([l,v])=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="font-size:12px;color:#606080">${l}</span><span style="font-size:12px;font-weight:700;color:#c0c0e0">${v}</span></div>`).join('')}
<div style="margin-top:14px;display:flex;gap:9px">
<a href="https://fragment.com/gifts/${g.slug}" target="_blank" style="flex:1;padding:10px;border-radius:12px;background:rgba(124,92,255,.12);border:1px solid rgba(124,92,255,.3);color:#a480ff;font-size:11px;font-weight:700;text-align:center">🔗 Fragment</a>
<a href="https://portal-market.com/gifts/${g.slug}" target="_blank" style="flex:1;padding:10px;border-radius:12px;background:rgba(77,159,255,.1);border:1px solid rgba(77,159,255,.3);color:#4d9fff;font-size:11px;font-weight:700;text-align:center">🏪 Portal</a>
</div></div>`;
}

function dtChart(g){
  const perBtns=[{l:'1Ч',h:1},{l:'6Ч',h:6},{l:'24Ч',h:24},{l:'7Д',h:168},{l:'30Д',h:720},{l:'Всё',h:99999}];
  const h=histories[g.slug]||[];
  const firstTime=h.length?h[0].time:Date.now(), lastTime=h.length?h[h.length-1].time:Date.now();
  const totalDays=((lastTime-firstTime)/86400000).toFixed(1);
  const fmt2=ts=>{const d=new Date(ts);return d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();};
  return `<div style="animation:fadeIn .22s ease">
<div style="display:flex;gap:5px;margin-bottom:12px;justify-content:flex-end;flex-wrap:wrap">
${perBtns.map(({l,hh})=>`<button onclick="detailPeriod=${hh};dtab('chart')" style="padding:4px 11px;border-radius:7px;font-size:11px;font-weight:600;cursor:pointer;background:${detailPeriod===hh?'rgba(124,92,255,.25)':'rgba(255,255,255,.04)'};border:${detailPeriod===hh?'1px solid rgba(124,92,255,.5)':'1px solid transparent'};color:${detailPeriod===hh?'#a480ff':'#606080'}">${l}</button>`).join('')}
</div>
${bigChart(g.slug,detailPeriod)}
<div style="margin-top:12px;background:rgba(255,255,255,.03);border-radius:12px;padding:11px 13px;border:1px solid rgba(255,255,255,.05)">
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:8px">
<div style="text-align:center"><div style="font-size:9px;color:#404060;margin-bottom:2px">Точек</div><div style="font-size:13px;font-weight:800;color:#a0a0c0">${h.length}</div></div>
<div style="text-align:center"><div style="font-size:9px;color:#404060;margin-bottom:2px">Дней</div><div style="font-size:13px;font-weight:800;color:#a0a0c0">${totalDays}</div></div>
<div style="text-align:center"><div style="font-size:9px;color:#404060;margin-bottom:2px">С</div><div style="font-size:11px;font-weight:700;color:#a0a0c0">${fmt2(firstTime)}</div></div>
</div>
<div style="font-size:10px;color:#606080;line-height:1.6">Реальные данные · Portal Market · <strong style="color:#22d47a">20 сек</strong></div>
</div></div>`;
}

function dtNfts(g){
  const nums=[1,2,3,4,5,6,7,8,9];
  if(!nftAttrsData[g.slug])loadNftAttrs(g.slug);
  const attrs=nftAttrsData[g.slug];
  return `<div style="animation:fadeIn .2s ease">
<div style="font-size:10px;font-weight:700;color:#505070;margin-bottom:9px;letter-spacing:.5px">🎬 АНИМАЦИИ NFT</div>
<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;margin-bottom:13px">
${nums.map(n=>`<div onclick="openNftModal('${g.slug}',${n})" style="flex:0 0 auto;width:94px;border-radius:13px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);overflow:hidden;cursor:pointer;transition:all .18s" onmouseover="this.style.transform='scale(1.06)';this.style.borderColor='rgba(124,92,255,.4)'" onmouseout="this.style.transform='';this.style.borderColor='rgba(255,255,255,.07)'">
<div style="width:94px;height:94px;position:relative"><div id="lot-${g.slug}-${n}" style="position:absolute;inset:0"></div></div>
<div style="padding:4px 6px;text-align:center;font-size:8px;color:#505070">#${n}</div></div>`).join('')}
</div>
<div style="font-size:10px;font-weight:700;color:#505070;margin-bottom:8px;letter-spacing:.5px">🖼️ ВЫСОКОЕ КАЧЕСТВО</div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:13px">
${nums.slice(0,9).map(n=>`<div onclick="openNftModal('${g.slug}',${n})" style="border-radius:12px;overflow:hidden;background:rgba(0,0,0,.2);cursor:pointer;aspect-ratio:1;transition:transform .15s" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform=''">
<img src="${nftImg(g.slug,n)}" style="width:100%;height:100%;object-fit:contain;image-rendering:-webkit-optimize-contrast" onerror="this.src='${thumb(g.slug)}'"/>
</div>`).join('')}
</div>
<div id="attrs-block-${g.slug}">${attrs?renderAttrsBlock(attrs):`<div style="text-align:center;padding:20px;color:#505070"><div style="font-size:20px;margin-bottom:7px;animation:spin 1.5s linear infinite;display:inline-block">⏳</div><div style="font-size:12px">Загружаем скины и фоны...</div></div>`}</div>
</div>`;
}

function initNftLotties(g){
  [1,2,3,4,5,6,7,8,9].forEach(n=>{
    const cid=`lot-${g.slug}-${n}`,el=document.getElementById(cid);if(!el)return;
    try{const a=lottie.loadAnimation({container:el,renderer:'svg',loop:true,autoplay:true,path:lottieUrl(g.slug,n)});lotties[cid]=a;a.addEventListener('data_failed',()=>{if(el)el.innerHTML=`<img src="${nftImg(g.slug,n)}" style="width:100%;height:100%;object-fit:contain;image-rendering:-webkit-optimize-contrast" onerror="this.src='${thumb(g.slug)}'"/>`;});}
    catch(e){if(el)el.innerHTML=`<img src="${thumb(g.slug)}" style="width:100%;height:100%;object-fit:contain"/>`;}
  });
}

function openNftModal(slug,num){
  const g=GIFTS.find(x=>x.slug===slug);
  const m=document.createElement('div');
  m.style.cssText='position:fixed;inset:0;z-index:800;background:rgba(0,0,0,.88);backdrop-filter:blur(20px);display:flex;flex-direction:column;align-items:center;justify-content:center;animation:fadeIn .2s ease';
  m.innerHTML=`<button onclick="this.parentElement.remove()" style="position:absolute;top:20px;right:20px;width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.1);color:#fff;font-size:22px;display:flex;align-items:center;justify-content:center">✕</button>
<div style="width:290px;height:290px;border-radius:24px;overflow:hidden;background:#0a0a18;border:1px solid rgba(124,92,255,.3);box-shadow:0 24px 64px rgba(0,0,0,.85)"><div id="modal-lot" style="width:100%;height:100%"></div></div>
<div style="margin-top:14px;text-align:center"><div style="font-size:18px;font-weight:800">${g?.name||slug} #${num}</div>
<a href="https://fragment.com/gift/${slug}-${num}" target="_blank" style="font-size:12px;color:#7c5cff;margin-top:4px;display:block">Fragment ↗</a></div>`;
  document.body.appendChild(m);
  setTimeout(()=>loadLottie('modal-lot',lottieUrl(slug,num)),100);
}

// ═══ GIFT ACTIONS ═══
function openGiftAction(slug,type){
  const g=GIFTS.find(x=>x.slug===slug),p=prices[slug]||{floor:0};
  const isSell=type==='sell';
  const overlay=document.createElement('div');overlay.className='modal-overlay';overlay.onclick=e=>{if(e.target===overlay)overlay.remove();};
  overlay.innerHTML=`<div class="modal-sheet" style="animation:slideUp .3s ease">
<div style="width:40px;height:4px;background:rgba(255,255,255,.15);border-radius:2px;margin:0 auto 18px"></div>
<div style="display:flex;align-items:center;gap:12px;margin-bottom:18px">
<div style="width:56px;height:56px;border-radius:14px;overflow:hidden;background:rgba(0,0,0,.3)"><img src="${thumb(slug)}" style="width:100%;height:100%;object-fit:contain" onerror="this.style.opacity=.3"/></div>
<div><div style="font-size:16px;font-weight:800">${isSell?'💰 Продать':'📤 Вывести'}</div><div style="font-size:13px;color:#a0a0c0">${g?.name||slug}</div></div>
</div>
${isSell?`<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px;margin-bottom:14px">
<div style="font-size:10px;color:#606080;margin-bottom:6px;font-weight:600">ЦЕНА ПРОДАЖИ</div>
<div style="display:flex;align-items:center;gap:10px"><input id="sell-price" type="number" value="${p.floor.toFixed(2)}" step="0.01" style="flex:1;background:none;color:#f0f0ff;font-size:20px;font-weight:800;font-variant-numeric:tabular-nums"/><span style="font-size:14px;color:#606080;font-weight:700">TON</span></div>
<div style="font-size:11px;color:#505070;margin-top:6px">Floor: ${p.floor.toFixed(2)} TON · $${(p.floor*tonUsd).toFixed(0)}</div>
</div>
<div style="display:flex;gap:8px;margin-bottom:14px">${[50,75,100,120].map(pct=>`<button onclick="document.getElementById('sell-price').value=(${p.floor}*${pct}/100).toFixed(2)" style="flex:1;padding:7px;border-radius:9px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);color:#a0a0c0;font-size:11px;font-weight:600">${pct}%</button>`).join('')}</div>
<button onclick="confirmSell('${slug}')" style="width:100%;padding:14px;border-radius:14px;background:linear-gradient(135deg,#22d47a,#17a85e);color:#fff;font-size:14px;font-weight:800">Выставить на продажу</button>`
:`<div style="background:rgba(77,159,255,.08);border:1px solid rgba(77,159,255,.2);border-radius:14px;padding:14px;margin-bottom:14px">
<div style="font-size:11px;color:#4d9fff;font-weight:600;margin-bottom:8px">📋 КАК ВЫВЕСТИ</div>
<div style="font-size:12px;color:#8090b0;line-height:1.7">1. Подключи TON-кошелёк (Tonkeeper)<br>2. Открой подарок на Fragment.com<br>3. Нажми "Transfer to blockchain"<br>4. Подтверди транзакцию</div>
</div>
<div style="display:flex;gap:10px">
<a href="https://fragment.com/gift/${slug}-1" target="_blank" style="flex:1;padding:13px;border-radius:14px;background:linear-gradient(135deg,#4d9fff,#2d7fff);color:#fff;font-size:13px;font-weight:800;text-align:center">Fragment</a>
<a href="https://t.me/wallet" target="_blank" style="flex:1;padding:13px;border-radius:14px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:#d0d0f0;font-size:13px;font-weight:700;text-align:center">TON Wallet</a>
</div>`}
<button onclick="this.closest('.modal-overlay').remove()" style="width:100%;padding:12px;border-radius:14px;color:#505070;font-size:13px;margin-top:10px">Отмена</button>
</div>`;
  document.body.appendChild(overlay);
}

function confirmSell(slug){const priceEl=document.getElementById('sell-price');const sp=parseFloat(priceEl?.value||0);const g=GIFTS.find(x=>x.slug===slug);document.querySelector('.modal-overlay')?.remove();showToast('✅ Выставлено',`${g?.name} за ${sp.toFixed(2)} TON`);}

// ═══ WHEEL / CRT UPGRADE MACHINE ═══
let wheelStakeKey=null, wheelStake=null, wheelUpgradeTarget=null, wheelChance=0, wheelStage='idle', wheelSpinning=false;
let wheelTapeItems=[], wheelFinalIndex=28, wheelWillWin=false, wheelPreselectSlug=null, wheelNeedleAngle=0, wheelResultPhase='text', wheelStaticFlash=false;
const CRT_STATIC_SOUND_URL='interference-crunchy-close.mp3';
let crtAudioCtx=null, crtSpinNodes=null;

function openWheelWith(slug){wheelPreselectSlug=slug||null;go('wheel');}

function ensureCrtAudioCtx(){
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx) return null;
    if(!crtAudioCtx) crtAudioCtx=new Ctx();
    if(crtAudioCtx.state==='suspended') crtAudioCtx.resume().catch(()=>{});
    return crtAudioCtx;
  }catch(e){return null;}
}
function playCrtStatic(ms=900){
  try{
    const a=new Audio(CRT_STATIC_SOUND_URL);
    a.volume=.42; a.currentTime=0;
    a.play().catch(()=>{});
    setTimeout(()=>{try{a.pause();a.currentTime=0;}catch(e){}},ms);
  }catch(e){}
}
function startCrtSpinSound(ms=4300){
  const ctx=ensureCrtAudioCtx(); if(!ctx)return;
  stopCrtSpinSound();
  const bufferSize=ctx.sampleRate*2;
  const buffer=ctx.createBuffer(1,bufferSize,ctx.sampleRate);
  const data=buffer.getChannelData(0);
  for(let i=0;i<bufferSize;i++) data[i]=(Math.random()*2-1)*.42;
  const noise=ctx.createBufferSource(); noise.buffer=buffer; noise.loop=true;
  const filter=ctx.createBiquadFilter(); filter.type='bandpass'; filter.frequency.value=820; filter.Q.value=.9;
  const gain=ctx.createGain(); gain.gain.setValueAtTime(.0001,ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.18,ctx.currentTime+.08); gain.gain.exponentialRampToValueAtTime(.045,ctx.currentTime+ms/1000);
  const osc=ctx.createOscillator(); osc.type='sawtooth'; osc.frequency.setValueAtTime(80,ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(34,ctx.currentTime+ms/1000);
  const oscGain=ctx.createGain(); oscGain.gain.setValueAtTime(.03,ctx.currentTime); oscGain.gain.exponentialRampToValueAtTime(.006,ctx.currentTime+ms/1000);
  noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination); osc.connect(oscGain); oscGain.connect(ctx.destination);
  noise.start(); osc.start(); crtSpinNodes={noise,osc,gain,oscGain};
  setTimeout(stopCrtSpinSound,ms);
}
function stopCrtSpinSound(){
  if(!crtSpinNodes)return;
  try{crtSpinNodes.noise.stop();}catch(e){}
  try{crtSpinNodes.osc.stop();}catch(e){}
  crtSpinNodes=null;
}
function triggerCrtStatic(ms=850){
  wheelStaticFlash=true; renderWheel(); playCrtStatic(ms);
  setTimeout(()=>{wheelStaticFlash=false; if(curTab==='wheel')renderWheel();},ms);
}

function wheelGiftImage(item){
  if(!item) return '';
  if(item.image) return item.image;
  if(item.slug) return thumb(item.slug);
  return '';
}
function wheelFindMarketMatch(item){
  const text = [item?.name,item?.collection,item?.slug].filter(Boolean).join(' ').toLowerCase().replace(/[^a-zа-я0-9]+/g,' ');
  return GIFTS.find(g=>{
    const n=(g.name||'').toLowerCase();
    const slug=(g.slug||'').toLowerCase().replace(/[-_]+/g,' ');
    return text.includes(n) || text.includes(slug) || n.includes(text.trim());
  }) || null;
}
function wheelEstimateValue(item){
  const m = wheelFindMarketMatch(item);
  if(m && prices[m.slug]?.floor>0) return prices[m.slug].floor;
  const vals=GIFTS.map(g=>prices[g.slug]?.floor||0).filter(v=>v>0).sort((a,b)=>a-b);
  return vals.length ? Math.max(0.5, vals[Math.floor(vals.length*.25)]) : 1;
}
function getWheelStakeItems(){
  const gifts = profileGiftList();
  if(walletAddress && gifts.length){
    return gifts.map((g,i)=>({
      key:'wallet-'+i,
      type:'wallet',
      name:g.name||'Telegram Gift',
      collection:g.collection||'Telegram NFT',
      image:g.image||'',
      address:g.address||'',
      floor:wheelEstimateValue(g),
      raw:g
    }));
  }
  return [];
}
function getWheelTargets(){
  const sf = wheelStake?.floor || 1;
  let list = GIFTS.filter(g=>(prices[g.slug]?.floor||0)>0).map(g=>({
    slug:g.slug,name:g.name,image:thumb(g.slug),floor:prices[g.slug]?.floor||1,raw:g
  })).filter(t=>t.floor>=sf*.8).sort((a,b)=>a.floor-b.floor);
  const near=list.filter(t=>t.floor<=sf*2.2).slice(0,6);
  const high=list.filter(t=>t.floor>sf*2.2).slice(0,6);
  list=[...near,...high];
  if(list.length<6) list=GIFTS.slice(0,12).map(g=>({slug:g.slug,name:g.name,image:thumb(g.slug),floor:prices[g.slug]?.floor||1,raw:g}));
  return list.slice(0,12);
}
function calcWheelChance(stake,target){
  const sf=stake?.floor||1, tf=target?.floor||1;
  const raw=(sf/tf)*92;
  return parseFloat(Math.min(88,Math.max(2,raw)).toFixed(1));
}
function renderCrtHeader(){
  const st = wheelStage==='idle'?'WAITING INPUT':wheelStage==='target'?'SIGNAL ACQUIRED':wheelStage==='ready'?'CHANCE CALCULATED':wheelStage==='spin'?'ROLLING TAPE':'SESSION CLOSED';
  return `<div class="crt-line"><div><div class="crt-kicker">CURSORGIFT // UPGRADE CRT</div><div class="crt-terminal-title">АПГРЕЙД-ТЕРМИНАЛ</div></div><span class="crt-status ${wheelStage==='result'?(wheelWillWin?'':'err'):'warn'}">${st}</span></div>`;
}
function renderCrtStakeMini(){
  if(!wheelStake) return '';
  const img=wheelGiftImage(wheelStake);
  return `<div style="display:flex;align-items:center;gap:10px;margin-top:12px;padding:10px;border-radius:14px;background:rgba(0,0,0,.28);border:1px solid rgba(90,255,180,.14)">
    <div class="crt-gift-img" style="width:48px;height:48px;margin:0">${img?`<img src="${esc(img)}" onerror="this.style.display='none';this.parentElement.textContent='🎁'">`:'🎁'}</div>
    <div style="min-width:0;flex:1"><div style="font-size:11px;font-weight:950;color:#eafff2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(wheelStake.name)}</div><div style="font-size:9px;color:#88a99a;margin-top:2px">ставка · ${wheelStake.floor.toFixed(2)} TON</div></div>
  </div>`;
}
function renderCrtScreen(){
  const testGifts = getTestGifts();
  const noWallet = !walletAddress && !testGifts.length;
  const stakes = getWheelStakeItems();
  const off = (wheelStage==='result' && wheelResultPhase==='off') ? 'crt-off' : ((wheelStage==='result' && wheelResultPhase==='fade') ? 'crt-fade' : '');
  const stat = (wheelStaticFlash || (wheelStage==='result' && wheelResultPhase==='static')) ? 'crt-static' : '';
  let inner='';
  if(noWallet){
    inner = `${renderCrtHeader()}<div class="crt-empty"><div class="big">📺</div><h3>КОШЕЛЁК НЕ ПОДКЛЮЧЁН</h3><p>Терминал апгрейда видит подарки из TON-кошелька. Для проверки можно выдать тестовый подарок.</p><button class="crt-connect" onclick="connectTonWallet()">🔗 Подключить кошелёк</button><button class="crt-connect" style="margin-left:8px;background:linear-gradient(135deg,#22d47a,#4d9fff);color:#00130a" onclick="addTestGift()">🎁 Выдать тест</button></div>`;
  } else if(!stakes.length){
    inner = `${renderCrtHeader()}<div class="crt-empty"><div class="big">📭</div><h3>ИНВЕНТАРЬ ПУСТ</h3><p>В подключённом кошельке не найдено Telegram Gifts. Баланс: ${fmtTon(walletBalance,4)} TON. Можно выдать тестовый подарок для проверки.</p><button class="crt-connect" onclick="refreshWalletData()">↻ Обновить</button><button class="crt-connect" style="margin-left:8px;background:linear-gradient(135deg,#22d47a,#4d9fff);color:#00130a" onclick="addTestGift()">🎁 Выдать тест</button></div>`;
  } else if(wheelStage==='idle'){
    inner = `${renderCrtHeader()}<div class="crt-terminal-sub">Выбери подарок ниже. После выбора монитор поймает сигнал, покажет помехи и предложит цель апгрейда.</div><div style="margin-top:18px;font-size:10px;color:#5affb4;line-height:1.8">&gt; INVENTORY: ${stakes.length} GIFTS<br>&gt; WALLET: ${esc(walletAddress ? shortAddr(walletAddress) : 'TEST MODE')}<br>&gt; STATUS: READY</div>`;
  } else if(wheelStage==='target'){
    const targets=getWheelTargets();
    inner = `${renderCrtHeader()}${renderCrtStakeMini()}<div class="crt-terminal-sub">Помехи прошли. Теперь выбери, что хочешь получить за обмен:</div><div class="crt-targets">${targets.map(t=>`<div class="crt-target" onclick="selectWheelTarget('${t.slug}')"><div class="crt-target-row"><img src="${t.image}" onerror="this.style.opacity=.25"><div style="min-width:0;flex:1"><div class="crt-target-name">${esc(t.name)}</div><div class="crt-target-price">${t.floor.toFixed(2)} TON</div></div></div></div>`).join('')}</div>`;
  } else if(wheelStage==='ready'){
    const ch=wheelChance;
    inner = `${renderCrtHeader()}${renderCrtStakeMini()}<div style="display:flex;align-items:center;gap:10px;margin-top:10px"><div style="font-size:22px">➜</div><div class="crt-gift-img" style="width:58px;height:58px;margin:0"><img src="${wheelUpgradeTarget.image}" onerror="this.style.display='none';this.parentElement.textContent='🎁'"></div><div style="min-width:0"><div style="font-size:12px;font-weight:950;color:#eafff2">${esc(wheelUpgradeTarget.name)}</div><div style="font-size:10px;color:#ffd36b">цель · ${wheelUpgradeTarget.floor.toFixed(2)} TON</div></div></div><div class="crt-chance"><div class="crt-line" style="margin-bottom:8px"><span style="font-size:10px;color:#8cffc8;font-weight:950">ШАНС УСПЕХА</span><b style="font-size:18px;color:${ch>45?'#22d47a':ch>18?'#f0b429':'#ff4d6a'}">${ch}%</b></div><div class="crt-meter"><div class="crt-meter-fill" style="width:${ch}%"></div></div><button class="crt-upgrade-btn" onclick="doWheelSpin()">▶ ЗАПУСТИТЬ РУЛЕТКУ</button></div>`;
  } else if(wheelStage==='spin'){
    const deg=Math.max(7, Math.min(317, wheelChance*3.6));
    const from=-90-deg/2;
    inner = `${renderCrtHeader()}<div class="crt-terminal-sub">Стрелка запущена. Зелёная зона — выигрыш, пустота — проигрыш.</div><div class="crt-wheelbox"><div class="crt-dial" style="background:conic-gradient(from ${from}deg,rgba(34,212,122,.95) 0deg ${deg}deg,rgba(255,255,255,.045) ${deg}deg 360deg)"></div><div class="crt-needle" id="crtNeedle"></div></div><div class="crt-wheel-legend"><span style="color:#74ffbd">зелёное = WIN</span><span style="color:#ff8fa0">пустота = ERROR</span></div><div class="crt-spin-caption">TARGET: ${esc(wheelUpgradeTarget?.name||'—')} · ${wheelChance}%</div>`;
  } else if(wheelStage==='result'){
    inner = `<div class="crt-result"><div class="crt-result-icon" style="color:${wheelWillWin?'#22d47a':'#ff4d6a'}">${wheelWillWin?'🏆':'⛔'}</div><div class="crt-result-title ${wheelWillWin?'win':'lose'}">${wheelWillWin?'Вы улучшили! Поздравляем':'Ошибка... Проиграли'}</div><div class="crt-result-sub">${wheelWillWin?`Терминал выдал ${esc(wheelUpgradeTarget?.name||'подарок')}. Шанс был ${wheelChance}%.`:`Сигнал оборвался вне зоны выигрыша. Шанс был ${wheelChance}%. Сейчас монитор погаснет...`}</div></div>${wheelResultPhase==='off'?'<div class="crt-offline"></div>':''}`;
  }
  return `<div class="crt-screen ${stat} ${off}"><div class="crt-noise"></div><div class="crt-content">${inner}</div></div>`;
}
function renderWheelInventory(){
  const stakes=getWheelStakeItems();
  if(!stakes.length) return '';
  return `<div class="crt-panel"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><div class="crt-panel-title" style="margin-bottom:0">1. ВЫБЕРИ ПОДАРОК ДЛЯ АПГРЕЙДА</div>${getTestGifts().length?`<button onclick="clearTestGifts()" style="font-size:9px;color:#ff8fa0;background:rgba(255,77,106,.08);border:1px solid rgba(255,77,106,.18);border-radius:9px;padding:5px 8px">очистить тест</button>`:''}</div><div class="crt-inv">${stakes.map(st=>{const img=wheelGiftImage(st);return `<div class="crt-gift ${wheelStakeKey===st.key?'on':''}" onclick="selectWheelStake('${st.key}')"><div class="crt-gift-img">${img?`<img src="${esc(img)}" onerror="this.style.display='none';this.parentElement.textContent='🎁'">`:'🎁'}</div><div class="crt-gift-name">${esc(st.name)}</div><div class="crt-gift-price">≈ ${st.floor.toFixed(2)} TON</div></div>`}).join('')}</div></div>`;
}
function renderWheel(){
  const pg=document.getElementById('pg-wheel'); if(!pg)return;
  if(!wheelStage) wheelStage='idle';
  pg.innerHTML=`<div class="crt-page">
    <div class="crt-top"><button class="back" onclick="go('market')">‹</button><div><h1>Pepe Upgrade</h1><p>CRT-монитор · помехи · шанс апгрейда</p></div><div class="crt-live"><span class="online-count">${onlineCount}</span></div></div>
    <div class="crt-machine"><div class="crt-monitor">${renderCrtScreen()}<div class="crt-vents"><i></i><i></i><i></i></div><div class="crt-led"></div><div class="crt-brand">CURSOR-95</div></div><div class="crt-stand"></div><div class="crt-base"></div></div>
    ${wheelStage==='idle'?renderWheelInventory():''}
    ${(wheelStage==='result'&&wheelResultPhase==='off')?`<div class="crt-actions"><button onclick="resetWheelCrt()">↻ Ещё раз</button><button class="primary" onclick="go('market')">🏪 На рынок</button></div>`:''}
  </div>`;
  if(wheelStage==='spin') setTimeout(startWheelNeedleAnimation,80);
}
function selectWheelStake(key){
  const item=getWheelStakeItems().find(x=>x.key===key); if(!item || wheelSpinning)return;
  wheelStakeKey=key; wheelStake=item; wheelUpgradeTarget=null; wheelChance=0; wheelStage='target'; wheelTapeItems=[]; wheelWillWin=false; wheelResultPhase='text';
  triggerCrtStatic(820);
}
function selectWheelTarget(slug){
  if(!wheelStake || wheelSpinning)return;
  wheelUpgradeTarget=getWheelTargets().find(t=>t.slug===slug) || null;
  if(!wheelUpgradeTarget)return;
  wheelChance=calcWheelChance(wheelStake,wheelUpgradeTarget);
  wheelStage='ready'; wheelResultPhase='text';
  renderWheel(); playCrtStatic(260);
}
function buildWheelTapeItems(win){
  const pool=GIFTS.map(g=>({name:g.name,image:thumb(g.slug)}));
  const items=[];
  for(let i=0;i<36;i++) items.push(pool[Math.floor(Math.random()*pool.length)]||{name:'SIGNAL',image:''});
  wheelFinalIndex=28;
  if(win){ items[wheelFinalIndex]={name:wheelUpgradeTarget.name,image:wheelUpgradeTarget.image}; }
  else {
    const lose=pool.find(x=>x.name!==wheelUpgradeTarget?.name) || {name:'ERROR',image:'',fail:true};
    items[wheelFinalIndex]={...lose, name:'ERROR', fail:true};
  }
  return items;
}
function doWheelSpin(){
  if(!wheelStake||!wheelUpgradeTarget||wheelSpinning)return;
  wheelSpinning=true;
  wheelWillWin = Math.random()*100 < wheelChance;
  wheelResultPhase='text';
  const deg=Math.max(7, Math.min(317, wheelChance*3.6));
  const center=-90;
  let finalLocal;
  if(wheelWillWin) finalLocal = center + (Math.random()-.5) * Math.max(4, deg*.72);
  else finalLocal = center + deg/2 + 18 + Math.random()*(360-deg-36);
  wheelNeedleAngle = 360*7 + finalLocal;
  wheelStage='spin';
  renderWheel();
  startCrtSpinSound(7000);
  setTimeout(()=>{
    stopCrtSpinSound();
    wheelStage='result';
    wheelSpinning=false;
    if(wheelWillWin) spawnConfetti();
    renderWheel();
    setTimeout(()=>{
      if(curTab!=='wheel' || wheelStage!=='result') return;
      wheelResultPhase='static';
      renderWheel();
      playCrtStatic(1800);
      setTimeout(()=>{
        if(curTab!=='wheel' || wheelStage!=='result') return;
        wheelResultPhase='fade';
        renderWheel();
        setTimeout(()=>{
          if(curTab!=='wheel' || wheelStage!=='result') return;
          wheelResultPhase='off';
          renderWheel();
        },2600);
      },1800);
    },3000);
  },7050);
}
function startWheelNeedleAnimation(){
  const needle=document.getElementById('crtNeedle');
  if(!needle)return;
  needle.style.transition='none';
  needle.style.transform='rotate(0deg)';
  void needle.offsetWidth;
  needle.style.transition='transform 6.8s cubic-bezier(.08,.72,.04,1)';
  needle.style.transform=`rotate(${wheelNeedleAngle}deg)`;
}
function resetWheelCrtState(){
  wheelStakeKey=null; wheelStake=null; wheelUpgradeTarget=null; wheelChance=0; wheelStage='idle'; wheelSpinning=false; wheelTapeItems=[]; wheelWillWin=false; wheelResultPhase='text'; wheelStaticFlash=false; stopCrtSpinSound();
}
function resetWheelCrt(){
  resetWheelCrtState();
  renderWheel();
}

// ═══ NEWS ═══
function renderNews(){
  // Сортируем по абсолютному изменению
  const sorted=[...GIFTS].sort((a,b)=>Math.abs(prices[b.slug]?.change24h||0)-Math.abs(prices[a.slug]?.change24h||0));
  const topUp=[...GIFTS].sort((a,b)=>(prices[b.slug]?.change24h||0)-(prices[a.slug]?.change24h||0))[0];
  const topDown=[...GIFTS].sort((a,b)=>(prices[a.slug]?.change24h||0)-(prices[b.slug]?.change24h||0))[0];
  const topVol=[...GIFTS].sort((a,b)=>(prices[b.slug]?.vol24h||0)-(prices[a.slug]?.vol24h||0))[0];
  const topSales=[...GIFTS].sort((a,b)=>(prices[b.slug]?.sales24h||0)-(prices[a.slug]?.sales24h||0))[0];

  const ts={
    bullish:{c:'#22d47a',bg:'rgba(34,212,122,.05)',br:'rgba(34,212,122,.15)',l:'📈 РОСТ'},
    bearish:{c:'#ff4d6a',bg:'rgba(255,77,106,.05)',br:'rgba(255,77,106,.15)',l:'📉 ПАДЕНИЕ'},
    neutral:{c:'#4d9fff',bg:'rgba(77,159,255,.05)',br:'rgba(77,159,255,.15)',l:'📰 РЫНОК'},
    hot:{c:'#f0b429',bg:'rgba(240,180,41,.05)',br:'rgba(240,180,41,.15)',l:'🔥 АКТИВНОСТЬ'},
    new:{c:'#c77dff',bg:'rgba(199,125,255,.05)',br:'rgba(199,125,255,.15)',l:'⭐ НОВЫЙ'}
  };
  const ft=d=>{const dd=Date.now()-d;if(dd<3600000)return~~(dd/60000)+' мин';if(dd<86400000)return~~(dd/3600000)+' ч';return~~(dd/86400000)+' д';};

  // Динамические новости на основе реальных данных
  const news=[];
  
  if(topUp){
    const p=prices[topUp.slug]||{};
    const ch=p.change24h||0;
    news.push({
      e: ch>10?'🚀':ch>5?'📈':'⬆️',
      t:`${topUp.name} ${ch>10?'резко растёт':ch>5?'лидирует по росту':'показывает рост'}`,
      b:`+${ch}% за 24ч · Floor: ${(p.floor||0).toFixed(2)} TON · $${((p.floor||0)*tonUsd).toFixed(0)} · Объём: ${(p.vol24h||0).toFixed(0)} TON`,
      gid:topUp.slug, tp:'bullish', time:Date.now()-(Math.random()*1800000), tags:['#рост','#live']
    });
  }

  if(topDown){
    const p=prices[topDown.slug]||{};
    const ch=p.change24h||0;
    news.push({
      e: ch<-15?'💥':ch<-10?'📉':'⬇️',
      t:`${topDown.name} ${ch<-15?'сильно падает':ch<-10?'падает':'снижается'}`,
      b:`${ch}% за 24ч · Floor: ${(p.floor||0).toFixed(2)} TON · Сделок: ${p.sales24h||0} · Listed: ${p.listed||0}`,
      gid:topDown.slug, tp:'bearish', time:Date.now()-(Math.random()*3600000), tags:['#падение','#коррекция']
    });
  }

  if(topVol){
    const p=prices[topVol.slug]||{};
    news.push({
      e:'🔥',
      t:`${topVol.name} — максимальный объём торгов`,
      b:`Объём 24ч: ${(p.vol24h||0).toFixed(0)} TON ($${((p.vol24h||0)*tonUsd).toFixed(0)}) · ${p.sales24h||0} сделок · Floor ${(p.floor||0).toFixed(2)} TON`,
      gid:topVol.slug, tp:'hot', time:Date.now()-(Math.random()*5400000), tags:['#объём','#активность']
    });
  }

  if(topSales && topSales.slug!==topVol?.slug){
    const p=prices[topSales.slug]||{};
    news.push({
      e:'<i class="ton-icon-v31"></i>',
      t:`${topSales.name} — больше всего продаж`,
      b:`${p.sales24h||0} сделок за 24ч · Floor: ${(p.floor||0).toFixed(2)} TON · Объём: ${(p.vol24h||0).toFixed(0)} TON`,
      gid:topSales.slug, tp:'hot', time:Date.now()-(Math.random()*7200000), tags:['#продажи']
    });
  }

  // Новые подарки
  const newGifts=GIFTS.filter(g=>g.isNew);
  newGifts.slice(0,2).forEach(g=>{
    news.push({e:'🆕',t:`Новый подарок: ${g.name}`,b:`Появился на рынке · Floor: ${(prices[g.slug]?.floor||0).toFixed(2)} TON`,gid:g.slug,tp:'new',time:Date.now()-300000,tags:['#новый']});
  });

  // TON курс
  news.push({
    e:'💹',
    t:`TON/USD = $${tonUsd.toFixed(3)} · ${tonUsd>2.5?'Рост':'Снижение'} курса`,
    b:`Текущий курс обновляется каждые 30 секунд с TON API · Источник: tonapi.io`,
    gid:null, tp:tonUsd>2.5?'bullish':'bearish', time:Date.now()-600000, tags:['#ton','#курс']
  });

  news.push({
    e:'📊',
    t:`Рынок: ${GIFTS.length} коллекций отслеживается`,
    b:`Данные обновляются каждые 20 секунд с Portal Market. Общий объём: ${GIFTS.reduce((s,g)=>s+(prices[g.slug]?.vol24h||0),0).toFixed(0)} TON/24ч`,
    gid:null, tp:'neutral', time:Date.now()-86400000, tags:['#рынок','#portal']
  });

  // Сортируем по времени (новые первые)
  news.sort((a,b)=>b.time-a.time);

  document.getElementById('pg-news').innerHTML=`
<div style="background:linear-gradient(160deg,#0a1525 0%,#080810 55%);padding:20px 16px 16px;border-bottom:1px solid rgba(77,159,255,.1);position:relative;overflow:hidden">
<div style="position:absolute;top:-28px;left:-18px;width:110px;height:110px;background:radial-gradient(circle,rgba(77,159,255,.14) 0%,transparent 70%);border-radius:50%"></div>
<div style="position:relative">
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
<div style="display:flex;align-items:center;gap:6px"><div style="width:6px;height:6px;border-radius:50%;background:#4d9fff;animation:pulse 2s infinite"></div><span style="font-size:10px;color:#4d9fff;font-weight:700">LIVE · Обновляется из Portal Market</span></div>
<div class="online-badge"><div class="online-dot"></div><span style="font-size:10px;color:#22d47a;font-weight:700"><span class="online-count">${onlineCount}</span> онлайн</span></div>
</div>
<h1 style="font-size:22px;font-weight:900">📰 CursorGift News</h1>
<p style="font-size:11px;color:#5070a0;margin-top:2px">TON $${tonUsd.toFixed(3)} · ${GIFTS.length} коллекций · Авто-обновление</p>
</div></div>
<div style="padding:14px 16px 0">
<div style="font-size:10px;font-weight:700;color:#505070;margin-bottom:10px;letter-spacing:.5px">⚡ ТОП ДВИЖЕНИЯ 24Ч</div>
<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">
${sorted.slice(0,8).map(g=>{const p=prices[g.slug]||{},up=p.change24h>=0;return`<div onclick="openDetail('${g.slug}')" style="flex:0 0 auto;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:10px 12px;text-align:center;cursor:pointer;min-width:80px;transition:transform .15s" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform=''">
<div style="width:42px;height:42px;margin:0 auto 4px;border-radius:10px;overflow:hidden;background:rgba(0,0,0,.2)"><img src="${thumb(g.slug)}" style="width:100%;height:100%;object-fit:contain" onerror="this.style.display='none'"/></div>
<div style="font-size:9px;font-weight:700;color:#d0d0f0;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:78px">${g.name}</div>
<div style="font-size:11px;font-weight:800;color:${up?'#22d47a':'#ff4d6a'}">${up?'+':''}${p.change24h||0}%</div>
<div style="font-size:9px;color:#505070;margin-top:1px">${(p.floor||0).toFixed(2)} T</div>
</div>`;}).join('')}
</div></div>
<div style="padding:14px 16px">
${news.map((n,i)=>{const s=ts[n.tp],g=n.gid?GIFTS.find(x=>x.slug===n.gid):null;return`<div onclick="${g?`openDetail('${n.gid}')`:'void 0'}" style="background:${s.bg};border:1px solid ${s.br};border-radius:18px;padding:14px;margin-bottom:11px;cursor:${g?'pointer':'default'};animation:fadeUp .25s ease ${i*.07}s both">
<div style="display:flex;align-items:flex-start;gap:10px"><div style="font-size:26px;flex-shrink:0">${n.e}</div>
<div style="flex:1;min-width:0">
<div style="display:flex;align-items:center;gap:7px;margin-bottom:5px;flex-wrap:wrap">
<span style="font-size:8px;font-weight:800;letter-spacing:.5px;padding:2px 6px;border-radius:5px;color:${s.c};background:${s.c}18;border:1px solid ${s.c}25">${s.l}</span>
<span style="font-size:9px;color:#404060">${ft(n.time)} назад · Live</span>
</div>
<div style="font-size:14px;font-weight:800;margin-bottom:5px;line-height:1.25">${n.t}</div>
<div style="font-size:12px;color:#7080a0;line-height:1.5">${n.b}</div>
${g?`<div style="display:inline-flex;align-items:center;gap:7px;margin-top:9px;background:rgba(0,0,0,.3);border-radius:9px;padding:5px 11px">
<img src="${thumb(g.slug)}" style="width:26px;height:26px;object-fit:contain;border-radius:6px" onerror="this.style.display='none'"/>
<div><div style="font-size:10px;font-weight:700;color:#d0d0f0">${g.name}</div><div style="font-size:9px;color:#7c5cff">${(prices[g.slug]?.floor||0).toFixed(2)} TON</div></div></div>`:''}
<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px">${n.tags.map(t=>`<span style="font-size:9px;color:#5060a0;background:rgba(80,96,160,.1);padding:2px 7px;border-radius:5px">${t}</span>`).join('')}</div>
</div></div></div>`;}).join('')}
</div>`;
}

// ═══ PROFILE ═══

function renderProfile(){
  const inv=profileGiftList();
  const u=TG_USER||{};
  document.getElementById('pg-prof').innerHTML=`<div style="animation:fadeIn .25s ease">
    <div style="padding: 40px 16px 30px; text-align:center;">
        <div style="margin-bottom:20px; position:relative; display:inline-block;">
            ${buildAvatar(u, 100)}
            ${u.isPremium ? '<div style="position:absolute; bottom:0; right:0; background:#f0b429; border-radius:50%; width:26px; height:24px; display:flex; align-items:center; justify-content:center; border:3px solid #080810; font-size:12px;">⭐</div>' : ''}
        </div>
        <h1 style="font-size:26px; font-weight:950; margin:0;">${esc(u.name)}</h1>
        <div style="color:#7c5cff; font-weight:600; font-size:14px; margin-top:4px;">${esc(u.displayUsername || u.username || 'Без username')}</div>
    </div>
    <div class="glass-card" style="margin: 0 16px 20px; display:flex; justify-content:space-around; padding:22px;">
        <div style="text-align:center;"><div style="font-size:22px; font-weight:900;">${inv.length}</div><div style="font-size:10px; color:rgba(255,255,255,0.4); font-weight:700; margin-top:4px;">GIFTS</div></div>
        <div style="text-align:center;"><div style="font-size:22px; font-weight:900; color:#f0b429;"><i class="ton-icon-v31"></i>${walletBalance.toFixed(2)}</div><div style="font-size:10px; color:rgba(255,255,255,0.4); font-weight:700; margin-top:4px;">TON</div></div>
        <div style="text-align:center;"><div style="font-size:22px; font-weight:900; color:#4d9fff;">${onlineCount}</div><div style="font-size:10px; color:rgba(255,255,255,0.4); font-weight:700; margin-top:4px;">ONLINE</div></div>
    </div>
    ${walletCardHtml()}
    <div style="padding: 20px 16px 120px;"><div style="font-size:13px; font-weight:800; color:rgba(255,255,255,0.5); margin-bottom:15px; letter-spacing:1px;">MY INVENTORY</div><div id="ptcontent">${pInv(inv)}</div></div>
  </div>`;
}


function switchPTab(t){
  ['inv','wheel','settings'].forEach(x=>{const b=document.getElementById('ptb-'+x);if(b){b.style.borderBottom=t===x?'2px solid #7c5cff':'2px solid transparent';b.style.color=t===x?'#a480ff':'#505070';}});
  const inv=profileGiftList();
  const el=document.getElementById('ptcontent');if(!el)return;
  if(t==='inv')el.innerHTML=pInv(inv);
  else if(t==='wheel')el.innerHTML=`<div style="animation:fadeIn .2s ease"><div style="background:rgba(255,255,255,.03);border-radius:18px;padding:24px;text-align:center;border:1px solid rgba(255,255,255,.06)"><div style="font-size:42px;margin-bottom:12px">🎡</div><div style="font-size:16px;font-weight:700;color:#a480ff;margin-bottom:6px">История игр</div><div style="font-size:12px;color:#505070;margin-bottom:16px">Сыграй в Колесо Апгрейда!</div><button onclick="go('wheel')" style="padding:12px 24px;border-radius:14px;background:linear-gradient(135deg,#7c5cff,#5c3dff);color:#fff;font-size:13px;font-weight:700;box-shadow:0 4px 16px rgba(124,92,255,.4)">🎡 Открыть</button></div></div>`;
  else el.innerHTML=pSettings();
}

function pInv(inv){
  if (!walletAddress) {
    return `<div style="animation:fadeIn .2s ease;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:18px;padding:26px 18px;text-align:center">
      <div style="font-size:42px;margin-bottom:12px">🎁</div>
      <div style="font-size:16px;font-weight:800;color:#a480ff;margin-bottom:6px">Подключи кошелёк</div>
      <div style="font-size:12px;color:#606080;line-height:1.6;margin-bottom:16px">После подключения мы покажем твои Telegram Gifts/NFT из TON-кошелька. Если подарков нет — список будет пустым.</div>
      <button onclick="connectTonWallet()" style="padding:12px 22px;border-radius:14px;background:linear-gradient(135deg,#4d9fff,#7c5cff);color:#fff;font-size:13px;font-weight:800">🔗 Подключить кошелёк</button>
    </div>`;
  }
  if (walletLoading) {
    return `<div style="text-align:center;padding:28px;color:#606080"><div style="font-size:24px;margin-bottom:8px;animation:spin 1.5s linear infinite;display:inline-block">⏳</div><div style="font-size:13px">Загружаем баланс и подарки...</div></div>`;
  }
  if (!inv.length) {
    return `<div style="animation:fadeIn .2s;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:18px;padding:26px 18px;text-align:center">
      <div style="font-size:42px;margin-bottom:12px">📭</div>
      <div style="font-size:16px;font-weight:800;color:#d0d0f0;margin-bottom:6px">Подарков не найдено</div>
      <div style="font-size:12px;color:#606080;line-height:1.6;margin-bottom:16px">В этом TON-кошельке не найдено Telegram Gifts. Баланс: <b style="color:#f0b429">${fmtTon(walletBalance,4)} TON</b>.</div>
      <button onclick="refreshWalletData()" style="padding:10px 18px;border-radius:12px;background:rgba(77,159,255,.12);border:1px solid rgba(77,159,255,.25);color:#4d9fff;font-size:12px;font-weight:800">↻ Проверить ещё раз</button>
    </div>`;
  }
  return `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;animation:fadeIn .2s ease">
${inv.map((g,i)=>`<div onclick="window.open('${esc(g.url||'#')}','_blank')" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:16px;overflow:hidden;cursor:pointer;animation:fadeUp .25s ease ${i*.07}s both">
<div style="width:100%;padding-bottom:80%;position:relative;background:rgba(0,0,0,.2)">${g.image?`<img src="${esc(g.image)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;image-rendering:-webkit-optimize-contrast" onerror="this.style.opacity=.2"/>`:`<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:34px">🎁</div>`}</div>
<div style="padding:9px 10px 11px">
<div style="font-size:12px;font-weight:700;color:#d0d0f0;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(g.name)}</div>
<div style="font-size:10px;color:#7c5cff;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(g.collection)}</div>
<div style="font-size:9px;color:#505070;margin-top:4px;font-family:monospace">${esc(shortAddr(g.address))}</div>
<div style="display:flex;gap:6px;margin-top:8px">
<button onclick="event.stopPropagation();window.open('${esc(g.url||'#')}','_blank')" style="flex:1;padding:6px;border-radius:8px;background:rgba(124,92,255,.12);border:1px solid rgba(124,92,255,.25);color:#a480ff;font-size:9px;font-weight:700">Открыть ↗</button>
<button onclick="event.stopPropagation();openGiftAction('${GIFTS[0]?.slug||'gift'}','withdraw')" style="flex:1;padding:6px;border-radius:8px;background:rgba(77,159,255,.1);border:1px solid rgba(77,159,255,.25);color:#4d9fff;font-size:9px;font-weight:700">Вывод</button>
</div></div></div>`).join('')}
</div>`;
}

function pSettings(){
  const u=TG_USER||{};
  return `<div style="animation:fadeIn .2s ease">
<div style="background:rgba(255,255,255,.03);border-radius:16px;padding:16px;margin-bottom:12px;border:1px solid rgba(255,255,255,.06)">
<div style="font-size:10px;color:#505070;font-weight:700;margin-bottom:12px;letter-spacing:.5px">АККАУНТ TELEGRAM</div>
<div style="display:flex;align-items:center;gap:12px">${avatarHtml(52)}
<div><div style="font-size:15px;font-weight:800;color:#f0f0ff">${esc(u.name||'—')}</div><div style="font-size:12px;color:#7c5cff">${esc(u.displayUsername || u.username || 'Без username')}</div><div style="font-size:10px;color:#404060;margin-top:2px">ID: ${esc(u.id||'—')}</div></div></div>
</div>
<div style="background:rgba(255,255,255,.03);border-radius:16px;padding:16px;margin-bottom:12px;border:1px solid rgba(255,255,255,.06)">
<div style="font-size:10px;color:#505070;font-weight:700;margin-bottom:12px;letter-spacing:.5px">ДАННЫЕ</div>
${[['🔗 Источник цен','Portal Market'],['⏱ Обновление','Каждые 20 сек'],['📊 Коллекций',String(GIFTS.length)],['💱 TON/USD','$'+tonUsd.toFixed(3)]].map(([l,v])=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)"><span style="font-size:12px;color:#606080">${l}</span><span style="font-size:12px;font-weight:700;color:#c0c0e0">${v}</span></div>`).join('')}
</div>
<div style="background:rgba(255,255,255,.03);border-radius:16px;padding:16px;margin-bottom:12px;border:1px solid rgba(255,255,255,.06)">
<div style="font-size:10px;color:#505070;font-weight:700;margin-bottom:12px;letter-spacing:.5px">КОШЕЛЁК</div>
${[['<i class="ton-icon-v31"></i> Адрес',walletAddress?shortAddr(walletAddress):'не подключён'],['💰 Баланс',fmtTon(walletBalance,4)+' TON'],['🎁 Telegram Gifts',String(walletGifts.length)],['🕒 Обновлено',walletLastUpdate?new Date(walletLastUpdate).toLocaleTimeString('ru'):'—']].map(([l,v])=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04);gap:12px"><span style="font-size:12px;color:#606080">${l}</span><span style="font-size:12px;font-weight:700;color:#c0c0e0;text-align:right">${esc(v)}</span></div>`).join('')}
</div>
<a href="https://fragment.com/gifts" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:13px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#808090;font-size:13px;font-weight:700">🔗 Fragment.com</a>
</div>`;
}

// ═══ INIT ═══
async function init() {
  initTgUser();
  await loadProfileFallbackFromUrl();
  initTonConnect();
  bindFloatingNavAutoHide();
  setTimeout(saveProfile, 2500);
  if (walletAddress) setTimeout(()=>loadWalletData(true), 1200);
  const st=document.getElementById('sstat');

  const statuses=['Подключаемся к Portal Market...','Получаем цены...','Загружаем коллекции...'];
  let si=0;
  const stInt=setInterval(()=>{ si++; if(si<statuses.length&&st){st.style.opacity='0';setTimeout(()=>{st.textContent=statuses[si];st.style.transition='opacity .3s';st.style.opacity='1';},200);} },700);

  try {
    const ok=await fetchPrices();
    clearInterval(stInt);

    if(!ok||GIFTS.length===0){
      if(st)st.textContent='Повторная попытка...';
      await new Promise(r=>setTimeout(r,2500));
      await fetchPrices();
    }

    if(st)st.textContent=`✅ ${GIFTS.length} подарков загружено`;
    splashReady=true;
    startSplashWhenReady();

    connectWS();
    setInterval(fetchPrices,20000);
    setInterval(()=>{countdown=Math.max(0,countdown-1);const tEl=document.getElementById('update-timer');if(tEl)tEl.textContent='↻ '+countdown+'с';if(countdown===0)countdown=20;},1000);

  } catch(e) {
    clearInterval(stInt);
    if(st)st.textContent='Ошибка: '+e.message;
    splashReady=true;
    setTimeout(()=>{ if(!splashDone)splashClick(); },2000);
  }
}

// ═══ TABLET SPLASH ANIMATION ════════════════════════════════════
const SPLASH_GIFTS = [
  { slug:'snoopdogg',    name:'Snoop Dogg',    price:'3.16',  color:'#ffd700' },
  { slug:'heroichelmet', name:'Heroic Helmet', price:'148.8', color:'#4d9fff' },
  { slug:'plushpepe',    name:'Plush Pepe',    price:'4899',  color:'#22d47a' },
  { slug:'electricskull',name:'Elec. Skull',   price:'120',   color:'#c77dff' },
  { slug:'swisswatch',   name:'Swiss Watch',   price:'38.9',  color:'#f0b429' },
  { slug:'petsnake',     name:'Pet Snake',     price:'2.0',   color:'#ff6eb4' },
  { slug:'chillflame',   name:'Chill Flame',   price:'1.80',  color:'#ff4d6a' },
  { slug:'lightsword',   name:'Light Sword',   price:'3.29',  color:'#22d47a' },
];

const STATUSES = [
  'Загружаем рынок...',
  'Получаем цены...',
  'Подключаемся к Portal Market...',
  '114 подарков найдено',
  'Готово!'
];

function thumbUrl(slug) {
  return 'https://fragment.com/file/gifts/' + slug + '/thumb.webp';
}

function createGiftCard(gift, small) {
  var size = small ? 52 : 70;
  var el = document.createElement('div');
  el.style.cssText = [
    'width:' + size + 'px;',
    'background:#fff;',
    'border-radius:' + (small ? 8 : 10) + 'px;',
    'box-shadow:0 2px 8px rgba(0,0,0,.08);',
    'overflow:hidden;',
    'flex-shrink:0;',
    'border:1px solid rgba(0,0,0,.06);',
    'transition:transform .2s;'
  ].join('');

  var imgH = small ? 34 : 46;
  el.innerHTML =
    '<div style="height:' + imgH + 'px;display:flex;align-items:center;justify-content:center;padding:4px;">' +
      '<img src="' + thumbUrl(gift.slug) + '" style="max-width:100%;max-height:100%;object-fit:contain;" onerror="this.style.opacity=.3"/>' +
    '</div>' +
    '<div style="padding:2px 4px 4px;text-align:center;">' +
      '<div style="font-size:' + (small ? 5.5 : 7) + 'px;font-weight:700;color:#1a1a2e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + gift.name + '</div>' +
      '<div style="font-size:' + (small ? 6 : 7.5) + 'px;font-weight:800;color:#7c3aed;margin-top:1px;">' + gift.price + ' TON</div>' +
    '</div>';
  return el;
}

function createFlyingGift(gift, targetEl) {
  var tablet = document.getElementById('splash-tablet');
  if (!tablet) return;

  var tRect = tablet.getBoundingClientRect();
  var tCX = tRect.left + tRect.width / 2;
  var tCY = tRect.top + tRect.height / 2;

  var container = document.getElementById('flying-gifts');
  var el = document.createElement('div');
  el.style.cssText = 'position:absolute;z-index:10;pointer-events:none;will-change:transform,opacity;';

  // Стартовая позиция — случайная сторона экрана
  var side = Math.floor(Math.random() * 4);
  var sw = window.innerWidth, sh = window.innerHeight;
  var sx, sy;
  if (side === 0) { sx = Math.random() * sw; sy = -70; }
  else if (side === 1) { sx = sw + 70; sy = Math.random() * sh; }
  else if (side === 2) { sx = Math.random() * sw; sy = sh + 70; }
  else { sx = -70; sy = Math.random() * sh; }

  el.style.left = sx + 'px';
  el.style.top = sy + 'px';

  var size = 56;
  el.innerHTML =
    '<div style="width:' + size + 'px;height:' + size + 'px;background:#fff;border-radius:14px;' +
    'box-shadow:0 4px 20px rgba(0,0,0,.15);border:1px solid rgba(0,0,0,.06);' +
    'display:flex;align-items:center;justify-content:center;overflow:hidden;">' +
      '<img src="' + thumbUrl(gift.slug) + '" style="width:40px;height:40px;object-fit:contain;" onerror="this.style.opacity=.3"/>' +
    '</div>';

  container.appendChild(el);

  // Анимация полёта к центру планшета
  var startAngle = Math.random() * 720 - 360;
  var duration = 700 + Math.random() * 300;

  el.animate([
    { transform: 'translate(0,0) rotate(' + startAngle + 'deg) scale(1)', opacity: 0 },
    { transform: 'translate(0,0) rotate(' + startAngle + 'deg) scale(1)', opacity: 1, offset: 0.05 },
    { transform: 'translate(' + (tCX - sx - size/2) + 'px,' + (tCY - sy - size/2) + 'px) rotate(0deg) scale(0.6)', opacity: 0.8, offset: 0.85 },
    { transform: 'translate(' + (tCX - sx - size/2) + 'px,' + (tCY - sy - size/2) + 'px) rotate(0deg) scale(0)', opacity: 0 }
  ], {
    duration: duration,
    easing: 'cubic-bezier(.4,0,.2,1)',
    fill: 'forwards'
  }).onfinish = function() {
    el.remove();
    // Планшет слегка покачивается
    var t = document.getElementById('splash-tablet');
    if (t) {
      t.animate([
        { transform: t.style.transform || 'scale(1)' },
        { transform: (t.style.transform || 'scale(1)') + ' rotate(-1.5deg)' },
        { transform: (t.style.transform || 'scale(1)') + ' rotate(1deg)' },
        { transform: t.style.transform || 'scale(1)' }
      ], { duration: 300, easing: 'ease-out' });
    }
  };
}

function runTabletScroll(cards, onDone) {
  var scroll = document.getElementById('tablet-scroll');
  if (!scroll) { onDone(); return; }

  // Показываем все карточки
  cards.forEach(function(g) {
    scroll.appendChild(createGiftCard(g, true));
  });

  // Скролл вниз
  var total = scroll.scrollHeight - scroll.clientHeight;
  if (total <= 0) { setTimeout(onDone, 500); return; }

  var start = null;
  var dur = 1300; // синхронизировано с зумом

  function step(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / dur, 1);
    var ease = p < 0.5 ? 2*p*p : -1+(4-2*p)*p; // easeInOut
    scroll.scrollTop = ease * total;
    if (p < 1) requestAnimationFrame(step);
    else setTimeout(onDone, 400);
  }
  requestAnimationFrame(step);
}

function runTabletZoom(onDone) {
  var tablet = document.getElementById('splash-tablet');
  if (!tablet) { onDone(); return; }

  // Планшет надвигается — увеличивается и едет вверх как будто подносишь к глазам
  var anim = tablet.animate([
    { transform: 'scale(1) translateY(0px)',   opacity: 1 },
    { transform: 'scale(1.6) translateY(-20px)', opacity: 1, offset: 0.4 },
    { transform: 'scale(4) translateY(-60px)',  opacity: 1, offset: 0.75 },
    { transform: 'scale(9) translateY(-120px)', opacity: 0 }
  ], {
    duration: 1400,
    easing: 'cubic-bezier(.4,0,.6,1)',
    fill: 'forwards'
  });
  anim.onfinish = onDone;
}

function runSplashAnimation() {
  var tablet = document.getElementById('splash-tablet');
  var bottom = document.getElementById('splash-bottom');
  var statusEl = document.getElementById('splash-status');

  if (!tablet) { splashClick(); return; }

  // Шаг 1: Планшет появляется
  setTimeout(function() {
    tablet.style.transition = 'opacity .5s ease, transform .6s cubic-bezier(.34,1.56,.64,1)';
    tablet.style.opacity = '1';
    tablet.style.transform = 'scale(1)';
  }, 200);

  // Шаг 2: Лого появляется снизу
  setTimeout(function() {
    if (bottom) bottom.style.opacity = '1';
  }, 600);

  // Шаг 3: Подарки залетают один за одним
  var delay = 900;
  SPLASH_GIFTS.forEach(function(gift, i) {
    setTimeout(function() {
      createFlyingGift(gift, tablet);
      // Обновляем статус
      if (statusEl && STATUSES[i]) statusEl.textContent = STATUSES[i];
    }, delay + i * 220);
  });

  // Шаг 4: Прокрутка карточек внутри планшета
  var scrollStart = delay + SPLASH_GIFTS.length * 220 + 400;
  setTimeout(function() {
    if (statusEl) statusEl.textContent = '114 подарков найдено';
    // Зум и прокрутка ОДНОВРЕМЕННО
    if (statusEl) statusEl.textContent = 'Готово!';
    runTabletScroll(SPLASH_GIFTS, function() {
      // После прокрутки — завершаем
      splashClick();
    });
    // Зум начинается сразу вместе с прокруткой
    setTimeout(function() {
      runTabletZoom(function() {});
    }, 100);
  }, scrollStart);
}

// Запускаем как только данные загрузились
var _splashAnimStarted = false;
function startSplashWhenReady() {
  if (_splashAnimStarted) return;
  _splashAnimStarted = true;
  runSplashAnimation();
}
// ═══ END TABLET SPLASH ══════════════════════════════════════════

init();
</script>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js/v833ccba57c9e4d2798f2e76cebdd09a11778172276447" integrity="sha512-57MDmcccJXYtNnH+ZiBwzC4jb2rvgVCEokYN+L/nLlmO8rfYT/gIpW2A569iJ/3b+0UEasghjuZH/ma3wIs/EQ==" data-cf-beacon='{"version":"2024.11.0","token":"1954b47c125f43f8b4338b3c4f804e4f","server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'a013f7e74fe9bf32',t:'MTc3OTcwNjExMw=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
