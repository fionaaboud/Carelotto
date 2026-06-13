import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  Gift,
  Heart,
  Palette,
  QrCode,
  Sparkles,
  Ticket,
  Users,
} from 'lucide-react';

const palette = {
  olive: '#3f4513',
  oliveDark: '#252a0b',
  oliveSoft: '#69713a',
  cream: '#f2ead9',
  paper: '#eee3cf',
  pink: '#df8076',
  ink: '#24221f',
};

function BlueprintFrame({ children, className = '' }) {
  return (
    <div
      className={`relative border border-[rgba(36,34,31,.28)] bg-[#f2ead9]/85 shadow-sm ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(rgba(36,34,31,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(36,34,31,.045) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    >
      <span className="absolute -left-2 -top-2 h-4 w-4 border border-[#24221f]/40 bg-[#f2ead9]" />
      <span className="absolute -right-2 -top-2 h-4 w-4 border border-[#24221f]/40 bg-[#f2ead9]" />
      <span className="absolute -bottom-2 -left-2 h-4 w-4 border border-[#24221f]/40 bg-[#f2ead9]" />
      <span className="absolute -bottom-2 -right-2 h-4 w-4 border border-[#24221f]/40 bg-[#f2ead9]" />
      {children}
    </div>
  );
}

function CareCreature() {
  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: [0, -8, 0], opacity: 1 }}
      transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.6 } }}
      className="absolute -top-24 left-1/2 z-10 -translate-x-1/2"
      aria-hidden="true"
    >
      <div className="relative h-28 w-40">
        <div
          className="absolute inset-x-2 bottom-0 h-24 rounded-b-[22px] rounded-t-[60px] shadow-xl"
          style={{
            background:
              'radial-gradient(circle at 40% 35%, #77812d 0 12%, #4a5117 42%, #283008 100%)',
            boxShadow: '0 12px 24px rgba(0,0,0,.25), inset 0 0 16px rgba(255,255,255,.08)',
          }}
        />
        {Array.from({ length: 36 }).map((_, index) => {
          const angle = (index / 36) * Math.PI * 2;
          const length = 28 + (index % 5) * 4;

          return (
            <span
              key={index}
              className="absolute left-1/2 top-12 origin-bottom rounded-full bg-[#59611e]"
              style={{
                width: 2,
                height: length,
                transform: `rotate(${angle}rad) translateY(-48px)`,
              }}
            />
          );
        })}
        <div className="absolute left-[47px] top-9 h-10 w-10 rounded-full bg-[#f8f2e5] shadow-inner">
          <div className="absolute left-5 top-4 h-3 w-3 rounded-full bg-[#1f1d18]" />
          <div className="absolute left-6 top-3 h-1.5 w-1.5 rounded-full bg-white" />
        </div>
        <div className="absolute right-[47px] top-9 h-10 w-10 rounded-full bg-[#f8f2e5] shadow-inner">
          <div className="absolute left-3 top-4 h-3 w-3 rounded-full bg-[#1f1d18]" />
          <div className="absolute left-4 top-3 h-1.5 w-1.5 rounded-full bg-white" />
        </div>
        <div className="absolute bottom-0 left-8 h-6 w-12 rounded-t-full bg-[#4c5418]" />
        <div className="absolute bottom-0 right-8 h-6 w-12 rounded-t-full bg-[#4c5418]" />
      </div>
    </motion.div>
  );
}

function CareMachine({ plays, setPlays }) {
  const split = useMemo(
    () => ({ project: plays, community: plays, lotto: plays, total: plays * 3 }),
    [plays],
  );

  return (
    <div className="relative mx-auto mt-28 w-full max-w-[390px]">
      <CareCreature />
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-visible rounded-[2.2rem] border border-[#1b1d08] bg-[#3f4513] p-5 text-[#f7e7be] shadow-2xl sm:p-6"
        style={{ boxShadow: '0 32px 70px rgba(20,18,9,.38), inset 0 0 30px rgba(255,255,255,.08)' }}
      >
        <div className="absolute inset-3 rounded-[1.7rem] border border-[#d0b56b]/30" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="font-mono text-3xl tracking-wide text-[#ffd3c8] drop-shadow-[0_0_10px_rgba(255,154,139,.9)] sm:text-4xl">
            CareLotto
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setPlays((count) => count + 1)}
            className="group relative grid h-32 w-32 place-items-center rounded-full focus:outline-none focus:ring-4 focus:ring-[#df8076]/40"
            aria-label="Press the care trigger"
          >
            <span className="absolute inset-0 rounded-[45%_45%_50%_50%] bg-[#8f4f3e] opacity-40 blur-md" />
            <Heart className="relative h-32 w-32 fill-[#df8076] stroke-[#f4c7bd] stroke-[1.5] drop-shadow-xl transition group-hover:scale-105" />
          </motion.button>

          <div className="rounded-xl border border-[#d7c180]/35 px-4 py-2 font-mono text-sm text-[#e7d6aa]">
            scan to begin <QrCode className="ml-2 inline h-4 w-4" />
          </div>

          <div className="w-full rounded-2xl border border-[#d0b56b]/25 bg-[#2b300c]/45 p-4 font-mono text-lg leading-8">
            <div>$1 → project</div>
            <div>$1 → community</div>
            <div>$1 → weekly lotto pool</div>
          </div>

          <div className="relative mt-2 w-48 rounded-t-xl border border-[#1d1b11] bg-[#17170f] p-2 shadow-inner">
            <div className="h-3 rounded-full bg-[#f2ead9]/80" />
          </div>

          <motion.div
            key={plays}
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="-mt-2 w-40 rotate-2 border border-[#24221f]/30 bg-[#f9f1df] p-3 text-center text-[#24221f] shadow-xl"
          >
            <div className="font-serif text-sm font-bold">CareLotto</div>
            <div className="mt-2 font-mono text-[10px]">PLAY: ${split.total}</div>
            <div className="mt-1 font-mono text-[10px]">PROJECT: ${split.project}</div>
            <div className="font-mono text-[10px]">COMMUNITY: ${split.community}</div>
            <div className="font-mono text-[10px]">WEEKLY POOL: ${split.lotto}</div>
            <Heart className="mx-auto mt-3 h-5 w-5 stroke-[#df8076]" />
          </motion.div>
        </div>
      </motion.div>
      <div className="mx-auto flex w-[86%] justify-between px-7">
        <div className="h-7 w-12 rounded-b-lg bg-[#2b300c]" />
        <div className="h-7 w-12 rounded-b-lg bg-[#2b300c]" />
      </div>
    </div>
  );
}

function SplitDiagram() {
  const items = [
    { icon: Palette, label: 'Project fund', text: 'Keeps the artwork alive.' },
    { icon: Users, label: 'Community fund', text: 'Supports care initiatives.' },
    { icon: Ticket, label: 'Weekly lotto', text: 'Creates direct support.' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="rounded-2xl border border-[#24221f]/20 bg-[#f8efd9]/70 p-5"
        >
          <item.icon className="mb-4 h-7 w-7 text-[#3f4513]" />
          <div className="font-mono text-xs uppercase tracking-wider text-[#3f4513]">$1 split</div>
          <h3 className="mt-1 font-serif text-2xl text-[#24221f]">{item.label}</h3>
          <p className="mt-2 text-sm leading-6 text-[#24221f]/75">{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

function ReceiptPanel({ plays, selectedCause }) {
  const rows = [
    ['Play', `$${plays * 3}`],
    ['Project', `$${plays}`],
    ['Community', `$${plays}`],
    ['Weekly pool', `$${plays}`],
  ];

  return (
    <BlueprintFrame className="p-5">
      <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#24221f]">
        <Ticket className="h-4 w-4" /> Art piece that serves as receipt
      </div>
      <div className="mx-auto max-w-xs border border-[#24221f]/25 bg-[#fff8ea] p-5 shadow-sm">
        <div className="text-center font-serif text-xl">CareLotto</div>
        <div className="mt-2 text-center font-mono text-xs">06/03/2026 · 12:28</div>
        <div className="my-5 h-32 rounded-sm border border-[#24221f]/20 bg-[radial-gradient(circle_at_30%_30%,#df8076,transparent_35%),linear-gradient(135deg,#efe0c4,#8da05a)]" />
        <div className="mb-4 rounded-md border border-[#24221f]/10 bg-[#f2ead9]/70 p-3 font-mono text-[11px] uppercase tracking-wide">
          Recipient: {selectedCause}
        </div>
        <div className="space-y-2 font-mono text-sm">
          {rows.map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-[#24221f]/10 pb-1">
              <span>{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <Heart className="mx-auto mt-5 h-6 w-6 stroke-[#df8076]" />
      </div>
    </BlueprintFrame>
  );
}

function HeroMachineRender({ setPlays }) {
  return (
    <motion.button
      type="button"
      onClick={() => setPlays((count) => count + 1)}
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="group relative mx-auto block w-full max-w-[520px] focus:outline-none"
      aria-label="Press the rendered CareLotto machine"
    >
      <div className="absolute -inset-4 rounded-[2.5rem] border border-[#24221f]/20 bg-[#f2ead9]/55 shadow-2xl transition group-hover:-translate-y-1" />
      <div className="relative overflow-hidden rounded-[2rem] border border-[#24221f]/25 bg-[#efe5d1] shadow-[0_32px_70px_rgba(20,18,9,.22)]">
        <img
          src="/carelotto-machine-draft-crop.png"
          alt="Draft 3D rendering of the CareLotto vending machine"
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-[#24221f]/20 bg-[#f8efd9]/90 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-[#24221f] shadow-sm backdrop-blur">
        Draft render preview
      </div>
    </motion.button>
  );
}

export default function App() {
  const [plays, setPlays] = useState(1);
  const [selectedCause, setSelectedCause] = useState('Village Health Works');
  const causes = ['Village Health Works', 'Local artist fund', 'Mutual aid pantry', 'Maternal care project'];

  return (
    <main
      className="min-h-screen overflow-hidden text-[#24221f]"
      style={{
        backgroundColor: palette.paper,
        backgroundImage:
          'linear-gradient(rgba(36,34,31,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(36,34,31,.055) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 font-mono text-xs uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 fill-[#df8076] stroke-[#3f4513]" />
          CareLotto
        </div>
        <div className="hidden gap-6 md:flex">
          <a href="#how">How it works</a>
          <a href="#impact">Impact</a>
          <a href="#play">Play</a>
        </div>
        <a href="#play" className="rounded-full border border-[#24221f]/25 px-4 py-2 hover:bg-[#24221f]/5">
          Begin
        </a>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-[1fr_.9fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#24221f]/20 bg-[#f8efd9]/70 px-4 py-2 font-mono text-xs uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-[#df8076]" /> An art vending machine for collective care
          </div>
          <h1 className="max-w-3xl font-serif text-5xl leading-[.95] tracking-tight text-[#2f350d] md:text-8xl">
            You play. We share. Care circulates.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#24221f]/75">
            CareLotto transforms a small act of participation into ongoing support for artists and community.
            Each $3 play creates a transparent split between project support, community care, and a weekly
            individual lotto pool.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#play"
              className="inline-flex items-center justify-center rounded-full bg-[#3f4513] px-6 py-4 font-mono text-sm uppercase tracking-wider text-[#f2ead9] shadow-lg hover:bg-[#252a0b]"
            >
              Press the heart <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center rounded-full border border-[#24221f]/25 px-6 py-4 font-mono text-sm uppercase tracking-wider hover:bg-[#24221f]/5"
            >
              See the system
            </a>
          </div>
        </div>
        <HeroMachineRender setPlays={setPlays} />
      </section>

      <section id="how" className="mx-auto max-w-7xl px-6 py-16">
        <BlueprintFrame className="p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider">Distribution system</div>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-[#2f350d] md:text-5xl">
                A simple machine with a transparent purpose.
              </h2>
              <p className="mt-5 leading-8 text-[#24221f]/75">
                Each play touches society in three directions: project support, community initiatives, and a
                weekly lotto pool. Luck becomes shared infrastructure.
              </p>
            </div>
            <SplitDiagram />
          </div>
        </BlueprintFrame>
      </section>

      <section id="play" className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_.9fr]">
        <BlueprintFrame className="p-6 md:p-8">
          <div className="font-mono text-xs uppercase tracking-wider">Functional prototype</div>
          <h2 className="mt-3 font-serif text-4xl text-[#2f350d] md:text-5xl">Begin with one press.</h2>
          <p className="mt-4 leading-8 text-[#24221f]/75">
            This web version turns the machine into an interactive mockup: choose a recipient, press the heart,
            and watch the receipt and impact split update.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="font-mono text-xs uppercase tracking-wider">Community recipient</span>
              <select
                value={selectedCause}
                onChange={(event) => setSelectedCause(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#24221f]/25 bg-[#fff8ea] p-3"
              >
                {causes.map((cause) => (
                  <option key={cause}>{cause}</option>
                ))}
              </select>
            </label>
            <div className="rounded-xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
              <div className="font-mono text-xs uppercase tracking-wider">Selected care path</div>
              <div className="mt-2 font-serif text-2xl">{selectedCause}</div>
            </div>
          </div>

          <button
            onClick={() => setPlays((count) => count + 1)}
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-[#df8076] px-6 py-5 font-mono text-sm uppercase tracking-wider text-[#24221f] shadow-md hover:brightness-95 sm:w-auto"
          >
            Add a $3 play <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </BlueprintFrame>

        <ReceiptPanel plays={plays} selectedCause={selectedCause} />
      </section>

      <section id="impact" className="mx-auto max-w-7xl px-6 py-16">
        <BlueprintFrame className="p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
                <Gift className="h-4 w-4 text-[#df8076]" /> Example impact
              </div>
              <h2 className="mt-3 font-serif text-4xl text-[#2f350d]">
                The dispensed artwork becomes a record of care.
              </h2>
            </div>
            <p className="leading-8 text-[#24221f]/75">
              A play can dispense a collectible artwork connected to a social care project, while also generating
              a receipt that records participation. The website can later connect to payment, QR onboarding, NFT
              receipts, winner selection, and transparent impact tracking.
            </p>
          </div>
        </BlueprintFrame>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-10 pt-8">
        <div className="flex flex-col justify-between gap-4 border-t border-[#24221f]/20 pt-6 font-mono text-xs uppercase tracking-wider md:flex-row">
          <span>Drawing no. C-684 · CareLotto system overview</span>
          <span>Care is everything</span>
        </div>
      </footer>
    </main>
  );
}
