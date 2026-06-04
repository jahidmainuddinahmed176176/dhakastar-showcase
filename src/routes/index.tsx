import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";

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
  },
];

function formatBDT(n: number) {
  return new Intl.NumberFormat("en-BD").format(n) + " BDT";
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-1" style={{ color: "var(--ds-gold)" }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const cls = i < full ? "fa-solid fa-star" : i === full && half ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star";
        return <i key={i} className={cls} aria-hidden />;
      })}
      <span className="ml-1 text-sm font-medium" style={{ color: "inherit" }}>{rating.toFixed(1)}</span>
    </span>
  );
}

function FrostParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 38 }).map((_, i) => ({
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

function Modal({ open, onClose, children, labelledBy }: { open: boolean; onClose: () => void; children: React.ReactNode; labelledBy?: string }) {
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
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 ds-fade-in" style={{ background: "rgba(6,26,38,0.72)", backdropFilter: "blur(6px)" }} />
      <div
        className="relative ds-glass-light ds-modal-in w-full max-w-lg rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ color: "var(--ds-navy)" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-black/5"
          style={{ color: "var(--ds-navy)" }}
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
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", quantity: 1 });

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

  return (
    <div className="min-h-screen ds-hero-bg text-white">
      {/* Top bar */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo className="text-2xl" />
        <a
          href="#products"
          className="hidden rounded-full px-5 py-2 text-sm font-medium ds-glass transition hover:bg-white/10 sm:inline-block"
        >
          View Collection
        </a>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <FrostParticles />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-16 text-center sm:pt-24">
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
              className="ds-pulse inline-flex items-center gap-3 rounded-full px-9 py-4 text-base font-semibold tracking-wide text-[--ds-navy] ds-gold-gradient"
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

      {/* Products */}
      <section id="products" className="relative mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--ds-gold)" }}>The Collection</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Choose your DhakaStar</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              onClick={() => openProduct(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openProduct(p)}
              className="ds-card ds-glass relative flex flex-col items-center rounded-3xl p-8 text-center"
            >
              <span
                className="absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: "rgba(212,175,55,0.15)", color: "var(--ds-gold)", border: "1px solid rgba(212,175,55,0.35)" }}
              >
                {p.tagline}
              </span>
              <div
                className="mb-6 flex h-28 w-28 items-center justify-center rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(123,197,211,0.18), rgba(212,175,55,0.12))",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <i className={`fa-solid ${p.icon} text-5xl`} style={{ color: "var(--ds-ice)" }} />
              </div>
              <h3 className="font-display text-2xl">{p.name}</h3>
              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{p.description}</p>
              <div className="mt-4 flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                <span><i className="fa-solid fa-database mr-1.5" style={{ color: "var(--ds-ice)" }} />{p.capacity}</span>
                <Stars rating={p.rating} />
              </div>
              <div className="mt-6 font-display text-3xl" style={{ color: "var(--ds-gold)" }}>
                {formatBDT(p.price)}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium" style={{ color: "var(--ds-ice)" }}>
                View details <i className="fa-solid fa-arrow-right text-xs" />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <Logo className="text-xl" />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} DhakaStar. Premium cooling for Bangladesh.
          </p>
        </div>
      </footer>

      {/* Product Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} labelledBy="product-title">
        {selected && (
          <div className="p-8 text-center">
            <div
              className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(123,197,211,0.2), rgba(212,175,55,0.15))",
                border: "1px solid rgba(10,43,61,0.08)",
              }}
            >
              <i className={`fa-solid ${selected.icon} text-6xl`} style={{ color: "var(--ds-navy)" }} />
            </div>
            <h3 id="product-title" className="font-display text-3xl" style={{ color: "var(--ds-navy)" }}>
              {selected.name}
            </h3>
            <p className="mt-2 text-sm" style={{ color: "rgba(10,43,61,0.7)" }}>{selected.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-left">
              <div className="rounded-xl p-4" style={{ background: "rgba(123,197,211,0.12)" }}>
                <p className="text-[11px] uppercase tracking-wider" style={{ color: "rgba(10,43,61,0.6)" }}>Capacity</p>
                <p className="mt-1 font-semibold" style={{ color: "var(--ds-navy)" }}>{selected.capacity}</p>
              </div>
              <div className="rounded-xl p-4" style={{ background: "rgba(212,175,55,0.12)" }}>
                <p className="text-[11px] uppercase tracking-wider" style={{ color: "rgba(10,43,61,0.6)" }}>Rating</p>
                <div className="mt-1"><Stars rating={selected.rating} /></div>
              </div>
            </div>

            <div className="mt-6 font-display text-4xl" style={{ color: "var(--ds-gold)" }}>
              {formatBDT(selected.price)}
            </div>

            <button
              onClick={() => startOrder(selected)}
              className="ds-pulse mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold ds-gold-gradient"
              style={{ color: "var(--ds-navy)" }}
            >
              Order Now <i className="fa-solid fa-arrow-right" />
            </button>
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
                <div className="mt-2 flex items-center gap-3 rounded-xl p-3" style={{ background: "rgba(10,43,61,0.05)" }}>
                  <i className={`fa-solid ${orderProduct.icon} text-2xl`} style={{ color: "var(--ds-navy)" }} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "var(--ds-navy)" }}>{orderProduct.name}</p>
                    <p className="text-xs" style={{ color: "rgba(10,43,61,0.6)" }}>{formatBDT(orderProduct.price)} · {orderProduct.capacity}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <Field label="Full Name">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="ds-input"
                      placeholder="e.g. Rahim Ahmed"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="ds-input"
                      placeholder="01XXXXXXXXX"
                    />
                  </Field>
                  <Field label="Delivery Address">
                    <textarea
                      required
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="ds-input min-h-[72px]"
                      placeholder="House, road, area, city"
                    />
                  </Field>
                  <Field label="Quantity">
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: Math.max(1, Number(e.target.value) || 1) })}
                      className="ds-input"
                    />
                  </Field>

                  <div className="rounded-xl border p-3" style={{ borderColor: "var(--ds-gold)", background: "rgba(212,175,55,0.08)" }}>
                    <label className="flex items-center gap-3">
                      <input type="radio" checked readOnly className="accent-[--ds-gold]" />
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

                  <button
                    type="submit"
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold ds-gold-gradient"
                    style={{ color: "var(--ds-navy)" }}
                  >
                    Place Order <i className="fa-solid fa-check" />
                  </button>
                </form>
              </>
            ) : (
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(212,175,55,0.18)" }}>
                  <i className="fa-solid fa-check text-2xl" style={{ color: "var(--ds-gold)" }} />
                </div>
                <h3 className="font-display text-2xl" style={{ color: "var(--ds-navy)" }}>
                  ✅ Order placed!
                </h3>
                <p className="mt-2 text-sm" style={{ color: "rgba(10,43,61,0.7)" }}>
                  We will call you within 1 hour to confirm your DhakaStar delivery.
                </p>
                <button
                  onClick={closeOrder}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium"
                  style={{ background: "var(--ds-navy)", color: "white" }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        )}
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
