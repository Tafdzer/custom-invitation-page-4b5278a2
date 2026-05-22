import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { submitRsvp } from "@/lib/rsvp.functions";
import coupleImg from "@/assets/couple-hero.jpg";
import signingImg from "@/assets/signing.jpg";
import restaurantImg from "@/assets/restaurant.jpg";
import chandelierImg from "@/assets/chandelier.png";
import candleImg from "@/assets/candle.png";
import cupidImg from "@/assets/cupid.png";
import champagneImg from "@/assets/champagne.png";
import heart14Img from "@/assets/heart-14.png";
import fabric1 from "@/assets/fabric-1.jpg";
import fabric2 from "@/assets/fabric-2.jpg";
import fabric3 from "@/assets/fabric-3.jpg";
import fabric4 from "@/assets/fabric-4.jpg";
import fabric5 from "@/assets/fabric-5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Дмитрий & Дарья — 14.08.2026" },
      { name: "description", content: "Приглашение на свадьбу Дмитрия и Дарьи — 14 августа 2026 года, Новороссийск." },
      { property: "og:title", content: "Дмитрий & Дарья — 14.08.2026" },
      { property: "og:description", content: "Мы будем счастливы разделить с вами этот день." },
    ],
  }),
  component: Invitation,
});

const Heart = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 21s-7.5-4.6-9.5-9.2C1.1 8.4 3.2 5 6.5 5c1.9 0 3.6 1 4.5 2.5l1 1.5 1-1.5C13.9 6 15.6 5 17.5 5c3.3 0 5.4 3.4 4 6.8C19.5 16.4 12 21 12 21z"/>
  </svg>
);

const Ampersand = () => <span className="script text-burgundy mx-2 text-[1.4em] align-middle">&amp;</span>;

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`w-full max-w-md mx-auto px-8 py-16 ${className}`}>{children}</section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="script text-burgundy text-5xl md:text-6xl text-center mb-8 leading-none">
      {children}
    </h2>
  );
}

