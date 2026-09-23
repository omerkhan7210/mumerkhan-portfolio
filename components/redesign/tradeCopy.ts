/* Shared trade-personalization data for the /redesign landing page.
   Cold-email links can append ?trade=hvac (etc.) and optionally
   &company=Acme+HVAC so the hero speaks directly to the recipient's
   industry — the whole point of this page vs. the general homepage. */

export type TradeKey = 'hvac' | 'plumbing' | 'roofing' | 'cleaning' | 'electrical';

export type TradeCopy = {
  label: string;
  short: string;
  painPoint: string;
  urgentExample: string;
};

export const TRADE_COPY: Record<TradeKey, TradeCopy> = {
  hvac: {
    label: 'HVAC',
    short: 'HVAC companies',
    painPoint: 'no-heat and no-AC calls',
    urgentExample: 'a furnace out at 11pm in January',
  },
  plumbing: {
    label: 'Plumbing',
    short: 'plumbing companies',
    painPoint: 'burst pipes and blocked drains',
    urgentExample: 'a flooded kitchen on a Sunday morning',
  },
  roofing: {
    label: 'Roofing',
    short: 'roofing companies',
    painPoint: 'storm damage and leak repairs',
    urgentExample: 'a leak the night after a storm',
  },
  cleaning: {
    label: 'Cleaning & Facilities',
    short: 'cleaning & facilities companies',
    painPoint: 'recurring contracts and one-off bookings',
    urgentExample: 'a move-out clean booked for tomorrow',
  },
  electrical: {
    label: 'Electrical',
    short: 'electrical companies',
    painPoint: 'safety call-outs and rewiring jobs',
    urgentExample: 'a tripped panel with no power in the house',
  },
};

export const DEFAULT_TRADE_COPY: TradeCopy = {
  label: 'home service',
  short: 'trade & home service businesses',
  painPoint: 'inbound calls and quote requests',
  urgentExample: 'a job that needs booking today, not next week',
};

export function getTradeCopy(trade?: string | null): TradeCopy {
  if (trade && trade.toLowerCase() in TRADE_COPY) {
    return TRADE_COPY[trade.toLowerCase() as TradeKey];
  }
  return DEFAULT_TRADE_COPY;
}

export const TRADE_OPTIONS: { value: TradeKey | 'other'; label: string }[] = [
  { value: 'hvac', label: 'HVAC' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'cleaning', label: 'Cleaning & Facilities' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'other', label: 'Other home service' },
];
