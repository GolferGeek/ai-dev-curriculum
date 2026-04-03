export interface MandateConstraints {
  maxAmount: number;
  currency: string;
  validUntil: string;
  allowedMerchants?: string[];
  requireApprovalAbove?: number;
}

export interface IntentMandate {
  id: string;
  userId: string;
  intent: string;
  constraints: MandateConstraints;
  createdAt: string;
  status: 'active' | 'expired' | 'revoked';
}

export interface PaymentRecord {
  id: string;
  mandateId: string;
  amount: number;
  currency: string;
  merchant: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
}
