import { useState } from "react";

const products = [
  { id: 1, name: "Hikvision 4MP Dome Camera", price: 2499, category: "cctv", badge: "Bestseller", img: "📷", desc: "IR Night Vision, IP66 Weatherproof", stock: true },
  { id: 2, name: "Dahua 8CH NVR Kit", price: 12999, category: "cctv", badge: "Kit", img: "🎥", desc: "8 Channel, 2TB HDD Included", stock: true },
  { id: 3, name: "CP Plus 2MP Bullet Camera", price: 1299, category: "cctv", badge: "Budget", img: "📹", desc: "Outdoor, 30m Night Vision", stock: true },
  { id: 4, name: "PTZ Speed Dome Camera", price: 8999, category: "cctv", badge: "Pro", img: "🔭", desc: "360° Rotation, 20x Optical Zoom", stock: false },
  { id: 5, name: "AMD Ryzen 5 5600X", price: 14999, category: "parts", badge: "Hot", img: "🔲", desc: "6 Core, 12 Thread, 4.6GHz Boost", stock: true },
  { id: 6, name: "Samsung 16GB DDR5 RAM", price: 5499, category: "parts", badge: "New", img: "💾", desc: "5600MHz, Desktop", stock: true },
  { id: 7, name: "Seagate 1TB NVMe SSD", price: 6999, category: "parts", badge: "", img: "💿", desc: "PCIe 4.0, 7000MB/s Read", stock: true },
  { id: 8, name: "MSI B550 Gaming Motherboard", price: 11999, category: "parts", badge: "Gaming", img: "🖥️", desc: "AM4, PCIe 4.0, WiFi 6", stock: true },
  { id: 9, name: "Mechanical Gaming Keyboard", price: 2999, category: "accessories", badge: "RGB", img: "⌨️", desc: "Blue Switch, TKL Layout", stock: true },
  { id: 10, name: "Logitech G502 Hero Mouse", price: 3499, category: "accessories", badge: "Popular", img: "🖱️", desc: "25600 DPI, 11 Programmable Buttons", stock: true },
  { id: 11, name: '27" FHD 165Hz Monitor', price: 16999, category: "accessories", badge: "Gaming", img: "🖵", desc: "IPS, 1ms Response, FreeSync", stock: true },
  { id: 12, name: "CAT6 Network Cable 50m", price: 1199, category: "accessories", badge: "", img: "🔌", desc: "Pure Copper, Outdoor Grade", stock: true },
];

const categories = [
  { id: "all", label: "All Products", icon: "◈" },
  { id: "cctv", label: "CCTV Systems", icon: "📷" },
  { id: "parts", label: "Computer Parts", icon: "🔲" },
  { id: "accessories", label: "Accessories", icon: "🖱️" },
];

const LOGO_URL = "https://i.postimg.cc/MGLZ91Mp/logo.png";

const ISquareLogo = ({ height = 48 }) => (
  <img src={LOGO_URL} alt="iSquare Technologies" style={{ height: height, width: "auto", objectFit: "contain" }} />
);

