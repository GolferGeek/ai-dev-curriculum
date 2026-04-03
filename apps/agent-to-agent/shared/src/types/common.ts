export enum ProtocolType {
  A2A = 'A2A',
  AP2 = 'AP2',
  X402 = 'X402',
  MCP = 'MCP',
  REST = 'REST',
}

export enum TaskState {
  SUBMITTED = 'submitted',
  WORKING = 'working',
  INPUT_REQUIRED = 'input-required',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  FAILED = 'failed',
}

export const ProtocolColor: Record<ProtocolType, string> = {
  [ProtocolType.A2A]: '#3B82F6',   // blue
  [ProtocolType.AP2]: '#10B981',   // green
  [ProtocolType.X402]: '#F59E0B',  // gold
  [ProtocolType.MCP]: '#8B5CF6',   // purple
  [ProtocolType.REST]: '#6B7280',  // gray
};
