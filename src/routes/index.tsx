import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import fridgeFrostmax from "@/assets/fridge-frostmax.jpg";
import fridgeCoolpro from "@/assets/fridge-coolpro.jpg";
import fridgeElitefresh from "@/assets/fridge-elitefresh.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DhakaStar — Luxury Cooling. Redefined." },
      { name: "description", content: "Premium refrigerators engineered for Bangladesh. Order DhakaStar with Cash on Delivery." },
      { property: "og:title", content: "DhakaStar — Luxury Cooling. Redefined." },
      { property: "og:description", content: "Premium refrigerators engineered for Bangladesh." },
    ],
  }),
  component: Index,
});

type Product = {
  id: string;
  name: string;
  price: number;
  capacity: string;
  rating: number;
  description: string;
  icon: string;
  tagline: string;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    id: "frostmax",
    name: "DhakaStar FrostMax 280L",
    price: 45000,
    capacity: "280 Liters",
    rating: 4.7,
    description: "Frost-free technology with energy saving mode",
    icon: "fa-snowflake",
    tagline: "Essential",
    image: fridgeFrostmax,
  },
  {
    id: "coolpro",
    name: "DhakaStar CoolPro 350L",
    price: 62000,
    capacity: "350 Liters",
    rating: 4.8,
    description: "Fast cooling inverter compressor",
    icon: "fa-wind",
    tagline: "Most Popular",
    image: fridgeCoolpro,
  },
  {
    id: "elitefresh",
    name: "DhakaStar EliteFresh 450L",
    price: 89000,
    capacity: "450 Liters",
    rating: 4.9,
    description: "Dual cooling zones for maximum freshness",
    icon: "fa-gem",
    tagline: "Flagship",
    image: fridgeElitefresh,
  },
];

const REVIEWS = [
  {
    name: "Tasnim R.",
    city: "Dhaka",
    rating: 5,
    product: "EliteFresh 450L",
    text: "Genuinely the quietest fridge I've owned. The dual zones keep my herbs fresh for over a week. Delivery and installation were flawless.",
  },
  {
    name: "Arif H.",
    city: "Chattogram",
    rating: 5,
    product: "CoolPro 350L",
    text: "The inverter is a game-changer during load-shedding. Electricity bill dropped noticeably. Build quality feels truly premium.",
  },
  {
    name: "Nazia K.",
    city: "Sylhet",
    rating: 4,
    product: "FrostMax 280L",
    text: "Beautiful design — looks more expensive than it is. Cooling is fast and consistent even in our summer heat.",
  },
  {
    name: "Rakib M.",
    city: "Dhaka",
    rating: 5,
    product: "EliteFresh 450L",
    text: "Cash on delivery + free setup. Felt like a luxury showroom experience at home. Worth every taka.",
  },
];

function formatBDT(n: number) {
  return new Intl.NumberFormat("en-BD").format(n) + " BDT";
}

function Stars({ rating, size = "text-sm" }: { rating: number; size?: string }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className={`inline-flex items-center gap-1 ${size}`} style={{ color: "var(--ds-gold)" }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const cls = i < full ? "fa-solid fa-star" : i === full && half ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star";
        return <i key={i} className={cls} aria-hidden />;
      })}
      <span className="ml-1 font-medium" style={{ color: "inherit" }}>{rating.toFixed(1)}</span>
    </span>
  );
}

function FrostParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 38 }).map(() => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 6,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        opacity: 0.35 + Math.random() * 0.5,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            bottom: `-10px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: "blur(0.5px)",
            animation: `ds-float ${p.duration}s linear ${p.delay}s infinite`,
            boxShadow: "0 0 8px rgba(255,255,255,0.7)",
          }}
        />
      ))}
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 font-display ${className}`}>
      <i className="fa-solid fa-snowflake" style={{ color: "var(--ds-ice)" }} aria-hidden />
      <span className="tracking-wide">
        Dhaka<span style={{ color: "var(--ds-gold)" }}>Star</span>
      </span>
    </div>
  );
}

