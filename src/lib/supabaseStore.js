const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function getSupabaseHeaders(extraHeaders = {}) {
  return {
    apikey: supabaseAnonKey,
    authorization: `Bearer ${supabaseAnonKey}`,
    'content-type': 'application/json',
    ...extraHeaders,
  };
}

function getRestUrl(path) {
  return `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${path}`;
}

function assertSupabaseResponse(response, fallbackMessage) {
  if (!response.ok) {
    throw new Error(fallbackMessage);
  }
}

function toSupabasePurchase(purchase) {
  return {
    ticket_number: purchase.ticketNumber,
    round_id: purchase.roundId,
    payout_wallet: purchase.payoutWallet,
    art_id: purchase.artId,
    art_title: purchase.artTitle,
    buyer_email: null,
    cause: purchase.cause,
    world_proof: purchase.worldProof,
    payment_method: purchase.paymentMethod,
    total: purchase.total,
    artist: purchase.artist,
    cause_share: purchase.causeShare,
    lottery: purchase.lottery,
  };
}

function fromSupabasePurchase(row) {
  return {
    id: row.id,
    ticketNumber: row.ticket_number,
    roundId: row.round_id,
    payoutWallet: row.payout_wallet,
    artId: row.art_id,
    artTitle: row.art_title,
    buyerEmail: row.buyer_email,
    cause: row.cause,
    worldProof: row.world_proof,
    paymentMethod: row.payment_method,
    total: row.total,
    artist: row.artist,
    causeShare: row.cause_share,
    lottery: row.lottery,
    createdAt: row.created_at,
  };
}

function toSupabaseRound(round) {
  return {
    id: round.id,
    status: round.status,
    winner_request: round.winnerRequest,
    vrf_request_id: round.vrfRequestId,
    chainlink_tx_hash: round.chainlinkTxHash,
    random_word: round.randomWord === null || round.randomWord === undefined ? null : String(round.randomWord),
    winning_entry: round.winningEntry,
    prize_claim_status: round.prizeClaimStatus,
    updated_at: new Date().toISOString(),
  };
}

function fromSupabaseRound(row) {
  return {
    id: row.id,
    status: row.status,
    winnerRequest: row.winner_request,
    vrfRequestId: row.vrf_request_id,
    chainlinkTxHash: row.chainlink_tx_hash,
    randomWord: row.random_word,
    winningEntry: row.winning_entry,
    prizeClaimStatus: row.prize_claim_status,
    updatedAt: row.updated_at,
  };
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export async function fetchCareLottoState() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const [purchaseResponse, roundResponse] = await Promise.all([
    fetch(getRestUrl('carelotto_purchases?select=*&order=ticket_number.asc'), {
      headers: getSupabaseHeaders(),
    }),
    fetch(getRestUrl('carelotto_lottery_rounds?select=*&order=id.desc&limit=1'), {
      headers: getSupabaseHeaders(),
    }),
  ]);

  assertSupabaseResponse(purchaseResponse, 'Could not load Supabase purchases.');
  assertSupabaseResponse(roundResponse, 'Could not load Supabase lottery round.');

  const [purchaseRows, roundRows] = await Promise.all([purchaseResponse.json(), roundResponse.json()]);

  return {
    purchases: Array.isArray(purchaseRows) ? purchaseRows.map(fromSupabasePurchase) : [],
    lotteryRound: Array.isArray(roundRows) && roundRows[0] ? fromSupabaseRound(roundRows[0]) : null,
  };
}

export async function insertCareLottoPurchase(purchase) {
  if (!isSupabaseConfigured()) {
    return purchase;
  }

  const response = await fetch(getRestUrl('carelotto_purchases'), {
    method: 'POST',
    headers: getSupabaseHeaders({ prefer: 'return=representation' }),
    body: JSON.stringify(toSupabasePurchase(purchase)),
  });

  assertSupabaseResponse(response, 'Could not save Supabase purchase.');

  const rows = await response.json();
  return Array.isArray(rows) && rows[0] ? fromSupabasePurchase(rows[0]) : purchase;
}

export async function saveCareLottoRound(round) {
  if (!isSupabaseConfigured()) {
    return round;
  }

  const response = await fetch(getRestUrl('carelotto_lottery_rounds?on_conflict=id'), {
    method: 'POST',
    headers: getSupabaseHeaders({ prefer: 'resolution=merge-duplicates,return=representation' }),
    body: JSON.stringify(toSupabaseRound(round)),
  });

  assertSupabaseResponse(response, 'Could not save Supabase lottery round.');

  const rows = await response.json();
  return Array.isArray(rows) && rows[0] ? fromSupabaseRound(rows[0]) : round;
}
