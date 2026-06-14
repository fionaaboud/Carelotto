import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { IDKitRequestWidget, proofOfHuman } from '@worldcoin/idkit';
import {
  ArrowRight,
  ChevronRight,
  CreditCard,
  Gift,
  Heart,
  Palette,
  QrCode,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Wallet,
} from 'lucide-react';
import { lookupEnsIdentity, lookupEnsName, shortenAddress } from './lib/ens';
import {
  fetchWorldRpContext,
  getWorldProofId,
  getWorldProofSignal,
  isWorldConfigured,
  verifyWorldProof,
  worldConfig,
} from './lib/worldId';

const palette = {
  olive: '#3f4513',
  oliveDark: '#252a0b',
  oliveSoft: '#69713a',
  cream: '#f2ead9',
  paper: '#eee3cf',
  pink: '#df8076',
  ink: '#24221f',
};

const REQUEST_LOTTERY_WINNER_CALLDATA = '0x5352619d';
const SEPOLIA_CHAIN_ID = '0xaa36a7';

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
    { icon: Palette, label: 'Artist wallet', text: 'Keeps the artwork alive.' },
    { icon: Users, label: 'Social impact cause', text: 'Supports care initiatives.' },
    { icon: Ticket, label: 'Lottery pool', text: 'Funds the Chainlink-selected winner.' },
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