function Modal({ open, onClose, children, labelledBy, size = "lg" }: { open: boolean; onClose: () => void; children: React.ReactNode; labelledBy?: string; size?: "lg" | "xl" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  const max = size === "xl" ? "max-w-3xl" : "max-w-lg";
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 ds-fade-in" style={{ background: "rgba(6,26,38,0.78)", backdropFilter: "blur(8px)" }} />
      <div
        className={`relative ds-glass-light ds-modal-in w-full ${max} max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
        style={{ color: "var(--ds-navy)" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
          style={{ color: "var(--ds-navy)", background: "rgba(255,255,255,0.7)" }}
        >
          <i className="fa-solid fa-xmark text-lg" />
        </button>
        {children}
      </div>
    </div>
  );
}

function Index() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", quantity: 1 });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const openProduct = (p: Product) => setSelected(p);
  const startOrder = (p: Product) => {
    setOrderProduct(p);
    setSelected(null);
    setSubmitted(false);
    setForm({ name: "", phone: "", address: "", quantity: 1 });
    setOrderOpen(true);
  };
  const closeOrder = () => {
    setOrderOpen(false);
    setOrderProduct(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleContact = (e: FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  return (
    <div className="min-h-screen ds-hero-bg text-white">
      {/* Top bar */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Logo className="text-2xl" />
        <nav className="flex items-center gap-2 sm:gap-3">
          <a href="#products" className="hidden rounded-full px-4 py-2 text-sm font-medium ds-glass transition hover:bg-white/10 sm:inline-block">Collection</a>
          <a href="#reviews" className="hidden rounded-full px-4 py-2 text-sm font-medium ds-glass transition hover:bg-white/10 sm:inline-block">Reviews</a>
          <button onClick={() => setAboutOpen(true)} className="rounded-full px-4 py-2 text-sm font-medium ds-glass transition hover:bg-white/10">About</button>
          <button onClick={() => setContactOpen(true)} className="rounded-full px-4 py-2 text-sm font-medium ds-glass transition hover:bg-white/10">Contact</button>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <FrostParticles />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-12 text-center sm:pt-20">
          <div
            className="ds-fade-in mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] ds-glass"
            style={{ color: "var(--ds-ice)" }}
          >
            <i className="fa-solid fa-snowflake" /> Premium Cooling · Bangladesh
          </div>
          <h1 className="ds-slide-up font-display text-5xl font-bold leading-[1.05] sm:text-7xl">
            DhakaStar — <span style={{ color: "var(--ds-ice)" }}>Luxury Cooling.</span>
            <br />
            <span style={{ color: "var(--ds-gold)" }}>Redefined.</span>
          </h1>
          <p
            className="ds-slide-up mx-auto mt-6 max-w-2xl text-lg sm:text-xl"
            style={{ animationDelay: "0.15s", color: "rgba(255,255,255,0.78)" }}
          >
            Premium refrigerators engineered for Bangladesh — whisper-quiet, energy efficient, built to last.
          </p>
          <div className="ds-slide-up mt-10" style={{ animationDelay: "0.3s" }}>
            <a
              href="#products"
              className="ds-pulse inline-flex items-center gap-3 rounded-full px-9 py-4 text-base font-semibold tracking-wide ds-gold-gradient"
              style={{ color: "var(--ds-navy)" }}
            >
              Order Now <i className="fa-solid fa-arrow-right" />
            </a>
          </div>
          <div className="ds-fade-in mt-12 flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: "rgba(255,255,255,0.6)", animationDelay: "0.5s" }}>
            <span><i className="fa-solid fa-truck mr-2" style={{ color: "var(--ds-gold)" }} /> Free Dhaka delivery</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
            <span><i className="fa-solid fa-shield-halved mr-2" style={{ color: "var(--ds-gold)" }} /> 5-year warranty</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
            <span><i className="fa-solid fa-money-bill-wave mr-2" style={{ color: "var(--ds-gold)" }} /> Cash on Delivery</span>
          </div>
        </div>
      </section>

      {/* Products — Dyson-style large hero cards */}
      <section id="products" className="relative mx-auto max-w-7xl px-6 pb-28">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--ds-gold)" }}>The Collection</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Choose your DhakaStar</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              onClick={() => openProduct(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openProduct(p)}
              className="ds-card ds-glass relative flex flex-col overflow-hidden rounded-3xl"
            >
              <span
                className="absolute right-5 top-5 z-10 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: "rgba(212,175,55,0.18)", color: "var(--ds-gold)", border: "1px solid rgba(212,175,55,0.4)" }}
              >
                {p.tagline}
              </span>

              <div
                className="relative flex h-80 items-center justify-center overflow-hidden sm:h-96"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(123,197,211,0.18), transparent 70%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.0))",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-auto object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.45))" }}
                />
              </div>

              <div className="p-7 text-center">
                <h3 className="font-display text-2xl">{p.name}</h3>
                <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{p.description}</p>
                <div className="mt-4 flex items-center justify-center gap-4 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <span><i className="fa-solid fa-database mr-1.5" style={{ color: "var(--ds-ice)" }} />{p.capacity}</span>
                  <Stars rating={p.rating} />
                </div>
                <div className="mt-5 font-display text-3xl" style={{ color: "var(--ds-gold)" }}>
                  {formatBDT(p.price)}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium" style={{ color: "var(--ds-ice)" }}>
                  View details <i className="fa-solid fa-arrow-right text-xs" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="relative mx-auto max-w-7xl px-6 pb-28">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--ds-gold)" }}>Customer Stories</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Loved across Bangladesh</h2>
          <div className="mt-4 inline-flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
            <Stars rating={4.8} size="text-base" />
            <span>· Based on 1,240+ verified reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <article key={i} className="ds-glass rounded-3xl p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full font-display text-lg"
                    style={{ background: "rgba(123,197,211,0.2)", color: "var(--ds-ice)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{r.city} · {r.product}</p>
                  </div>
                </div>
                <Stars rating={r.rating} />
              </div>
              <p className="mt-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                <i className="fa-solid fa-quote-left mr-2 text-xs" style={{ color: "var(--ds-gold)" }} />
                {r.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* About + Contact CTA strip */}
      <section className="relative mx-auto max-w-7xl px-6 pb-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="ds-glass rounded-3xl p-8">
            <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em]" style={{ color: "var(--ds-gold)" }}>
              <i className="fa-solid fa-building" /> About DhakaStar
            </div>
            <h3 className="font-display text-3xl">Built in Bangladesh, engineered for Bangladesh.</h3>
            <p className="mt-3" style={{ color: "rgba(255,255,255,0.72)" }}>
              We design premium refrigerators tuned for our climate, power grid, and homes — pairing inverter efficiency with materials and finishes you'd expect from a luxury brand.
            </p>
            <button
              onClick={() => setAboutOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium ds-glass hover:bg-white/10"
            >
              Read our story <i className="fa-solid fa-arrow-right text-xs" />
            </button>
          </div>

          <div className="rounded-3xl p-8 ds-glass" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(123,197,211,0.10))" }}>
            <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em]" style={{ color: "var(--ds-gold)" }}>
              <i className="fa-solid fa-headset" /> Contact Us
            </div>
            <h3 className="font-display text-3xl">Talk to a DhakaStar advisor.</h3>
            <p className="mt-3" style={{ color: "rgba(255,255,255,0.78)" }}>
              Questions about specs, delivery, or installation? Our team responds within an hour, 7 days a week.
            </p>
            <div className="mt-5 space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.82)" }}>
              <p><i className="fa-solid fa-phone mr-2" style={{ color: "var(--ds-gold)" }} /> +880 1700 000 000</p>
              <p><i className="fa-solid fa-envelope mr-2" style={{ color: "var(--ds-gold)" }} /> care@dhakastar.com</p>
              <p><i className="fa-solid fa-location-dot mr-2" style={{ color: "var(--ds-gold)" }} /> Gulshan-1, Dhaka</p>
            </div>
            <button
              onClick={() => setContactOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold ds-gold-gradient"
              style={{ color: "var(--ds-navy)" }}
            >
              Send a message <i className="fa-solid fa-paper-plane text-xs" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <Logo className="text-xl" />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} DhakaStar. Premium cooling for Bangladesh.
          </p>
        </div>
      </footer>

      {/* Product Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} labelledBy="product-title" size="xl">
        {selected && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div
              className="flex items-center justify-center p-8 md:p-10"
              style={{ background: "radial-gradient(ellipse at center, rgba(123,197,211,0.18), rgba(10,43,61,0.06))" }}
            >
              <img
                src={selected.image}
                alt={selected.name}
                width={1024}
                height={1280}
                className="max-h-[420px] w-auto object-contain"
                style={{ filter: "drop-shadow(0 30px 40px rgba(10,43,61,0.35))" }}
              />
            </div>
            <div className="p-8">
              <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--ds-gold)" }}>{selected.tagline}</span>
              <h3 id="product-title" className="mt-2 font-display text-3xl" style={{ color: "var(--ds-navy)" }}>
                {selected.name}
              </h3>
              <div className="mt-2"><Stars rating={selected.rating} /></div>
              <p className="mt-4" style={{ color: "rgba(10,43,61,0.75)" }}>{selected.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                <div className="rounded-xl p-4" style={{ background: "rgba(123,197,211,0.12)" }}>
                  <p className="text-[11px] uppercase tracking-wider" style={{ color: "rgba(10,43,61,0.6)" }}>Capacity</p>
                  <p className="mt-1 font-semibold" style={{ color: "var(--ds-navy)" }}>{selected.capacity}</p>
                </div>
                <div className="rounded-xl p-4" style={{ background: "rgba(212,175,55,0.12)" }}>
                  <p className="text-[11px] uppercase tracking-wider" style={{ color: "rgba(10,43,61,0.6)" }}>Warranty</p>
                  <p className="mt-1 font-semibold" style={{ color: "var(--ds-navy)" }}>5 Years</p>
                </div>
              </div>

              <div className="mt-6 font-display text-4xl" style={{ color: "var(--ds-gold)" }}>
                {formatBDT(selected.price)}
              </div>

              <button
                onClick={() => startOrder(selected)}
                className="ds-pulse mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold ds-gold-gradient"
                style={{ color: "var(--ds-navy)" }}
              >
                Order Now <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Order Modal */}
      <Modal open={orderOpen} onClose={closeOrder} labelledBy="order-title">
        {orderProduct && (
          <div className="p-8">
            {!submitted ? (
              <>
                <h3 id="order-title" className="font-display text-2xl" style={{ color: "var(--ds-navy)" }}>
                  Place Your Order
                </h3>
                <div className="mt-3 flex items-center gap-3 rounded-xl p-3" style={{ background: "rgba(10,43,61,0.05)" }}>
                  <img src={orderProduct.image} alt="" className="h-14 w-14 rounded-lg object-contain" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "var(--ds-navy)" }}>{orderProduct.name}</p>
                    <p className="text-xs" style={{ color: "rgba(10,43,61,0.6)" }}>{formatBDT(orderProduct.price)} · {orderProduct.capacity}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <Field label="Full Name">
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="ds-input" placeholder="e.g. Rahim Ahmed" />
                  </Field>
                  <Field label="Phone">
                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="ds-input" placeholder="01XXXXXXXXX" />
                  </Field>
                  <Field label="Delivery Address">
                    <textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="ds-input min-h-[72px]" placeholder="House, road, area, city" />
                  </Field>
                  <Field label="Quantity">
                    <input required type="number" min={1} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Math.max(1, Number(e.target.value) || 1) })} className="ds-input" />
                  </Field>

                  <div className="rounded-xl border p-3" style={{ borderColor: "var(--ds-gold)", background: "rgba(212,175,55,0.08)" }}>
                    <label className="flex items-center gap-3">
                      <input type="radio" checked readOnly />
                      <span className="text-sm font-medium" style={{ color: "var(--ds-navy)" }}>
                        <i className="fa-solid fa-money-bill-wave mr-2" style={{ color: "var(--ds-gold)" }} />
                        Cash on Delivery
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-sm" style={{ color: "var(--ds-navy)" }}>
                    <span>Total</span>
                    <span className="font-display text-xl" style={{ color: "var(--ds-gold)" }}>
                      {formatBDT(orderProduct.price * form.quantity)}
                    </span>
                  </div>

                  <button type="submit" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold ds-gold-gradient" style={{ color: "var(--ds-navy)" }}>
                    Place Order <i className="fa-solid fa-check" />
                  </button>
                </form>
              </>
            ) : (
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(212,175,55,0.18)" }}>
                  <i className="fa-solid fa-check text-2xl" style={{ color: "var(--ds-gold)" }} />
                </div>
                <h3 className="font-display text-2xl" style={{ color: "var(--ds-navy)" }}>✅ Order placed!</h3>
                <p className="mt-2 text-sm" style={{ color: "rgba(10,43,61,0.7)" }}>
                  We will call you within 1 hour to confirm your DhakaStar delivery.
                </p>
                <button onClick={closeOrder} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium" style={{ background: "var(--ds-navy)", color: "white" }}>
                  Done
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* About Modal */}
      <Modal open={aboutOpen} onClose={() => setAboutOpen(false)} labelledBy="about-title" size="xl">
        <div className="p-8 md:p-10">
          <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--ds-gold)" }}>Our Story</span>
          <h3 id="about-title" className="mt-2 font-display text-3xl" style={{ color: "var(--ds-navy)" }}>
            About DhakaStar
          </h3>
          <p className="mt-4 leading-relaxed" style={{ color: "rgba(10,43,61,0.78)" }}>
            DhakaStar was founded in 2018 with a single belief — Bangladesh deserves home appliances that match the quality of the world's best, designed for our climate and our homes.
          </p>
          <p className="mt-3 leading-relaxed" style={{ color: "rgba(10,43,61,0.78)" }}>
            Every refrigerator is engineered locally, tested against 45°C summers and the realities of our power grid, and finished with materials usually reserved for luxury brands. From frost-free essentials to dual-zone flagships, every DhakaStar carries a 5-year warranty and free delivery across the country.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { v: "1,240+", l: "Happy Homes" },
              { v: "5 yr", l: "Warranty" },
              { v: "64", l: "Districts Served" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl p-4" style={{ background: "rgba(10,43,61,0.05)" }}>
                <p className="font-display text-2xl" style={{ color: "var(--ds-gold)" }}>{s.v}</p>
                <p className="text-xs uppercase tracking-wider" style={{ color: "rgba(10,43,61,0.6)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal open={contactOpen} onClose={() => { setContactOpen(false); setContactSent(false); }} labelledBy="contact-title">
        <div className="p-8">
          {!contactSent ? (
            <>
              <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--ds-gold)" }}>Get in touch</span>
              <h3 id="contact-title" className="mt-2 font-display text-2xl" style={{ color: "var(--ds-navy)" }}>
                Contact DhakaStar
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3" style={{ color: "rgba(10,43,61,0.75)" }}>
                <p><i className="fa-solid fa-phone mr-1.5" style={{ color: "var(--ds-gold)" }} /> 01700 000 000</p>
                <p><i className="fa-solid fa-envelope mr-1.5" style={{ color: "var(--ds-gold)" }} /> care@dhakastar.com</p>
                <p><i className="fa-solid fa-location-dot mr-1.5" style={{ color: "var(--ds-gold)" }} /> Gulshan-1, Dhaka</p>
              </div>

              <form onSubmit={handleContact} className="mt-5 space-y-3">
                <Field label="Your Name">
                  <input required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="ds-input" placeholder="Your full name" />
                </Field>
                <Field label="Email">
                  <input required type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="ds-input" placeholder="you@example.com" />
                </Field>
                <Field label="Message">
                  <textarea required value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} className="ds-input min-h-[96px]" placeholder="How can we help?" />
                </Field>
                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold ds-gold-gradient" style={{ color: "var(--ds-navy)" }}>
                  Send Message <i className="fa-solid fa-paper-plane" />
                </button>
              </form>
            </>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(212,175,55,0.18)" }}>
                <i className="fa-solid fa-paper-plane text-2xl" style={{ color: "var(--ds-gold)" }} />
              </div>
              <h3 className="font-display text-2xl" style={{ color: "var(--ds-navy)" }}>Message sent!</h3>
              <p className="mt-2 text-sm" style={{ color: "rgba(10,43,61,0.7)" }}>
                Thanks for reaching out — our team will respond within 1 hour.
              </p>
              <button onClick={() => { setContactOpen(false); setContactSent(false); }} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium" style={{ background: "var(--ds-navy)", color: "white" }}>
                Done
              </button>
            </div>
          )}
        </div>
      </Modal>

      <style>{`
        .ds-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(10,43,61,0.15);
          background: white;
          padding: 0.7rem 0.9rem;
          font-size: 0.95rem;
          color: var(--ds-navy);
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .ds-input:focus {
          border-color: var(--ds-gold);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.2);
        }
        .ds-input::placeholder { color: rgba(10,43,61,0.4); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(10,43,61,0.65)" }}>{label}</span>
      {children}
    </label>
  );
}