function Invitation() {
  const [form, setForm] = useState({ name: "", attend: "", food: "", drink: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sendRsvp = useServerFn(submitRsvp);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const leadBlanks = 4; // Aug 1 2026 is Saturday → 5 blanks before, but Sat is index 5 (Mon=0). Let's compute: Mon=0..Sun=6, Aug 1 2026 = Saturday = index 5
  const blanks = 5;

  return (
    <main className="min-h-screen w-full text-foreground">
      {/* HERO */}
      <Section className="!py-12">
        <div className="mb-6">
          <h1 className="script text-burgundy text-5xl md:text-6xl leading-tight text-left pl-3">
            We are getting
          </h1>
          <h1 className="script text-burgundy text-5xl md:text-6xl leading-tight text-right pr-3 mt-2">
            married!
          </h1>
        </div>
        <div className="relative">
          <img
            src={chandelierImg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -top-8 -left-10 w-40 md:w-52 z-10 select-none"
          />
          <img
            src={candleImg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -right-6 w-16 md:w-20 z-10 select-none"
          />
          <img
            src={coupleImg}
            alt="Дмитрий и Дарья"
            className="relative w-full aspect-[3/4] object-cover grayscale"
            width={768} height={1024}
          />
        </div>
        <div className="text-center mt-10">
          <p className="display text-3xl md:text-4xl tracking-[0.15em] text-foreground font-light">
            ДМИТРИЙ <span className="script text-burgundy text-5xl align-middle">&amp;</span> ДАРЬЯ
          </p>
          <p className="script text-foreground text-5xl mt-4">14 / 08 / 2026</p>
        </div>
      </Section>

      {/* INVITATION + CALENDAR */}
      <Section className="relative">
        <p className="text-center serif text-lg leading-relaxed text-foreground/85 mb-4">
          <span className="script text-burgundy text-5xl float-left leading-[0.8] mr-2 mt-1">Д</span>
          орогие родные и друзья!
        </p>
        <p className="text-center serif text-lg leading-relaxed text-foreground/85 mb-3">
          Мы будем счастливы разделить с вами радость одного из самых важных дней в жизни —
          дня нашей свадьбы!
        </p>
        <p className="text-center serif italic text-lg leading-relaxed text-foreground/85 mb-12">
          Приглашаем присоединиться к нашему празднику и украсить его своим присутствием.
        </p>

        <h3 className="script text-burgundy text-6xl text-center mb-6">Август</h3>

        <div className="relative">
          <img src={cupidImg} alt="" aria-hidden className="pointer-events-none absolute -top-16 -right-6 w-28 md:w-32 z-10 select-none opacity-90" />
          <div className="grid grid-cols-7 gap-y-3 text-center sans text-xs text-burgundy mb-2">
            {["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-y-3 text-center serif text-lg">
            {Array.from({length: blanks}).map((_,i) => <div key={`b${i}`}></div>)}
            {days.map(d => (
              <div key={d} className="relative h-9 flex items-center justify-center">
                {d === 14 ? (
                  <>
                    <img src={heart14Img} alt="" aria-hidden className="absolute inset-0 m-auto h-10 w-10 object-contain select-none pointer-events-none" />
                    <span className="relative text-burgundy font-medium">{d}</span>
                  </>
                ) : (
                  <span className="text-foreground/80">{d}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* LOCATION — dark burgundy panel */}
      <section className="w-full py-16 px-6">
        <div className="bg-burgundy text-cream py-16 rounded-sm">
          <div className="max-w-md mx-auto px-8">
            <h2 className="script text-cream text-6xl text-center mb-10 leading-none">Локация</h2>

            <div className="text-center mb-8">
              <p className="serif italic text-3xl mb-1">11:40</p>
              <p className="serif text-lg">ЗАГС города Новороссийска</p>
              <p className="serif text-lg">проспект Дзержинского, 197</p>
            </div>

            <div className="relative mb-12">
              <img src={signingImg} alt="Регистрация брака" className="relative w-full aspect-[4/3] object-cover grayscale" loading="lazy" width={800} height={600}/>
            </div>

            <div className="text-center mb-8">
              <p className="serif italic text-3xl mb-1">16:00</p>
              <p className="serif text-lg">Ресторан Chateau Pinot</p>
            </div>

            <div className="relative">
              <img src={restaurantImg} alt="Ресторан" className="relative w-full aspect-[4/3] object-cover grayscale" loading="lazy" width={800} height={600}/>
            </div>
          </div>
        </div>
      </section>

      {/* DRESS CODE */}
      <Section>
        <SectionTitle>Дресс-код</SectionTitle>
        <p className="text-center serif text-lg leading-relaxed text-foreground font-bold mb-3">
          Для нас главное — ваше присутствие!
        </p>
        <p className="text-center serif text-lg leading-relaxed text-foreground/85 mb-8">
          Но мы будем рады, если в своих нарядах вы поддержите цветовую гамму нашей свадьбы:
        </p>
        <div className="flex justify-center items-center mb-4">
          {[fabric1, fabric2, fabric3, fabric4, fabric5].map((src, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-full overflow-hidden -ml-3 first:ml-0"
              style={{ zIndex: i + 1 }}
            >
              <img src={src} alt="" aria-hidden className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </Section>

      {/* WISHES */}
      <Section className="!pt-0 relative">
        <img src={champagneImg} alt="" aria-hidden className="pointer-events-none absolute -top-6 -right-2 w-20 md:w-24 z-10 select-none opacity-90" />
        <SectionTitle>Пожелания</SectionTitle>
        <p className="text-center serif text-lg leading-relaxed text-foreground/85 mb-4">
          Мы не будем оригинальными, но будем практичными. Лучший для нас подарок —
          это ваша денежная инвестиция в нашу молодую семью.
        </p>
        <div className="ornament-line my-6"><Heart className="h-4 w-4"/></div>
        <p className="text-center serif text-lg leading-relaxed text-foreground/85">
          А также просим не отягощать себя выбором цветов, так как мы не успеем ими насладиться.
          Замечательная альтернатива букетам — бутылочка вина или ваш любимый напиток :)
        </p>
      </Section>

      {/* RSVP */}
      <section className="w-full bg-burgundy/[0.04] py-16">
        <div className="max-w-md mx-auto px-8">
          <SectionTitle>Анкета гостя</SectionTitle>

          {sent ? (
            <div className="text-center py-10">
              <Heart className="h-10 w-10 text-burgundy mx-auto mb-4"/>
              <p className="script text-burgundy text-4xl">Спасибо!</p>
              <p className="serif text-foreground/80 mt-2">Мы получили ваш ответ.</p>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (submitting) return;
                setSubmitting(true);
                setError(null);
                try {
                  await sendRsvp({ data: form });
                  setSent(true);
                } catch (err) {
                  console.error(err);
                  setError("Не удалось отправить. Попробуйте ещё раз.");
                } finally {
                  setSubmitting(false);
                }
              }}
              className="serif text-burgundy space-y-7"
            >
              <div className="flex items-center gap-3">
                <label className="sans text-xs text-burgundy whitespace-nowrap">Имя Фамилия</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="flex-1 bg-transparent border-b border-burgundy/40 py-2 serif text-lg text-burgundy focus:outline-none focus:border-burgundy transition-colors"
                />
              </div>

              <Question
                label="1. Сможете ли вы присоединиться к нам?"
                name="attend"
                value={form.attend}
                onChange={(v) => setForm({...form, attend: v})}
                options={["Да, с удовольствием", "К сожалению, не смогу"]}
              />

              <Question
                label="2. Есть ли у вас предпочтения по еде?"
                name="food"
                value={form.food}
                onChange={(v) => setForm({...form, food: v})}
                options={["Нет", "Не ем мясо", "Не ем рыбу"]}
              />

              <Question
                label="3. Какой алкоголь вы предпочитаете?"
                name="drink"
                value={form.drink}
                onChange={(v) => setForm({...form, drink: v})}
                options={[
                  "Красное вино (сухое)",
                  "Красное вино (полусладкое)",
                  "Белое вино (сухое)",
                  "Белое вино (полусладкое)",
                  "Шампанское",
                  "Виски / коньяк",
                  "Водка",
                  "Не употребляю алкоголь",
                ]}
              />

              {error && (
                <p className="sans text-xs text-burgundy text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-burgundy text-cream py-3 serif tracking-[0.2em] text-sm hover:bg-burgundy-deep transition-colors uppercase disabled:opacity-60"
              >
                {submitting ? "Отправляем..." : "Отправить"}
              </button>
            </form>
          )}

          <div className="text-center mt-12">
            <p className="script text-burgundy text-5xl inline-flex items-center justify-center gap-2 leading-none">
              <span>Ждём Вас</span>
              <img src={heart14Img} alt="" aria-hidden className="h-10 w-10 object-contain -mt-1 select-none" />
            </p>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center sans text-xs text-burgundy/60">
        Дмитрий <span className="script text-base">&amp;</span> Дарья · 14.08.2026
      </footer>
    </main>
  );
}

function Question({
  label, name, value, onChange, options,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <fieldset>
      <legend className="serif text-base text-burgundy mb-3">{label}</legend>
      <div className="space-y-2">
        {options.map(opt => {
          const checked = value === opt;
          return (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
              <span className={`relative h-4 w-4 rounded-full border ${checked ? "border-burgundy" : "border-burgundy/40"} flex items-center justify-center transition`}>
                {checked && <span className="h-2 w-2 rounded-full bg-burgundy"/>}
              </span>
              <input
                type="radio" name={name} value={opt}
                checked={checked}
                onChange={() => onChange(opt)}
                className="sr-only"
              />
              <span className="serif text-base text-burgundy">{opt}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