export default function ISquareTech() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [mobileMenu, setMobileMenu] = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} cart la add achu!`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = products.filter(p =>
    (category === "all" || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: "#0d0d14", minHeight: "100vh", color: "#e8e8e8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@300;400;600;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #f47920; border-radius: 2px; }
        .nav-link { cursor: pointer; padding: 8px 14px; color: #777; transition: all 0.2s; letter-spacing: 1px; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid transparent; font-family: 'Share Tech Mono', monospace; }
        .nav-link:hover, .nav-link.active { color: #f47920; border-bottom-color: #f47920; }
        .btn-primary { background: linear-gradient(135deg, #f47920 0%, #e05c00 100%); color: #fff; border: none; padding: 11px 24px; font-family: 'Share Tech Mono', monospace; font-size: 13px; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; transition: all 0.25s; clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%); font-weight: bold; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(244,121,32,0.45); filter: brightness(1.1); }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
        .btn-secondary { background: transparent; color: #f47920; border: 1px solid #f47920; padding: 10px 22px; font-family: 'Share Tech Mono', monospace; font-size: 13px; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; transition: all 0.2s; }
        .btn-secondary:hover { background: rgba(244,121,32,0.1); transform: translateY(-1px); }
        .btn-blue { background: linear-gradient(135deg, #1a5fa8, #0d3d70); color: #fff; border: none; padding: 11px 24px; font-family: 'Share Tech Mono', monospace; font-size: 13px; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; transition: all 0.25s; }
        .btn-blue:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,95,168,0.4); }
        .product-card { background: #13131e; border: 1px solid #1e1e30; transition: all 0.3s; position: relative; overflow: hidden; }
        .product-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #f47920, #1a5fa8); transform: scaleX(0); transition: transform 0.3s; transform-origin: left; }
        .product-card:hover { border-color: #f47920; transform: translateY(-5px); box-shadow: 0 20px 40px rgba(244,121,32,0.12); }
        .product-card:hover::before { transform: scaleX(1); }
        .input-field { background: #13131e; border: 1px solid #252538; color: #e8e8e8; padding: 12px 16px; font-family: 'Share Tech Mono', monospace; font-size: 13px; width: 100%; outline: none; transition: border-color 0.2s; }
        .input-field:focus { border-color: #f47920; box-shadow: 0 0 0 2px rgba(244,121,32,0.1); }
        .cat-btn { background: transparent; border: 1px solid #252538; color: #666; padding: 8px 16px; cursor: pointer; font-family: 'Share Tech Mono', monospace; font-size: 11px; letter-spacing: 1px; transition: all 0.2s; text-transform: uppercase; }
        .cat-btn.active, .cat-btn:hover { border-color: #f47920; color: #f47920; background: rgba(244,121,32,0.06); }
        .badge { font-size: 10px; padding: 3px 9px; background: linear-gradient(135deg, #f47920, #e05c00); color: #fff; font-weight: bold; letter-spacing: 1px; font-family: 'Share Tech Mono'; clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%); display: inline-block; }
        .toast { position: fixed; bottom: 24px; right: 24px; background: #13131e; border: 1px solid #f47920; border-left: 4px solid #f47920; color: #f47920; padding: 14px 20px; font-family: 'Share Tech Mono', monospace; font-size: 13px; z-index: 9999; animation: slideIn 0.3s ease; box-shadow: 0 8px 30px rgba(244,121,32,0.25); }
        @keyframes slideIn { from { transform: translateX(120px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 200; display: flex; justify-content: flex-end; }
        .cart-panel { background: #0d0d14; border-left: 1px solid #1e1e30; width: 420px; max-width: 100vw; height: 100vh; overflow-y: auto; display: flex; flex-direction: column; }
        .glow-orange { text-shadow: 0 0 30px rgba(244,121,32,0.4); }
        .grid-bg { background-image: linear-gradient(rgba(244,121,32,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(244,121,32,0.025) 1px, transparent 1px); background-size: 44px 44px; }
        .step { width: 30px; height: 30px; border: 1px solid #252538; display: flex; align-items: center; justify-content: center; font-size: 12px; font-family: 'Share Tech Mono'; flex-shrink: 0; }
        .step.active { border-color: #f47920; color: #f47920; background: rgba(244,121,32,0.12); }
        .step.done { border-color: #f47920; color: #fff; background: #f47920; }
        .contact-card { background: #13131e; border: 1px solid #1e1e30; padding: 20px; transition: border-color 0.2s; }
        .contact-card:hover { border-color: #f47920; }
        .section-tag { font-family: 'Share Tech Mono'; color: #f47920; font-size: 11px; letter-spacing: 4px; opacity: 0.8; }
        .payment-option { background: #13131e; border: 1px solid #252538; padding: 16px 20px; cursor: pointer; display: flex; align-items: center; gap: 14px; transition: all 0.2s; font-family: 'Exo 2'; font-size: 14px; }
        .payment-option:hover { border-color: #f47920; background: rgba(244,121,32,0.04); }
        .divider { height: 1px; background: linear-gradient(90deg, transparent, #f47920, #1a5fa8, transparent); margin: 40px 0; }
      `}</style>

      {/* Toast */}
      {toast && <div className="toast">✓ {toast}</div>}

      {/* Navbar */}
      <nav style={{ background: "#080810", borderBottom: "1px solid #1a1a28", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, height: 68 }}>
        <div onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
          <ISquareLogo height={44} />
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {[["home", "Home"], ["products", "Products"], ["about", "Contact"]].map(([p, label]) => (
            <span key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => setPage(p)}>{label}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="btn-secondary" style={{ padding: "7px 16px", fontSize: 11 }} onClick={() => setPage("auth")}>Login</button>
          <button onClick={() => setShowCart(true)} style={{ background: "none", border: "1px solid #252538", color: "#e8e8e8", padding: "7px 14px", cursor: "pointer", fontFamily: "'Share Tech Mono'", fontSize: 13, display: "flex", alignItems: "center", gap: 6, transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#f47920"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#252538"}>
            🛒
            {cartCount > 0 && <span style={{ background: "#f47920", color: "#fff", borderRadius: "50%", width: 20, height: 20, fontSize: 10, fontWeight: "bold", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* Cart Overlay */}
      {showCart && (
        <div className="overlay" onClick={() => setShowCart(false)}>
          <div className="cart-panel" onClick={e => e.stopPropagation()}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #1e1e30", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#080810" }}>
              <div>
                <div style={{ fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 18, color: "#f47920" }}>Shopping Cart</div>
                <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: "#555", marginTop: 2 }}>{cartCount} item{cartCount !== 1 ? "s" : ""}</div>
              </div>
              <button onClick={() => setShowCart(false)} style={{ background: "none", border: "1px solid #252538", color: "#888", cursor: "pointer", fontSize: 16, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#333", gap: 16 }}>
                <span style={{ fontSize: 56 }}>🛒</span>
                <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 13, color: "#444" }}>Cart empty ah iruku</span>
                <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => { setShowCart(false); setPage("products"); }}>Products Paarunga</button>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflow: "auto", padding: "8px 0" }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: "flex", gap: 14, padding: "16px 24px", borderBottom: "1px solid #131320" }}>
                      <div style={{ fontSize: 36, flexShrink: 0 }}>{item.img}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Exo 2'", fontWeight: 600, fontSize: 14, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                        <div style={{ color: "#f47920", fontFamily: "'Share Tech Mono'", fontSize: 14, fontWeight: "bold" }}>₹{(item.price * item.qty).toLocaleString()}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                          <button onClick={() => updateQty(item.id, -1)} style={{ background: "#1e1e30", border: "none", color: "#e8e8e8", width: 26, height: 26, cursor: "pointer", fontSize: 14 }}>−</button>
                          <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 13, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} style={{ background: "#1e1e30", border: "none", color: "#e8e8e8", width: 26, height: 26, cursor: "pointer", fontSize: 14 }}>+</button>
                          <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#ff4455", cursor: "pointer", marginLeft: "auto", fontSize: 11, fontFamily: "'Share Tech Mono'" }}>✕ Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "20px 24px", borderTop: "1px solid #1e1e30", background: "#080810" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "'Share Tech Mono'", fontSize: 12, color: "#555" }}>
                    <span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontFamily: "'Share Tech Mono'", fontSize: 12, color: "#555" }}>
                    <span>Shipping</span><span style={{ color: "#4caf50" }}>FREE</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, fontFamily: "'Share Tech Mono'", fontSize: 16, fontWeight: "bold" }}>
                    <span style={{ color: "#aaa" }}>Total</span>
                    <span style={{ color: "#f47920" }}>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <button className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: 13 }} onClick={() => { setShowCart(false); setPage("checkout"); setCheckoutStep(1); }}>
                    Checkout ku Po →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===== HOME PAGE ===== */}
      {page === "home" && (
        <>
          {/* Hero */}
          <div className="grid-bg" style={{ padding: "90px 32px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(244,121,32,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "60%", left: "30%", width: 400, height: 400, background: "radial-gradient(ellipse, rgba(26,95,168,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
            <div className="section-tag" style={{ marginBottom: 16 }}>// AUTHORIZED DEALER — EDAPPADI, SALEM</div>
            <h1 className="glow-orange" style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5.5vw, 68px)", lineHeight: 1.1, marginBottom: 12, letterSpacing: -1 }}>
              iSQUARE
            </h1>
            <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 300, fontSize: "clamp(18px, 3vw, 32px)", color: "#1a5fa8", letterSpacing: 6, marginBottom: 28, textTransform: "uppercase" }}>
              Technologies
            </h2>
            <p style={{ color: "#666", fontSize: 15, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.8, fontFamily: "'Share Tech Mono'" }}>
              Salem மாவட்டத்தின் நம்பகமான CCTV, Computer Parts & Accessories dealer. Edappadi & Salem area-vuku serve pannrom.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" style={{ fontSize: 13, padding: "13px 32px" }} onClick={() => setPage("products")}>Products Paarunga →</button>
              <button className="btn-secondary" style={{ fontSize: 13, padding: "12px 32px" }} onClick={() => setPage("about")}>Contact Us</button>
            </div>
            <div className="divider" style={{ maxWidth: 600, margin: "56px auto 0" }} />
            <div style={{ display: "flex", gap: 0, justifyContent: "center", flexWrap: "wrap" }}>
              {[["500+", "Products"], ["Salem", "Based"], ["5yr", "Support"], ["Same Day", "Delivery"]].map(([n, l], i) => (
                <div key={l} style={{ textAlign: "center", padding: "0 32px", borderRight: i < 3 ? "1px solid #1e1e30" : "none" }}>
                  <div style={{ fontFamily: "'Exo 2'", fontWeight: 900, fontSize: 26, color: "#f47920" }}>{n}</div>
                  <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: "#555", letterSpacing: 2 }}>{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div style={{ padding: "64px 32px", background: "#080810" }}>
            <div className="section-tag" style={{ textAlign: "center", display: "block", marginBottom: 10 }}>// CATEGORIES</div>
            <h2 style={{ fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 28, textAlign: "center", marginBottom: 44 }}>என்ன தேடுறீங்க?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, maxWidth: 860, margin: "0 auto" }}>
              {[
                { icon: "📷", title: "CCTV Systems", desc: "Dome, Bullet, PTZ Cameras & NVR Kits. Hikvision, Dahua, CP Plus.", cat: "cctv", color: "#f47920" },
                { icon: "💻", title: "Computer Parts", desc: "CPU, RAM, SSD, Motherboard, GPU & more.", cat: "parts", color: "#1a5fa8" },
                { icon: "🖱️", title: "Accessories", desc: "Keyboard, Mouse, Monitor, Cables & Networking.", cat: "accessories", color: "#9b59b6" },
              ].map(item => (
                <div key={item.cat} onClick={() => { setCategory(item.cat); setPage("products"); }}
                  style={{ background: "#0d0d14", border: "1px solid #1e1e30", padding: "30px 24px", cursor: "pointer", transition: "all 0.3s", textAlign: "center", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${item.color}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e30"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: 44, marginBottom: 14 }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 17, marginBottom: 10, color: item.color }}>{item.title}</div>
                  <div style={{ color: "#555", fontSize: 12, lineHeight: 1.7, fontFamily: "'Share Tech Mono'" }}>{item.desc}</div>
                  <div style={{ marginTop: 16, color: item.color, fontFamily: "'Share Tech Mono'", fontSize: 11, letterSpacing: 1 }}>VIEW ALL →</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <div style={{ padding: "64px 32px" }}>
            <div className="section-tag" style={{ display: "block", marginBottom: 10 }}>// FEATURED</div>
            <h2 style={{ fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 28, marginBottom: 40 }}>Top Products</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18, maxWidth: 1100, margin: "0 auto" }}>
              {products.filter(p => p.badge).slice(0, 4).map(product => (
                <div key={product.id} className="product-card" style={{ padding: "22px" }}>
                  {product.badge && <div style={{ marginBottom: 12 }}><span className="badge">{product.badge}</span></div>}
                  <div style={{ fontSize: 46, marginBottom: 12 }}>{product.img}</div>
                  <div style={{ fontFamily: "'Exo 2'", fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{product.name}</div>
                  <div style={{ color: "#555", fontSize: 12, marginBottom: 14, lineHeight: 1.6, fontFamily: "'Share Tech Mono'" }}>{product.desc}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Share Tech Mono'", color: "#f47920", fontSize: 16, fontWeight: "bold" }}>₹{product.price.toLocaleString()}</span>
                    <button className="btn-primary" style={{ padding: "7px 14px", fontSize: 11 }} onClick={() => addToCart(product)}>+ Cart</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <button className="btn-secondary" onClick={() => setPage("products")}>All Products Paarunga →</button>
            </div>
          </div>

          {/* Why iSquare */}
          <div style={{ background: "#080810", padding: "64px 32px" }}>
            <div className="section-tag" style={{ textAlign: "center", display: "block", marginBottom: 10 }}>// WHY ISQUARE</div>
            <h2 style={{ fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 28, textAlign: "center", marginBottom: 44 }}>Engalai Yen Choose Pannanum?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
              {[
                { icon: "🛡️", title: "Genuine Products", desc: "All brands 100% original & warranty guaranteed" },
                { icon: "🚚", title: "Fast Delivery", desc: "Salem & surrounding areas same day delivery" },
                { icon: "🔧", title: "Installation Help", desc: "CCTV setup free guidance & support" },
                { icon: "📞", title: "24/7 Support", desc: "WhatsApp & call support always available" },
              ].map(item => (
                <div key={item.title} style={{ textAlign: "center", padding: "28px 16px", background: "#0d0d14", border: "1px solid #1e1e30" }}>
                  <div style={{ fontSize: 38, marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Exo 2'", fontWeight: 600, fontSize: 14, marginBottom: 8, color: "#f47920" }}>{item.title}</div>
                  <div style={{ color: "#555", fontSize: 12, lineHeight: 1.7, fontFamily: "'Share Tech Mono'" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div style={{ background: "linear-gradient(135deg, #f47920, #1a5fa8)", padding: "48px 32px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Exo 2'", fontWeight: 900, fontSize: 28, marginBottom: 12, color: "#fff" }}>CCTV Install Pannanum?</h2>
            <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: 24, fontFamily: "'Share Tech Mono'", fontSize: 13 }}>
              Free consultation & best price guarantee. Call us now!
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:+919994189841" style={{ background: "#fff", color: "#f47920", padding: "12px 28px", fontFamily: "'Share Tech Mono'", fontWeight: "bold", fontSize: 13, textDecoration: "none", letterSpacing: 1 }}>
                📞 +91 99941 89841
              </a>
              <a href="https://wa.me/919994189841" style={{ background: "transparent", color: "#fff", border: "2px solid #fff", padding: "12px 28px", fontFamily: "'Share Tech Mono'", fontSize: 13, textDecoration: "none", letterSpacing: 1 }}>
                WhatsApp Us
              </a>
            </div>
          </div>
        </>
      )}

      {/* ===== PRODUCTS PAGE ===== */}
      {page === "products" && (
        <div style={{ padding: "40px 28px", maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-tag" style={{ display: "block", marginBottom: 8 }}>// CATALOG</div>
          <h2 style={{ fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 28, marginBottom: 28 }}>All Products</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28, alignItems: "center" }}>
            {categories.map(c => (
              <button key={c.id} className={`cat-btn ${category === c.id ? "active" : ""}`} onClick={() => setCategory(c.id)}>
                {c.icon} {c.label}
              </button>
            ))}
            <input className="input-field" placeholder="🔍 Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 240, marginLeft: "auto" }} />
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#333", fontFamily: "'Share Tech Mono'", fontSize: 14 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
              No products found. Try a different search.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 18 }}>
              {filtered.map(product => (
                <div key={product.id} className="product-card" style={{ padding: "22px" }}>
                  {product.badge && <div style={{ marginBottom: 10 }}><span className="badge">{product.badge}</span></div>}
                  <div style={{ fontSize: 42, marginBottom: 12 }}>{product.img}</div>
                  <div style={{ fontFamily: "'Exo 2'", fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{product.name}</div>
                  <div style={{ color: "#555", fontSize: 12, marginBottom: 14, lineHeight: 1.6, fontFamily: "'Share Tech Mono'" }}>{product.desc}</div>
                  {!product.stock && <div style={{ color: "#ff4455", fontFamily: "'Share Tech Mono'", fontSize: 11, marginBottom: 8 }}>● Out of Stock</div>}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Share Tech Mono'", color: "#f47920", fontSize: 15, fontWeight: "bold" }}>₹{product.price.toLocaleString()}</span>
                    <button className="btn-primary" style={{ padding: "7px 12px", fontSize: 11 }} disabled={!product.stock} onClick={() => product.stock && addToCart(product)}>
                      {product.stock ? "+ Cart" : "Notify"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== AUTH PAGE ===== */}
      {page === "auth" && (
        <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
          <div style={{ background: "#0d0d14", border: "1px solid #1e1e30", padding: "44px 40px", width: "100%", maxWidth: 420 }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <ISquareLogo height={40} />
            </div>
            <div style={{ display: "flex", marginBottom: 28, border: "1px solid #252538" }}>
              {["login", "signup"].map(m => (
                <button key={m} onClick={() => setAuthMode(m)} style={{ flex: 1, padding: "12px", background: authMode === m ? "#f47920" : "transparent", color: authMode === m ? "#fff" : "#666", border: "none", cursor: "pointer", fontFamily: "'Share Tech Mono'", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", transition: "all 0.2s", fontWeight: authMode === m ? "bold" : "normal" }}>
                  {m === "login" ? "Login" : "Sign Up"}
                </button>
              ))}
            </div>
            <div style={{ fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 20, marginBottom: 6 }}>
              {authMode === "login" ? "Welcome Back!" : "New Account Create Pannunga"}
            </div>
            <div style={{ color: "#555", fontSize: 12, marginBottom: 24, fontFamily: "'Share Tech Mono'" }}>
              {authMode === "login" ? "iSquare account la sign in pannunga" : "Oru account create pannunga"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {authMode === "signup" && <input className="input-field" placeholder="Full Name" />}
              <input className="input-field" placeholder="Email Address" type="email" />
              {authMode === "signup" && <input className="input-field" placeholder="Phone Number" type="tel" />}
              <input className="input-field" placeholder="Password" type="password" />
              {authMode === "signup" && <input className="input-field" placeholder="Confirm Password" type="password" />}
              <button className="btn-primary" style={{ padding: "14px", fontSize: 13, marginTop: 4 }} onClick={() => { showToast(authMode === "login" ? "Login successful!" : "Account created!"); setPage("home"); }}>
                {authMode === "login" ? "Sign In →" : "Account Create →"}
              </button>
              {authMode === "login" && <div style={{ textAlign: "center", color: "#f47920", fontFamily: "'Share Tech Mono'", fontSize: 12, cursor: "pointer" }}>Password maranthutteengala?</div>}
            </div>
          </div>
        </div>
      )}

      {/* ===== CHECKOUT PAGE ===== */}
      {page === "checkout" && (
        <div style={{ padding: "40px 28px", maxWidth: 680, margin: "0 auto" }}>
          <div className="section-tag" style={{ display: "block", marginBottom: 8 }}>// SECURE CHECKOUT</div>
          <h2 style={{ fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 28, marginBottom: 32 }}>Checkout</h2>

          {/* Steps */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36 }}>
            {["Delivery", "Payment", "Done"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className={`step ${checkoutStep > i + 1 ? "done" : checkoutStep === i + 1 ? "active" : ""}`}>
                  {checkoutStep > i + 1 ? "✓" : i + 1}
                </div>
                <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: checkoutStep === i + 1 ? "#f47920" : "#444" }}>{s}</span>
                {i < 2 && <div style={{ width: 30, height: 1, background: "#252538" }} />}
              </div>
            ))}
          </div>

          {checkoutStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontFamily: "'Exo 2'", fontWeight: 600, fontSize: 16, color: "#aaa", marginBottom: 6 }}>Delivery Address</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input className="input-field" placeholder="First Name" />
                <input className="input-field" placeholder="Last Name" />
              </div>
              <input className="input-field" placeholder="Phone Number" type="tel" />
              <input className="input-field" placeholder="Address" />
              <input className="input-field" placeholder="Area / Landmark" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input className="input-field" placeholder="City" defaultValue="Salem" />
                <input className="input-field" placeholder="Pincode" />
              </div>
              <button className="btn-primary" style={{ padding: "14px", marginTop: 8 }} onClick={() => setCheckoutStep(2)}>
                Payment ku Po →
              </button>
            </div>
          )}

          {checkoutStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontFamily: "'Exo 2'", fontWeight: 600, fontSize: 16, color: "#aaa", marginBottom: 6 }}>Payment Method</div>
              {[["💳", "Credit / Debit Card", "Visa, Mastercard, Rupay"], ["📱", "UPI Payment", "GPay, PhonePe, Paytm"], ["🏦", "Net Banking", "All major banks"], ["💵", "Cash on Delivery", "Pay when delivered"]].map(([icon, label, sub]) => (
                <div key={label} className="payment-option">
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Exo 2'", fontWeight: 600, fontSize: 14 }}>{label}</div>
                    <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: "#555", marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: "#080810", border: "1px solid #1e1e30", padding: "16px 20px", marginTop: 4 }}>
                {[["Subtotal", `₹${cartTotal.toLocaleString()}`], ["Shipping", "FREE ✓"], ["GST (18%)", `₹${Math.round(cartTotal * 0.18).toLocaleString()}`]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontFamily: "'Share Tech Mono'", fontSize: 12, color: "#555" }}>
                    <span>{k}</span><span style={k === "Shipping" ? { color: "#4caf50" } : {}}>{v}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Share Tech Mono'", fontWeight: "bold", fontSize: 16, borderTop: "1px solid #252538", paddingTop: 12, marginTop: 4 }}>
                  <span style={{ color: "#aaa" }}>Total</span>
                  <span style={{ color: "#f47920" }}>₹{Math.round(cartTotal * 1.18).toLocaleString()}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setCheckoutStep(1)}>← Back</button>
                <button className="btn-primary" style={{ flex: 2, padding: "14px" }} onClick={() => setCheckoutStep(3)}>Order Place Pannu →</button>
              </div>
            </div>
          )}

          {checkoutStep === 3 && (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ width: 80, height: 80, background: "linear-gradient(135deg, #f47920, #1a5fa8)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>✓</div>
              <div style={{ fontFamily: "'Exo 2'", fontWeight: 900, fontSize: 28, color: "#f47920", marginBottom: 8 }}>Order Confirm Achu!</div>
              <div style={{ color: "#555", fontFamily: "'Share Tech Mono'", fontSize: 13, marginBottom: 6 }}>Order #ISQ{Math.floor(Math.random() * 90000 + 10000)}</div>
              <div style={{ color: "#666", fontSize: 13, marginBottom: 8, fontFamily: "'Share Tech Mono'" }}>SMS confirmation anuppuvom</div>
              <div style={{ color: "#555", fontSize: 12, marginBottom: 36, fontFamily: "'Share Tech Mono'" }}>Questions? Call: +91 99941 89841</div>
              <button className="btn-primary" style={{ padding: "13px 32px" }} onClick={() => { setCart([]); setPage("home"); }}>
                Shopping Continue Pannu →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===== ABOUT/CONTACT PAGE ===== */}
      {page === "about" && (
        <div style={{ padding: "60px 28px", maxWidth: 860, margin: "0 auto" }}>
          <div className="section-tag" style={{ display: "block", marginBottom: 8 }}>// CONTACT US</div>
          <h2 style={{ fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 36, marginBottom: 8 }}>iSquare <span style={{ color: "#f47920" }}>Technologies</span></h2>
          <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, #f47920, #1a5fa8)", marginBottom: 28 }} />
          <p style={{ color: "#666", lineHeight: 1.9, fontSize: 14, marginBottom: 16, fontFamily: "'Share Tech Mono'", maxWidth: 620 }}>
            iSquare Technologies — Salem district la, Edappadi la irukka trusted technology solutions provider. CCTV systems, computer parts, accessories — ellame genuine product, best price la tharom.
          </p>
          <p style={{ color: "#666", lineHeight: 1.9, fontSize: 14, marginBottom: 44, fontFamily: "'Share Tech Mono'", maxWidth: 620 }}>
            Hikvision, Dahua, CP Plus, AMD, Samsung — innum pala brands ku authorized dealer. Salem district poora delivery & support pannrom.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 44 }}>
            {[
              { icon: "📍", label: "Address", val: "1/12 Sadaiya Gounda Valavu, Iruppali Post, Edappadi Taluk, Salem — 637101" },
              { icon: "📞", label: "Phone", val: "+91 99941 89841\n+91 97515 89841" },
              { icon: "📧", label: "Email", val: "support@isquaretechnologies.in\nisquaretechnologies@outlook.com" },
              { icon: "🌐", label: "Website", val: "www.isquaretechnologies.in" },
              { icon: "⏰", label: "Hours", val: "Monday – Saturday\n9:30 AM – 7:30 PM" },
              { icon: "📱", label: "WhatsApp", val: "+91 99941 89841\nMessage us anytime!" },
            ].map(({ icon, label, val }) => (
              <div key={label} className="contact-card">
                <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: "#f47920", letterSpacing: 2, marginBottom: 6 }}>{label.toUpperCase()}</div>
                <div style={{ color: "#888", fontSize: 12, lineHeight: 1.7, fontFamily: "'Share Tech Mono'", whiteSpace: "pre-line" }}>{val}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(244,121,32,0.08), rgba(26,95,168,0.08))", border: "1px solid #1e1e30", padding: "28px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Exo 2'", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Ippavey Contact Pannunga!</div>
            <div style={{ color: "#666", fontFamily: "'Share Tech Mono'", fontSize: 12, marginBottom: 20 }}>Free consultation & best price guarantee</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:+919994189841" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ padding: "12px 24px" }}>📞 Call Now</button>
              </a>
              <a href="https://wa.me/919994189841" style={{ textDecoration: "none" }}>
                <button className="btn-secondary" style={{ padding: "11px 24px" }}>💬 WhatsApp</button>
              </a>
              <a href="mailto:support@isquaretechnologies.in" style={{ textDecoration: "none" }}>
                <button className="btn-secondary" style={{ padding: "11px 24px" }}>📧 Email</button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: "#050508", borderTop: "1px solid #131320", padding: "36px 28px", marginTop: 60 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <ISquareLogo height={40} />
          <div style={{ color: "#333", fontFamily: "'Share Tech Mono'", fontSize: 11, textAlign: "right" }}>
            <div>© 2025 iSquare Technologies. All rights reserved.</div>
            <div style={{ marginTop: 4 }}>Edappadi, Salem, Tamil Nadu — www.isquaretechnologies.in</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
