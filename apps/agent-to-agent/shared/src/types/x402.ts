export interface X402PaymentRequired {
  status: 402;
  accepts: PaymentAccept[];
  description: string;
  resourceUrl: string;
}

export interface PaymentAccept {
  scheme: string;
  network?: string;
  maxAmountRequired: number;
  currency: string;
  recipient: string;
  description?: string;
}

export interface PaymentProof {
  scheme: string;
  network?: string;
  payload: string;
  signature: string;
}