function ReceiptPanel({ plays, selectedCause, split, lastPurchase, selectedArt, paymentMethod, worldVerification, lotteryRound }) {
  const rows = [
    ['Total paid', `$${split.total}`],
    ['Artist wallet', `$${split.artist}`],
    ['Social impact', `$${split.cause}`],
    ['Lottery pool', `$${split.lottery}`],
  ];

  return (
    <BlueprintFrame className="p-5">
      <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#24221f]">
        <Ticket className="h-4 w-4" /> Art piece that serves as receipt
      </div>
      <div className="mx-auto max-w-xs border border-[#24221f]/25 bg-[#fff8ea] p-5 shadow-sm">
        <div className="text-center font-serif text-xl">CareLotto</div>
        <div className="mt-2 text-center font-mono text-xs">
          {lastPurchase ? `TICKET ${String(lastPurchase.ticketNumber).padStart(3, '0')}` : 'READY TO PURCHASE'}
        </div>
        <div className="my-5 h-32 rounded-sm border border-[#24221f]/20 bg-[radial-gradient(circle_at_30%_30%,#df8076,transparent_35%),linear-gradient(135deg,#efe0c4,#8da05a)]" />
        <div className="mb-3 rounded-md border border-[#24221f]/10 bg-[#f2ead9]/70 p-3 font-mono text-[11px] uppercase tracking-wide">
          Artwork: {lastPurchase?.artTitle ?? selectedArt?.title ?? 'Choose art'}
        </div>
        <div className="mb-4 rounded-md border border-[#24221f]/10 bg-[#f2ead9]/70 p-3 font-mono text-[11px] uppercase tracking-wide">
          Cause: {selectedCause.name}
        </div>
        <div className="mb-4 rounded-md border border-[#24221f]/10 bg-[#f2ead9]/70 p-3 font-mono text-[11px] uppercase tracking-wide">
          Human proof: {worldVerification.status === 'verified' ? 'World ID verified' : 'Pending'}
        </div>
        <div className="mb-4 rounded-md border border-[#24221f]/10 bg-[#f2ead9]/70 p-3 font-mono text-[11px] uppercase tracking-wide">
          Lottery round: #{lastPurchase?.roundId ?? lotteryRound.id}
        </div>
        <div className="space-y-2 font-mono text-sm">
          {rows.map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-[#24221f]/10 pb-1">
              <span>{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-md border border-[#24221f]/10 bg-[#f2ead9]/70 p-3 font-mono text-[10px] uppercase tracking-wide">
          {lastPurchase
            ? `Purchase confirmed by ${lastPurchase.paymentMethod}. Split recorded.`
            : `Payment: ${paymentMethod}. Signup and proof-of-human required.`}
        </div>
        <Heart className="mx-auto mt-5 h-6 w-6 stroke-[#df8076]" />
      </div>
    </BlueprintFrame>
  );
}

function HeroMachineRender({ onHeartClick }) {
  return (
    <motion.button
      type="button"
      onClick={onHeartClick}
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="group relative mx-auto block w-full max-w-[520px] focus:outline-none"
      aria-label="Press the rendered CareLotto machine heart"
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
        Press heart to choose art
      </div>
    </motion.button>
  );
}

function CheckoutPanel({
  artOptions,
  selectedArt,
  selectedArtId,
  setSelectedArtId,
  causes,
  selectedCause,
  selectedCauseName,
  setSelectedCauseName,
  buyerEmail,
  setBuyerEmail,
  buyerCode,
  setBuyerCode,
  buyerSession,
  buyerAuthStep,
  buyerAuthMessage,
  isBuyerAuthPending,
  privyAuthEnabled,
  privyReady,
  handleBuyerSignup,
  worldVerification,
  handleWorldVerification,
  isWorldRequestPending,
  connectedWallet,
  handleConnectWallet,
  ensIdentity,
  appEnsIdentity,
  paymentMethod,
  setPaymentMethod,
  purchases,
  lotteryRound,
  handlePurchase,
}) {
  const isHumanVerified = worldVerification.status === 'verified';
  const isRoundOpen = lotteryRound.status === 'open';
  const hasUsedWorldProof = Boolean(
    worldVerification.proofId &&
      purchases.some((purchase) => purchase.worldProof === worldVerification.proofId && purchase.roundId === lotteryRound.id),
  );
  const canPay = Boolean(selectedArt && buyerSession && isHumanVerified && !hasUsedWorldProof && isRoundOpen);
  const participationStatus = !isRoundOpen
    ? 'Round closed'
    : !buyerSession
    ? 'Email signup required'
    : hasUsedWorldProof
      ? 'Entry recorded'
      : isHumanVerified
        ? 'Human verified'
        : 'World ID proof required';
  const participationMessage = !isRoundOpen
    ? 'This lottery round is closed and ready for Chainlink winner selection.'
    : !buyerSession
    ? 'Create the buyer session before requesting proof-of-human.'
    : hasUsedWorldProof
      ? 'This proof has already been used for the current lottery round.'
      : isHumanVerified
      ? 'This buyer can participate in the receipt lottery once.'
      : 'World ID proof protects the lottery pool from duplicate or automated entries.';
  const ensDisplayName = ensIdentity?.displayName ?? (connectedWallet ? shortenAddress(connectedWallet.address) : null);
  const ensTextRecords = ensIdentity?.textRecords ?? {};
  const ensAvatarIsImage = Boolean(ensIdentity?.avatar?.startsWith('http'));
  const signupButtonLabel = buyerSession
    ? 'Connected'
    : isBuyerAuthPending
      ? 'Working'
      : privyAuthEnabled
        ? buyerAuthStep === 'code'
          ? 'Verify code'
          : 'Send code'
        : 'Continue demo';

  return (
    <BlueprintFrame className="p-6 md:p-8">
      <div className="font-mono text-xs uppercase tracking-wider">Checkout flow</div>
      <h2 className="mt-3 font-serif text-4xl text-[#2f350d] md:text-5xl">Press heart. Choose art. Pay your way.</h2>
      <p className="mt-4 max-w-2xl leading-8 text-[#24221f]/75">
        The buyer starts with the heart, selects a receipt artwork, signs up with email through the Privy
        flow, then pays by credit card or crypto.
      </p>

      <div className="mt-8 grid gap-3 font-mono text-[10px] uppercase tracking-wider sm:grid-cols-4">
        {[
          ['1', 'Choose art', selectedArt],
          ['2', 'Email signup', buyerSession],
          ['3', 'Proof of human', isHumanVerified],
          ['4', 'Payment', paymentMethod],
        ].map(([number, label, active]) => (
          <div
            key={label}
            className={`rounded-xl border p-3 ${
              active ? 'border-[#3f4513] bg-[#fff8ea]' : 'border-[#24221f]/15 bg-[#fff8ea]/45'
            }`}
          >
            <span className="mr-2 inline-grid h-5 w-5 place-items-center rounded-full bg-[#3f4513] text-[#f2ead9]">
              {number}
            </span>
            {label}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#3f4513] text-[#f2ead9]">
              <ShieldCheck className="h-5 w-5" />
            </span>
          <div>
            <div className="font-mono text-xs uppercase tracking-wider">Human-gated participation</div>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#24221f]/70">{participationMessage}</p>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/55">
              Active lottery round #{lotteryRound.id}
            </div>
          </div>
          </div>
          <span
            className={`rounded-full border px-3 py-2 font-mono text-[10px] uppercase tracking-wider ${
              isHumanVerified ? 'border-[#3f4513] bg-white text-[#3f4513]' : 'border-[#24221f]/20 bg-[#f2ead9]/75'
            }`}
          >
            {participationStatus}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 font-mono text-xs uppercase tracking-wider">Choose receipt artwork</div>
        <div className="grid gap-3 md:grid-cols-3">
          {artOptions.map((art) => {
            const isSelected = selectedArtId === art.id;

            return (
              <button
                key={art.id}
                type="button"
                onClick={() => setSelectedArtId(art.id)}
                className={`rounded-2xl border p-3 text-left transition ${
                  isSelected
                    ? 'border-[#3f4513] bg-[#fff8ea] shadow-[0_10px_30px_rgba(63,69,19,.14)]'
                    : 'border-[#24221f]/20 bg-[#fff8ea]/60 hover:bg-[#fff8ea]'
                }`}
              >
                {art.image ? (
                  <img
                    src={art.image}
                    alt={art.title}
                    className="h-44 w-full rounded-xl border border-[#24221f]/15 object-cover"
                  />
                ) : (
                  <div
                    className="h-44 rounded-xl border border-[#24221f]/15"
                    style={{ background: art.background }}
                    aria-hidden="true"
                  />
                )}
                <div className="mt-3 font-serif text-2xl">{art.title}</div>
                <p className="mt-1 text-sm leading-6 text-[#24221f]/70">{art.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 font-mono text-xs uppercase tracking-wider">Choose social impact cause</div>
        <div className="grid gap-3 sm:grid-cols-2">
          {causes.map((cause) => {
            const isSelected = selectedCause.name === cause.name;

            return (
              <button
                key={cause.name}
                type="button"
                onClick={() => setSelectedCauseName(cause.name)}
                className={`min-h-36 rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? 'border-[#3f4513] bg-[#fff8ea] shadow-[0_10px_30px_rgba(63,69,19,.14)]'
                    : 'border-[#24221f]/20 bg-[#fff8ea]/60 hover:bg-[#fff8ea]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#3f4513]">
                      {cause.category}
                    </div>
                    <div className="mt-2 font-serif text-2xl leading-tight">{cause.name}</div>
                  </div>
                  <span
                    className={`mt-1 h-4 w-4 rounded-full border ${
                      isSelected ? 'border-[#3f4513] bg-[#df8076]' : 'border-[#24221f]/30'
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-[#24221f]/70">{cause.description}</p>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/55">
                  {cause.wallet}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_.9fr]">
        <div className="rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
          <div className="font-mono text-xs uppercase tracking-wider">Privy email signup</div>
          <form onSubmit={handleBuyerSignup} className="mt-3 grid gap-3 md:grid-cols-[1fr_.65fr_auto]">
            <input
              type="email"
              value={buyerEmail}
              onChange={(event) => setBuyerEmail(event.target.value)}
              disabled={Boolean(buyerSession)}
              placeholder="email@example.com"
              className="min-h-12 rounded-xl border border-[#24221f]/25 bg-white px-4"
            />
            {buyerAuthStep === 'code' ? (
              <input
                type="text"
                inputMode="numeric"
                value={buyerCode}
                onChange={(event) => setBuyerCode(event.target.value)}
                placeholder="Email code"
                className="min-h-12 rounded-xl border border-[#24221f]/25 bg-white px-4"
              />
            ) : null}
            <button
              type="submit"
              disabled={Boolean(buyerSession) || isBuyerAuthPending || (privyAuthEnabled && !privyReady)}
              className="min-h-12 rounded-xl bg-[#3f4513] px-5 font-mono text-xs uppercase tracking-wider text-[#f2ead9] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {signupButtonLabel}
            </button>
          </form>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/60">
            {buyerSession
              ? `Session ready. Embedded wallet ${shortenAddress(buyerSession.wallet)}`
              : buyerAuthMessage}
          </div>
        </div>

        <div className="rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
          <div className="font-mono text-xs uppercase tracking-wider">World ID verification</div>
          <div className="mt-3 rounded-xl border border-[#24221f]/15 bg-white/60 p-4">
            <ShieldCheck className="mb-3 h-6 w-6 text-[#3f4513]" />
            <div className="font-serif text-2xl">
              {isHumanVerified ? 'Verified human' : 'One human, one receipt'}
            </div>
            <p className="mt-2 text-sm leading-6 text-[#24221f]/70">
              World ID protects the lottery pool from duplicate or automated participation before payment unlocks.
            </p>
            <button
              type="button"
              onClick={handleWorldVerification}
              disabled={!buyerSession || isHumanVerified || isWorldRequestPending}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#3f4513] px-5 py-3 font-mono text-xs uppercase tracking-wider text-[#f2ead9] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isHumanVerified ? 'Proof confirmed' : isWorldRequestPending ? 'Opening World ID' : 'Verify with World ID'}
            </button>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/60">
              {buyerSession
                ? worldVerification.message
                : 'Sign up with email before starting proof-of-human verification.'}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_.9fr]">
        <div className="rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
          <div className="font-mono text-xs uppercase tracking-wider">Payment method</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              ['card', 'Credit card', CreditCard],
              ['crypto', 'Crypto wallet', Wallet],
            ].map(([method, label, Icon]) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`rounded-xl border p-4 text-left font-mono text-xs uppercase tracking-wider ${
                  paymentMethod === method ? 'border-[#3f4513] bg-white' : 'border-[#24221f]/15 bg-[#fff8ea]/60'
                }`}
              >
                <Icon className="mb-3 h-5 w-5 text-[#3f4513]" />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-[#24221f]/15 bg-white/60 p-3 font-mono text-[10px] uppercase tracking-wide">
            {paymentMethod === 'crypto' ? (
              connectedWallet ? (
                <div className="grid gap-2">
                  <div className="flex justify-between gap-4">
                    <span>Connected wallet</span>
                    <span>{connectedWallet.address}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Network</span>
                    <span>{connectedWallet.network}</span>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleConnectWallet}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#3f4513] px-4 py-3 text-[#f2ead9]"
                >
                  Connect demo wallet
                </button>
              )
            ) : (
              <div>Card checkout placeholder. Crypto wallet can be connected later.</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
        <div className="font-mono text-xs uppercase tracking-wider">Wallet identity</div>
        <div className="mt-3 grid gap-3 font-mono text-[10px] uppercase tracking-wide md:grid-cols-3">
          <div className="rounded-xl border border-[#24221f]/15 bg-white/60 p-3">
            <div className="text-[#24221f]/55">Privy embedded wallet</div>
            <div className="mt-2">{buyerSession ? shortenAddress(buyerSession.wallet) : 'Created after email signup'}</div>
          </div>
          <div className="rounded-xl border border-[#24221f]/15 bg-white/60 p-3">
            <div className="text-[#24221f]/55">External crypto wallet</div>
            <div className="mt-2">{connectedWallet ? shortenAddress(connectedWallet.address) : 'Not connected'}</div>
          </div>
          <div className="rounded-xl border border-[#24221f]/15 bg-white/60 p-3">
            <div className="text-[#24221f]/55">ENS status</div>
            <div className="mt-2">
              {ensIdentity?.status === 'loading'
                ? 'Resolving...'
                : ensIdentity?.status === 'resolved'
                  ? ensIdentity.name
                  : connectedWallet
                    ? 'Address fallback'
                    : 'Connect wallet first'}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
        <div className="font-mono text-xs uppercase tracking-wider">ENS resolution</div>
        <div className="mt-3 flex flex-col gap-4 rounded-xl border border-[#24221f]/15 bg-white/60 p-4 sm:flex-row sm:items-center">
          <div
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#24221f]/20 font-serif text-2xl text-[#f2ead9]"
            style={{
              background:
                'radial-gradient(circle at 32% 28%, #df8076 0 18%, transparent 34%), linear-gradient(135deg, #3f4513, #69713a)',
            }}
          >
            {ensAvatarIsImage ? (
              <img src={ensIdentity.avatar} alt="" className="h-full w-full rounded-full object-cover" />
            ) : (
              ensIdentity?.avatarLabel ?? 'CL'
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-serif text-3xl leading-tight text-[#2f350d]">
              {ensDisplayName ?? 'No wallet connected'}
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/60">
              {ensIdentity?.message ?? 'Fallback will show shortened wallet address until ENS resolves.'}
            </div>
            {Object.keys(ensTextRecords).length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/65">
                {Object.entries(ensTextRecords)
                  .filter(([key]) => key !== 'avatar')
                  .map(([key, value]) => (
                    <span key={key} className="rounded-full border border-[#24221f]/15 px-2 py-1">
                      {key}: {value}
                    </span>
                  ))}
              </div>
            ) : null}
            {appEnsIdentity ? (
              <div className="mt-3 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/55">
                App identity: {appEnsIdentity.name} resolves to {shortenAddress(appEnsIdentity.address)}
              </div>
            ) : null}
          </div>
          <span className="rounded-full border border-[#24221f]/20 px-3 py-2 font-mono text-[10px] uppercase tracking-wider">
            {ensIdentity?.status === 'resolved' ? 'Resolved' : ensIdentity?.status === 'loading' ? 'Resolving' : 'Fallback'}
          </span>
        </div>
      </div>

      <button
        onClick={handlePurchase}
        disabled={!canPay}
        className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-[#df8076] px-6 py-5 font-mono text-sm uppercase tracking-wider text-[#24221f] shadow-md hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {canPay
          ? 'Pay $3 and mint receipt'
          : !isRoundOpen
            ? 'Round closed'
            : hasUsedWorldProof
            ? 'Entry already recorded'
            : 'Complete signup and World ID'}{' '}
        <ChevronRight className="ml-2 h-4 w-4" />
      </button>

      <div className="mt-6 grid gap-3 font-mono text-xs uppercase tracking-wider sm:grid-cols-3">
        <div className="rounded-xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-3">$1 artist</div>
        <div className="rounded-xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-3">$1 cause</div>
        <div className="rounded-xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-3">$1 lottery</div>
      </div>
    </BlueprintFrame>
  );
}

function CareProfile({
  ensIdentity,
  appEnsIdentity,
  connectedWallet,
  buyerSession,
  worldVerification,
  purchases,
  split,
  selectedArt,
  selectedCause,
}) {
  const displayName =
    ensIdentity?.displayName ??
    (connectedWallet ? shortenAddress(connectedWallet.address) : null) ??
    (buyerSession ? shortenAddress(buyerSession.wallet) : null) ??
    'Connect to build profile';
  const latestPurchase = purchases[purchases.length - 1];
  const ensAvatarIsImage = Boolean(ensIdentity?.avatar?.startsWith('http'));
  const profileDescription = ensIdentity?.textRecords?.description;

  return (
    <section id="profile" className="mx-auto max-w-7xl px-6 py-16">
      <BlueprintFrame className="p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider">ENS care profile</div>
            <div className="mt-4 flex items-center gap-4">
              <div
                className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[#24221f]/20 font-serif text-3xl text-[#f2ead9]"
                style={{
                  background:
                    'radial-gradient(circle at 32% 28%, #df8076 0 18%, transparent 34%), linear-gradient(135deg, #3f4513, #69713a)',
                }}
              >
                {ensAvatarIsImage ? (
                  <img src={ensIdentity.avatar} alt="" className="h-full w-full rounded-full object-cover" />
                ) : (
                  ensIdentity?.avatarLabel ?? 'CL'
                )}
              </div>
              <div>
                <h2 className="font-serif text-4xl leading-tight text-[#2f350d]">{displayName}</h2>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/60">
                  {ensIdentity?.status === 'resolved' ? 'Resolved ENS care identity' : 'Wallet fallback profile'}
                </div>
              </div>
            </div>
            <p className="mt-5 leading-8 text-[#24221f]/75">
              {profileDescription ||
                'This profile turns a buyer wallet into a public care trail: artwork collected, causes supported, and lottery participation in one judge-friendly view.'}
            </p>
            {appEnsIdentity ? (
              <div className="mt-4 rounded-xl border border-[#24221f]/15 bg-[#fff8ea]/70 p-3 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/60">
                CareLotto operator ENS: {appEnsIdentity.name} {'->'} {shortenAddress(appEnsIdentity.address)}
              </div>
            ) : null}
          </div>

          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                ['Receipts', purchases.length],
                ['Artist', `$${split.artist}`],
                ['Causes', `$${split.cause}`],
                ['Lottery', `$${split.lottery}`],
                ['Human', worldVerification.status === 'verified' ? 'Yes' : 'No'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#24221f]/55">{label}</div>
                  <div className="mt-2 font-serif text-3xl text-[#2f350d]">{value}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
                <div className="font-mono text-xs uppercase tracking-wider">Current intent</div>
                <div className="mt-3 font-serif text-2xl">{selectedArt.title}</div>
                <div className="mt-2 text-sm leading-6 text-[#24221f]/70">{selectedArt.description}</div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/55">
                  Supporting {selectedCause.name}
                </div>
              </div>

              <div className="rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
                <div className="font-mono text-xs uppercase tracking-wider">Latest receipt</div>
                {latestPurchase ? (
                  <div className="mt-3 grid gap-2 font-mono text-[10px] uppercase tracking-wide">
                    <div className="flex justify-between gap-4">
                      <span>Ticket</span>
                      <span>{String(latestPurchase.ticketNumber).padStart(3, '0')}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Artwork</span>
                      <span>{latestPurchase.artTitle}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Cause</span>
                      <span>{latestPurchase.cause}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Payment</span>
                      <span>{latestPurchase.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>World ID</span>
                      <span>{latestPurchase.worldProof ? 'verified' : 'pending'}</span>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-[#24221f]/70">
                    Complete a demo purchase to populate receipt history.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </BlueprintFrame>
    </section>
  );
}

export default function App({ privyAuth = { enabled: false, ready: false, authenticated: false } }) {
  const ticketPrice = 3;
  const artOptions = [
    {
      id: 'wave',
      title: 'Wave',
      description: 'A layered ocean portrait supporting ocean preservation.',
      image: '/art/wave.jpg',
    },
    {
      id: 'ai-mother',
      title: 'AI Mother',
      description: 'A vision of AI helping humanity solve global problems with care.',
      image: '/art/ai-mother.jpg',
    },
    {
      id: 'rise',
      title: 'Rise',
      description: 'A blue-and-yellow heart supporting families affected by the war in Ukraine.',
      image: '/art/rise.jpg',
    },
    {
      id: 'bloom',
      title: 'Care Bloom',
      description: 'Soft receipt artwork with petals, pools, and care signals.',
      background:
        'radial-gradient(circle at 25% 25%, #df8076 0 12%, transparent 28%), radial-gradient(circle at 75% 35%, #f2ead9 0 10%, transparent 26%), linear-gradient(135deg, #8da05a, #efe0c4)',
    },
    {
      id: 'signal',
      title: 'Signal Field',
      description: 'A graphic field that feels like a public-good transmission.',
      background:
        'linear-gradient(135deg, rgba(63,69,19,.95), rgba(223,128,118,.72)), repeating-linear-gradient(90deg, transparent 0 16px, rgba(255,255,255,.22) 16px 18px)',
    },
    {
      id: 'garden',
      title: 'Mutual Garden',
      description: 'Layered greens and pinks for a receipt that feels alive.',
      background:
        'radial-gradient(circle at 20% 70%, #69713a 0 18%, transparent 34%), radial-gradient(circle at 75% 25%, #df8076 0 14%, transparent 30%), linear-gradient(160deg, #f2ead9, #9aa36b)',
    },
  ];
  const causes = [
    {
      name: 'Village Health Works',
      wallet: '0x8F...Care',
      category: 'Clinic care',
      description: 'Funds community health visits and patient support.',
    },
    {
      name: 'Local artist fund',
      wallet: '0x21...Arts',
      category: 'Creative work',
      description: 'Supports artists producing CareLotto receipt artwork.',
    },
    {
      name: 'Mutual aid pantry',
      wallet: '0x44...Food',
      category: 'Food access',
      description: 'Helps stock weekly pantry drops and essentials.',
    },
    {
      name: 'Ukraine family relief',
      wallet: '0x73...Rise',
      category: 'War relief',
      description: 'Supports families affected by the war in Ukraine with care, shelter, and essentials.',
    },
  ];
  const [plays, setPlays] = useState(0);
  const [selectedArtId, setSelectedArtId] = useState(artOptions[0].id);
  const [selectedCauseName, setSelectedCauseName] = useState(causes[0].name);
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerCode, setBuyerCode] = useState('');
  const [buyerSession, setBuyerSession] = useState(null);
  const [buyerAuthStep, setBuyerAuthStep] = useState('email');
  const [buyerAuthMessage, setBuyerAuthMessage] = useState(
    privyAuth.enabled
      ? 'Privy will send a one-time email code and create the embedded wallet.'
      : 'Add VITE_PRIVY_APP_ID to enable real Privy auth. Demo signup is available locally.',
  );
  const [isBuyerAuthPending, setIsBuyerAuthPending] = useState(false);
  const [worldVerification, setWorldVerification] = useState({
    status: 'not_started',
    message: 'World ID proof not started.',
    proofId: null,
  });
  const [isWorldWidgetOpen, setIsWorldWidgetOpen] = useState(false);
  const [worldRpContext, setWorldRpContext] = useState(null);
  const [worldProofSignal, setWorldProofSignal] = useState(null);
  const [isWorldRequestPending, setIsWorldRequestPending] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [ensIdentity, setEnsIdentity] = useState(null);
  const [appEnsIdentity, setAppEnsIdentity] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [lastPurchase, setLastPurchase] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [lotteryRound, setLotteryRound] = useState({
    id: 1,
    status: 'open',
    winnerRequest: 'not_requested',
    vrfRequestId: null,
    chainlinkTxHash: null,
    randomWord: null,
    winningEntry: null,
    prizeClaimStatus: 'not_ready',
  });
  const [chainlinkRequestMessage, setChainlinkRequestMessage] = useState(
    import.meta.env.VITE_CARELOTTO_CONTRACT_ADDRESS
      ? 'Ready to request real Chainlink VRF from the deployed contract.'
      : 'Add VITE_CARELOTTO_CONTRACT_ADDRESS to send real Chainlink VRF requests.',
  );
  const selectedArt = artOptions.find((art) => art.id === selectedArtId) ?? artOptions[0];
  const selectedCause = causes.find((cause) => cause.name === selectedCauseName) ?? causes[0];
  const currentRoundEntries = useMemo(
    () => purchases.filter((purchase) => purchase.roundId === lotteryRound.id),
    [lotteryRound.id, purchases],
  );
  const closedRoundEntries = useMemo(
    () => purchases.filter((purchase) => purchase.roundId === lotteryRound.winningEntry?.roundId),
    [lotteryRound.winningEntry?.roundId, purchases],
  );
  const split = useMemo(
    () => ({
      artist: plays,
      cause: plays,
      lottery: plays,
      total: plays * ticketPrice,
    }),
    [plays],
  );
  const causeTotals = useMemo(
    () =>
      causes.map((cause) => ({
        ...cause,
        total: purchases.filter((purchase) => purchase.cause === cause.name).length,
      })),
    [causes, purchases],
  );

  useEffect(() => {
    let isMounted = true;

    if (!connectedWallet?.address) {
      setEnsIdentity(null);
      return undefined;
    }

    setEnsIdentity({
      status: 'loading',
      address: connectedWallet.address,
      displayName: shortenAddress(connectedWallet.address),
      message: 'Resolving ENS name, avatar, and text records...',
      textRecords: {},
    });

    lookupEnsIdentity(connectedWallet.address)
      .then((identity) => {
        if (isMounted) {
          setEnsIdentity(identity);
        }
      })
      .catch(() => {
        if (isMounted) {
          setEnsIdentity({
            status: 'fallback',
            address: connectedWallet.address,
            displayName: shortenAddress(connectedWallet.address),
            message: 'ENS lookup unavailable. Showing wallet fallback.',
            textRecords: {},
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [connectedWallet]);

  useEffect(() => {
    let isMounted = true;
    const operatorName = import.meta.env.VITE_OPERATOR_ENS_NAME || 'carelotto.eth';

    lookupEnsName(operatorName)
      .then((identity) => {
        if (isMounted) {
          setAppEnsIdentity(identity);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAppEnsIdentity(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!privyAuth.enabled) {
      setBuyerAuthMessage('Add VITE_PRIVY_APP_ID to enable real Privy auth. Demo signup is available locally.');
      return;
    }

    if (!privyAuth.ready) {
      setBuyerAuthMessage('Preparing Privy email signup...');
      return;
    }

    if (!privyAuth.authenticated) {
      setBuyerAuthMessage('Privy will send a one-time email code and create the embedded wallet.');
      return;
    }

    if (!privyAuth.walletAddress) {
      setBuyerAuthMessage('Email verified. Privy is preparing the embedded wallet...');
      return;
    }

    const email = privyAuth.email || buyerEmail.trim() || 'Privy buyer';

    setBuyerEmail((currentEmail) => currentEmail || email);
    setBuyerSession({
      email,
      wallet: privyAuth.walletAddress,
    });
    setBuyerAuthStep('connected');
    setBuyerAuthMessage('Privy session ready. Embedded wallet is connected.');
    setWorldVerification((current) =>
      current.status === 'verified'
        ? current
        : {
            status: 'ready',
            message: 'Ready to request World ID proof.',
            proofId: null,
          },
    );
    setWorldRpContext(null);
    setWorldProofSignal(null);
  }, [
    buyerEmail,
    privyAuth.authenticated,
    privyAuth.email,
    privyAuth.enabled,
    privyAuth.ready,
    privyAuth.walletAddress,
  ]);

  function handleHeartStart() {
    document.getElementById('play')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleBuyerSignup(event) {
    event.preventDefault();

    if (!buyerEmail.trim()) {
      return;
    }

    if (privyAuth.enabled) {
      if (!privyAuth.ready) {
        setBuyerAuthMessage('Privy is still loading. Try again in a moment.');
        return;
      }

      setIsBuyerAuthPending(true);

      try {
        if (buyerAuthStep === 'code') {
          if (!buyerCode.trim()) {
            setBuyerAuthMessage('Enter the code from your email.');
            return;
          }

          await privyAuth.loginWithCode({ code: buyerCode.trim() });
          setBuyerAuthMessage('Email verified. Creating embedded wallet...');
          return;
        }

        await privyAuth.sendCode({ email: buyerEmail.trim() });
        setBuyerAuthStep('code');
        setBuyerAuthMessage('Check your email for the Privy code.');
      } catch (error) {
        setBuyerAuthMessage(error instanceof Error ? error.message : 'Privy signup could not be completed.');
      } finally {
        setIsBuyerAuthPending(false);
      }

      return;
    }

    setBuyerSession({
      email: buyerEmail,
      wallet: import.meta.env.VITE_DEMO_EMBEDDED_WALLET || '0x9a2c4d4f8f0c8f1c6a7a4f4e6f5b4c3d2e1a0b9c',
    });

    setWorldVerification({
      status: 'ready',
      message: 'Ready to request World ID proof.',
      proofId: null,
    });
    setWorldRpContext(null);
    setWorldProofSignal(null);
    setBuyerAuthStep('connected');
    setBuyerAuthMessage('Demo session ready. Add a Privy app ID to use real auth.');
  }

  async function handleWorldVerification() {
    if (!buyerSession) {
      return;
    }

    if (!isWorldConfigured()) {
      setWorldVerification({
        status: 'configuration_needed',
        message: 'Add VITE_WORLD_APP_ID and World verify server settings to enable real World ID.',
        proofId: null,
      });
      return;
    }

    const signal = getWorldProofSignal({
      wallet: buyerSession.wallet,
      roundId: lotteryRound.id,
    });

    setIsWorldRequestPending(true);
    setWorldVerification({
      status: 'loading',
      message: 'Preparing World ID proof request...',
      proofId: null,
    });

    try {
      const rpContext = await fetchWorldRpContext({ signal });

      setWorldProofSignal(signal);
      setWorldRpContext(rpContext);
      setIsWorldWidgetOpen(true);
      setWorldVerification({
        status: 'ready',
        message: 'World ID opened. Approve the proof in World App.',
        proofId: null,
      });
    } catch (error) {
      setWorldVerification({
        status: 'error',
        message: error instanceof Error ? error.message : 'Could not prepare World ID request.',
        proofId: null,
      });
    } finally {
      setIsWorldRequestPending(false);
    }
  }

  async function handleWorldProofVerify(result) {
    if (!worldProofSignal) {
      throw new Error('Missing World proof signal.');
    }

    await verifyWorldProof({
      result,
      signal: worldProofSignal,
    });
  }

  function handleWorldProofSuccess(result) {
    setIsWorldWidgetOpen(false);
    setWorldVerification({
      status: 'verified',
      message: 'World ID proof verified for this lottery round.',
      proofId: getWorldProofId(result),
    });
  }

  function handleWorldProofError(errorCode) {
    setWorldVerification({
      status: 'error',
      message: `World ID verification failed: ${errorCode}`,
      proofId: null,
    });
  }

  function handleConnectWallet() {
    setConnectedWallet({
      address: import.meta.env.VITE_DEMO_WALLET_ADDRESS || '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      network: 'Ethereum Mainnet',
    });
  }

  function handleCloseLotteryRound() {
    if (lotteryRound.status !== 'open') {
      return;
    }

    setLotteryRound((round) => ({
      ...round,
      status: 'closed',
      winnerRequest: 'ready',
    }));
  }

  async function handleRequestLotteryWinner() {
    if (lotteryRound.status !== 'closed' || currentRoundEntries.length === 0) {
      return;
    }

    const contractAddress = import.meta.env.VITE_CARELOTTO_CONTRACT_ADDRESS;

    if (contractAddress && !window.ethereum) {
      setChainlinkRequestMessage('Install or open a browser wallet to send the real Chainlink VRF request.');
      return;
    }

    if (contractAddress && window.ethereum) {
      setChainlinkRequestMessage('Open your wallet to request Chainlink VRF on Sepolia.');

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        });
      } catch (switchError) {
        if (switchError?.code !== 4902) {
          setChainlinkRequestMessage(
            switchError instanceof Error ? switchError.message : 'Could not switch wallet to Sepolia.',
          );
          return;
        }
      }

      try {
        const [from] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from,
              to: contractAddress,
              data: REQUEST_LOTTERY_WINNER_CALLDATA,
            },
          ],
        });

        setLotteryRound((round) => ({
          ...round,
          winnerRequest: 'requested',
          chainlinkTxHash: txHash,
        }));
        setChainlinkRequestMessage('Chainlink VRF request transaction sent. The coordinator will fulfill it onchain.');
      } catch (error) {
        setChainlinkRequestMessage(
          error instanceof Error ? error.message : 'Could not send the Chainlink VRF request transaction.',
        );
      }

      return;
    }

    const requestId = `vrf-${lotteryRound.id}-${String(Date.now()).slice(-6)}`;
    const randomWord = currentRoundEntries.reduce((seed, entry, index) => {
      const artScore = entry.artTitle.split('').reduce((sum, character) => sum + character.charCodeAt(0), 0);
      return seed + artScore + entry.ticketNumber * (index + 7);
    }, lotteryRound.id * 7919);
    const winningEntryIndex = randomWord % currentRoundEntries.length;
    const winningEntry = {
      ...currentRoundEntries[winningEntryIndex],
      winningEntryIndex,
    };

    setLotteryRound((round) => ({
      ...round,
      status: 'fulfilled',
      winnerRequest: 'fulfilled',
      vrfRequestId: requestId,
      chainlinkTxHash: null,
      randomWord,
      winningEntry,
      prizeClaimStatus: 'ready',
    }));
    setChainlinkRequestMessage('Demo VRF result generated. Deploy the contract to use Chainlink fulfillment.');
  }

  function handleOpenNextLotteryRound() {
    if (lotteryRound.status === 'open' || !lotteryRound.winningEntry) {
      return;
    }

    setLotteryRound((round) => ({
      id: round.id + 1,
      status: 'open',
      winnerRequest: 'not_requested',
      vrfRequestId: null,
      chainlinkTxHash: null,
      randomWord: null,
      winningEntry: null,
      prizeClaimStatus: 'not_ready',
    }));

    setWorldVerification({
      status: buyerSession ? 'ready' : 'not_started',
      message: buyerSession ? 'Ready to request World ID proof for the next round.' : 'World ID proof not started.',
      proofId: null,
    });
    setWorldRpContext(null);
    setWorldProofSignal(null);
    setIsWorldWidgetOpen(false);
  }

  function handleMarkPrizeClaimed() {
    if (!lotteryRound.winningEntry) {
      return;
    }

    setLotteryRound((round) => ({
      ...round,
      prizeClaimStatus: 'claimed',
    }));
  }

  function handlePurchase() {
    const hasUsedWorldProof = purchases.some(
      (purchase) => purchase.worldProof === worldVerification.proofId && purchase.roundId === lotteryRound.id,
    );

    if (
      !buyerSession ||
      worldVerification.status !== 'verified' ||
      !selectedArt ||
      hasUsedWorldProof ||
      lotteryRound.status !== 'open'
    ) {
      return;
    }

    setPlays((count) => {
      const nextCount = count + 1;
      const purchase = {
        ticketNumber: nextCount,
        roundId: lotteryRound.id,
        payoutWallet: buyerSession.wallet,
        artId: selectedArt.id,
        artTitle: selectedArt.title,
        buyerEmail: buyerSession.email,
        cause: selectedCause.name,
        worldProof: worldVerification.proofId,
        paymentMethod: paymentMethod === 'card' ? 'credit card' : 'crypto',
        total: ticketPrice,
        artist: 1,
        causeShare: 1,
        lottery: 1,
      };

      setLastPurchase(purchase);
      setPurchases((current) => [...current, purchase]);

      return nextCount;
    });
  }

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
      {worldConfig.appId && worldRpContext ? (
        <IDKitRequestWidget
          open={isWorldWidgetOpen}
          onOpenChange={setIsWorldWidgetOpen}
          app_id={worldConfig.appId}
          action={worldConfig.action}
          rp_context={worldRpContext}
          allow_legacy_proofs
          preset={proofOfHuman({ signal: worldProofSignal || undefined })}
          handleVerify={handleWorldProofVerify}
          onSuccess={handleWorldProofSuccess}
          onError={handleWorldProofError}
          autoClose
        />
      ) : null}

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 font-mono text-xs uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 fill-[#df8076] stroke-[#3f4513]" />
          CareLotto
        </div>
        <div className="hidden gap-6 md:flex">
          <a href="#how">How it works</a>
          <a href="#impact">Impact</a>
          <a href="#profile">Profile</a>
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
              Start with the heart <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center rounded-full border border-[#24221f]/25 px-6 py-4 font-mono text-sm uppercase tracking-wider hover:bg-[#24221f]/5"
            >
              See the system
            </a>
          </div>
        </div>
        <HeroMachineRender onHeartClick={handleHeartStart} />
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
                weekly lottery pool. Luck becomes shared infrastructure.
              </p>
            </div>
            <SplitDiagram />
          </div>
        </BlueprintFrame>
      </section>

      <section id="play" className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_.9fr]">
        <CheckoutPanel
          artOptions={artOptions}
          selectedArt={selectedArt}
          selectedArtId={selectedArtId}
          setSelectedArtId={setSelectedArtId}
          causes={causes}
          selectedCause={selectedCause}
          selectedCauseName={selectedCauseName}
          setSelectedCauseName={setSelectedCauseName}
          buyerEmail={buyerEmail}
          setBuyerEmail={setBuyerEmail}
          buyerCode={buyerCode}
          setBuyerCode={setBuyerCode}
          buyerSession={buyerSession}
          buyerAuthStep={buyerAuthStep}
          buyerAuthMessage={buyerAuthMessage}
          isBuyerAuthPending={isBuyerAuthPending}
          privyAuthEnabled={privyAuth.enabled}
          privyReady={privyAuth.ready}
          handleBuyerSignup={handleBuyerSignup}
          worldVerification={worldVerification}
          handleWorldVerification={handleWorldVerification}
          isWorldRequestPending={isWorldRequestPending}
          connectedWallet={connectedWallet}
          handleConnectWallet={handleConnectWallet}
          ensIdentity={ensIdentity}
          appEnsIdentity={appEnsIdentity}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          purchases={purchases}
          lotteryRound={lotteryRound}
          handlePurchase={handlePurchase}
        />

        <ReceiptPanel
          plays={plays}
          selectedCause={selectedCause}
          split={split}
          lastPurchase={lastPurchase}
          selectedArt={selectedArt}
          paymentMethod={paymentMethod === 'card' ? 'credit card' : 'crypto'}
          worldVerification={worldVerification}
          lotteryRound={lotteryRound}
        />
      </section>

      <CareProfile
        ensIdentity={ensIdentity}
        appEnsIdentity={appEnsIdentity}
        connectedWallet={connectedWallet}
        buyerSession={buyerSession}
        worldVerification={worldVerification}
        purchases={purchases}
        split={split}
        selectedArt={selectedArt}
        selectedCause={selectedCause}
      />

      <section id="impact" className="mx-auto max-w-7xl px-6 py-16">
        <BlueprintFrame className="p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
                <Gift className="h-4 w-4 text-[#df8076]" /> Impact dashboard
              </div>
              <h2 className="mt-3 font-serif text-4xl text-[#2f350d]">
                Every purchase updates the care ledger.
              </h2>
              <p className="mt-4 leading-8 text-[#24221f]/75">
                The dashboard mirrors the contract split so judges can see how artist funding, cause support, and
                the lottery pool move together across each managed round.
              </p>
              <div className="mt-5 rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#24221f]/55">
                  Chainlink handoff
                </div>
                <p className="mt-2 text-sm leading-6 text-[#24221f]/70">
                  Close the active round when ticket sales end, then request Chainlink VRF winner selection from the
                  closed artwork-ticket entries.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  ['Tickets', plays],
                  ['Artist', `$${split.artist}`],
                  ['Causes', `$${split.cause}`],
                  ['Lottery', `$${split.lottery}`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#24221f]/55">{label}</div>
                    <div className="mt-2 font-serif text-3xl text-[#2f350d]">{value}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider">Lottery round management</div>
                    <div className="mt-2 font-serif text-3xl text-[#2f350d]">Round #{lotteryRound.id}</div>
                    <p className="mt-2 text-sm leading-6 text-[#24221f]/70">
                      Entries and pool totals are isolated by round so Chainlink can select from a closed entry set.
                    </p>
                  </div>
                  <span className="rounded-full border border-[#24221f]/20 bg-white/70 px-3 py-2 font-mono text-[10px] uppercase tracking-wider">
                    {lotteryRound.status === 'fulfilled'
                      ? 'VRF fulfilled'
                      : lotteryRound.winnerRequest === 'requested'
                        ? 'VRF requested'
                        : lotteryRound.status === 'open'
                          ? 'Open'
                          : 'Closed'}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Round entries', currentRoundEntries.length],
                    ['Round pool', `$${currentRoundEntries.length}`],
                    [
                      'Winner request',
                      lotteryRound.winnerRequest === 'fulfilled'
                        ? 'Fulfilled'
                        : lotteryRound.winnerRequest === 'requested'
                          ? 'Requested'
                        : lotteryRound.winnerRequest === 'ready'
                          ? 'Ready'
                          : 'Not ready',
                    ],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-[#24221f]/15 bg-white/60 p-3">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#24221f]/55">{label}</div>
                      <div className="mt-2 font-serif text-2xl text-[#2f350d]">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleCloseLotteryRound}
                    disabled={lotteryRound.status !== 'open' || currentRoundEntries.length === 0}
                    className="rounded-xl bg-[#3f4513] px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-[#f2ead9] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Close round
                  </button>
                  <button
                    type="button"
                    onClick={handleRequestLotteryWinner}
                    disabled={lotteryRound.status !== 'closed' || lotteryRound.winnerRequest !== 'ready'}
                    className="rounded-xl border border-[#24221f]/25 px-4 py-3 font-mono text-[10px] uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Request onchain VRF
                  </button>
                  <button
                    type="button"
                    onClick={handleMarkPrizeClaimed}
                    disabled={!lotteryRound.winningEntry || lotteryRound.prizeClaimStatus === 'claimed'}
                    className="rounded-xl border border-[#24221f]/25 px-4 py-3 font-mono text-[10px] uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Mark claimed
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenNextLotteryRound}
                    disabled={lotteryRound.status === 'open' || !lotteryRound.winningEntry}
                    className="rounded-xl border border-[#24221f]/25 px-4 py-3 font-mono text-[10px] uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Open next round
                  </button>
                </div>

                {lotteryRound.vrfRequestId || lotteryRound.chainlinkTxHash ? (
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-[#24221f]/15 bg-white/60 p-3">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#24221f]/55">
                        Chainlink VRF request
                      </div>
                      <div className="mt-2 font-mono text-xs uppercase tracking-wide">
                        {lotteryRound.vrfRequestId ?? shortenAddress(lotteryRound.chainlinkTxHash)}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-[#24221f]/70">
                        {lotteryRound.randomWord
                          ? `Random word ${lotteryRound.randomWord} selects entry #${
                              Number(lotteryRound.winningEntry?.winningEntryIndex ?? 0) + 1
                            }.`
                          : 'Request sent. Chainlink will call the contract back with the random word.'}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#24221f]/15 bg-white/60 p-3">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#24221f]/55">
                        Winning artwork ticket
                      </div>
                      <div className="mt-2 font-serif text-2xl text-[#2f350d]">
                        #{String(lotteryRound.winningEntry?.ticketNumber ?? 0).padStart(3, '0')}{' '}
                        {lotteryRound.winningEntry?.artTitle}
                      </div>
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/60">
                        Payout wallet {shortenAddress(lotteryRound.winningEntry?.payoutWallet ?? '')} · Prize{' '}
                        ${closedRoundEntries.length || currentRoundEntries.length} ·{' '}
                        {lotteryRound.prizeClaimStatus === 'claimed' ? 'Claimed' : 'Ready to claim'}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mt-4 rounded-xl border border-[#24221f]/15 bg-white/50 p-3 font-mono text-[10px] uppercase tracking-wide text-[#24221f]/60">
                  <div className="mb-3">{chainlinkRequestMessage}</div>
                  {currentRoundEntries.length > 0
                    ? currentRoundEntries
                        .map(
                          (entry) =>
                            `#${String(entry.ticketNumber).padStart(3, '0')} ${entry.artTitle} -> ${shortenAddress(
                              entry.payoutWallet,
                            )}`,
                        )
                        .join(' / ')
                    : 'No entries in this round yet.'}
                </div>
              </div>

              <div className="rounded-2xl border border-[#24221f]/20 bg-[#fff8ea]/70 p-4">
                <div className="mb-3 font-mono text-xs uppercase tracking-wider">Cause totals</div>
                <div className="grid gap-3">
                  {causeTotals.map((cause) => (
                    <div key={cause.name} className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <div className="font-serif text-xl">{cause.name}</div>
                        <div className="font-mono text-[10px] uppercase tracking-wide text-[#24221f]/55">
                          {cause.wallet}
                        </div>
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider">
                        ${cause.total} from {cause.total} purchase{cause.total === 1 ? '' : 's'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
