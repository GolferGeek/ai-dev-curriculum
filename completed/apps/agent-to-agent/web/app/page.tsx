'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Skill {
  id: string;
  name: string;
  description: string;
  inputModes?: string[];
  outputModes?: string[];
}

interface AgentCard {
  name: string;
  description: string;
  url: string;
  version?: string;
  skills: Skill[];
  securitySchemes?: Record<string, unknown>;
}

interface DiscoveryResult {
  url: string;
  available: boolean;
  card?: AgentCard;
  error?: string;
}

interface ProtocolEvent {
  id: string;
  timestamp: string;
  source: string;
  target: string;
  protocol: 'A2A' | 'X402' | 'AP2' | 'MCP' | 'REST';
  summary: string;
  request?: unknown;
  response?: unknown;
  status: 'pending' | 'completed' | 'failed';
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PROTOCOL_COLORS: Record<string, string> = {
  A2A: '#3B82F6',
  X402: '#10B981',
  AP2: '#F59E0B',
  MCP: '#8B5CF6',
  REST: '#6B7280',
};

const PROTOCOL_BG: Record<string, string> = {
  A2A: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
  X402: 'bg-green-500/20 border-green-500/40 text-green-400',
  AP2: 'bg-amber-500/20 border-amber-500/40 text-amber-400',
  MCP: 'bg-purple-500/20 border-purple-500/40 text-purple-400',
  REST: 'bg-gray-500/20 border-gray-500/40 text-gray-400',
};

const ORCHESTRATOR_URL = 'http://localhost:4000';

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function Dashboard() {
  // Discovery state
  const [agents, setAgents] = useState<DiscoveryResult[]>([]);
  const [discovering, setDiscovering] = useState(false);

  // Ask state
  const [message, setMessage] = useState('Plan a dinner for 4 people, Italian food');
  const [maxAmount, setMaxAmount] = useState(5.0);
  const [purpose, setPurpose] = useState('dining');
  const [useMandate, setUseMandate] = useState(true);
  const [events, setEvents] = useState<ProtocolEvent[]>([]);
  const [asking, setAsking] = useState(false);
  const [askResult, setAskResult] = useState<Record<string, unknown> | null>(null);

  // Inspector state
  const [inspected, setInspected] = useState<{ type: 'event' | 'agent'; data: unknown } | null>(null);

  // Protocol filter state
  const [filters, setFilters] = useState<Record<string, boolean>>({
    A2A: true, X402: true, AP2: true, MCP: true, REST: true,
  });

  // Refs
  const feedRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Auto-scroll feed
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [events]);

  /* ---- Discover ---- */
  const handleDiscover = useCallback(async () => {
    setDiscovering(true);
    try {
      const res = await fetch(`${ORCHESTRATOR_URL}/discover`);
      const data: DiscoveryResult[] = await res.json();
      setAgents(data);
    } catch {
      setAgents([]);
    } finally {
      setDiscovering(false);
    }
  }, []);

  /* ---- Ask ---- */
  const handleAsk = useCallback(async () => {
    // Reset
    setEvents([]);
    setAskResult(null);
    setAsking(true);
    setInspected(null);

    // 1. Connect SSE
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    const es = new EventSource(`${ORCHESTRATOR_URL}/events`);
    eventSourceRef.current = es;

    es.addEventListener('protocol-event', (e: MessageEvent) => {
      try {
        const evt: ProtocolEvent = JSON.parse(e.data);
        setEvents((prev) => [...prev, evt]);
      } catch {
        // ignore parse errors
      }
    });

    es.onerror = () => {
      // SSE will reconnect or we'll close it
    };

    // Brief delay to let SSE connection establish before triggering events
    await new Promise((r) => setTimeout(r, 300));

    // 2. POST /ask
    try {
      const body: Record<string, unknown> = { message };
      if (useMandate) {
        body.mandate = {
          id: `mandate-${Date.now()}`,
          userId: 'demo-user',
          intent: purpose,
          constraints: {
            maxAmount,
            currency: 'USD',
            validUntil: new Date(Date.now() + 3600000).toISOString(),
          },
          createdAt: new Date().toISOString(),
          status: 'active',
        };
      }

      const res = await fetch(`${ORCHESTRATOR_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setAskResult(data);
    } catch (err) {
      setAskResult({ error: err instanceof Error ? err.message : 'Request failed' });
    } finally {
      setAsking(false);
      // Close SSE after a short delay to catch trailing events
      setTimeout(() => {
        eventSourceRef.current?.close();
        eventSourceRef.current = null;
      }, 1000);
    }
  }, [message, maxAmount, purpose, useMandate]);

  // Cleanup SSE on unmount
  useEffect(() => {
    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  const requiresPayment = (card?: AgentCard) =>
    card?.securitySchemes && Object.keys(card.securitySchemes).length > 0;

  const filteredEvents = events.filter((e) => filters[e.protocol] !== false);

  const relativeTime = (ts: string, base?: string) => {
    const t = new Date(ts).getTime();
    const b = base ? new Date(base).getTime() : (events[0] ? new Date(events[0].timestamp).getTime() : t);
    const diff = ((t - b) / 1000).toFixed(1);
    return `+${diff}s`;
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-950 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">Agent Protocol Dashboard</h1>
          <span className="text-xs text-gray-500 font-mono">A2A + x402 + AP2 + AG-UI</span>
        </div>
        <button
          onClick={handleDiscover}
          disabled={discovering}
          className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded font-medium transition-colors"
        >
          {discovering ? 'Discovering...' : 'Discover Agents'}
        </button>
      </header>

      {/* Three-panel layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* ---- LEFT PANEL: Agent Topology ---- */}
        <aside className="w-72 border-r border-gray-800 flex flex-col shrink-0 bg-gray-950/50">
          <div className="px-4 py-3 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Agents</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {agents.length === 0 && (
              <p className="text-gray-600 text-sm text-center mt-8">
                Click &quot;Discover Agents&quot; to find available agents
              </p>
            )}
            {agents.map((agent) => (
              <button
                key={agent.url}
                onClick={() => setInspected({ type: 'agent', data: agent })}
                className={`w-full text-left rounded-lg border p-3 transition-all hover:bg-gray-800/50 ${
                  !agent.available
                    ? 'border-red-900/50 opacity-60'
                    : requiresPayment(agent.card)
                      ? 'border-green-500/40'
                      : 'border-blue-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${agent.available ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="font-medium text-sm">
                    {agent.card?.name ?? 'Unknown'}
                  </span>
                  {requiresPayment(agent.card) && (
                    <span className="text-xs text-green-400" title="x402 payment gate">&#128274;</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {agent.card?.description ?? agent.error ?? agent.url}
                </p>
                {agent.card?.skills && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {agent.card.skills.map((s) => (
                      <span key={s.id} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">
                        {s.name}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Protocol filters */}
          <div className="border-t border-gray-800 p-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Protocol Filters</h3>
            <div className="space-y-1">
              {Object.entries(PROTOCOL_COLORS).map(([proto, color]) => (
                <label key={proto} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters[proto] !== false}
                    onChange={(e) => setFilters((f) => ({ ...f, [proto]: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-gray-300">{proto}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mandate config */}
          <div className="border-t border-gray-800 p-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">AP2 Mandate</h3>
            <label className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useMandate}
                onChange={(e) => setUseMandate(e.target.checked)}
                className="rounded"
              />
              <span className="text-gray-300">Enable mandate</span>
            </label>
            {useMandate && (
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500">Max amount ($)</label>
                  <input
                    type="number"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(parseFloat(e.target.value) || 0)}
                    step="0.50"
                    min="0"
                    className="w-full mt-0.5 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Purpose</label>
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full mt-0.5 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ---- CENTER PANEL: Ask + Protocol Feed ---- */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Ask input bar */}
          <div className="p-4 border-b border-gray-800 bg-gray-900/30">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !asking && handleAsk()}
                placeholder="Ask the agent system anything..."
                className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleAsk}
                disabled={asking || !message.trim()}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
              >
                {asking ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Ask'
                )}
              </button>
            </div>
            {useMandate && (
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Mandate active
                </span>
                <span>Budget: ${maxAmount.toFixed(2)}</span>
                <span>Purpose: {purpose}</span>
              </div>
            )}
          </div>

          {/* Protocol event feed */}
          <div ref={feedRef} className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredEvents.length === 0 && !asking && (
              <div className="flex flex-col items-center justify-center h-full text-gray-600">
                <p className="text-lg mb-1">No protocol events yet</p>
                <p className="text-sm">Type a message and click Ask to see protocols in action</p>
              </div>
            )}

            {filteredEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                relTime={relativeTime(evt.timestamp)}
                isSelected={inspected?.type === 'event' && (inspected.data as ProtocolEvent).id === evt.id}
                onSelect={() => setInspected({ type: 'event', data: evt })}
              />
            ))}

            {/* Final result summary */}
            {askResult && (
              <div className="mt-4 p-4 rounded-lg border border-gray-700 bg-gray-900/50">
                <h3 className="text-sm font-semibold text-gray-300 mb-2">Result</h3>
                <p className="text-sm text-gray-400">
                  {(askResult as Record<string, unknown>).summary as string ?? JSON.stringify(askResult)}
                </p>
                {(askResult as Record<string, unknown>).mandateSpending ? (
                  <div className="mt-2 text-xs text-amber-400">
                    Mandate spending: $
                    {String(((askResult as Record<string, unknown>).mandateSpending as Record<string, number>)?.totalSpent ?? 0)}
                    {' / '}${maxAmount.toFixed(2)}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </main>

        {/* ---- RIGHT PANEL: Wire Inspector ---- */}
        <aside className="w-96 border-l border-gray-800 flex flex-col shrink-0 bg-gray-950/50">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Inspector</h2>
            {inspected && (
              <button
                onClick={() => setInspected(null)}
                className="text-xs text-gray-500 hover:text-gray-300"
              >
                Close
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {!inspected && (
              <p className="text-gray-600 text-sm text-center mt-8">
                Click an event or agent to inspect its raw JSON
              </p>
            )}

            {inspected?.type === 'event' && (
              <EventInspector event={inspected.data as ProtocolEvent} />
            )}

            {inspected?.type === 'agent' && (
              <AgentInspector agent={inspected.data as DiscoveryResult} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Event Card                                                         */
/* ------------------------------------------------------------------ */

function EventCard({
  event,
  relTime,
  isSelected,
  onSelect,
}: {
  event: ProtocolEvent;
  relTime: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const badgeClass = PROTOCOL_BG[event.protocol] ?? PROTOCOL_BG.REST;
  const borderColor = PROTOCOL_COLORS[event.protocol] ?? PROTOCOL_COLORS.REST;

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-lg border p-3 transition-all hover:bg-gray-800/40 ${
        isSelected ? 'ring-1 ring-white/20 bg-gray-800/60' : ''
      } ${event.status === 'failed' ? 'border-red-500/50' : ''}`}
      style={{
        borderColor: event.status === 'failed' ? undefined : `${borderColor}30`,
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-mono text-gray-500">{relTime}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${badgeClass}`}>
          {event.protocol}
        </span>
        {event.status === 'pending' && (
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
        )}
        {event.status === 'failed' && (
          <span className="text-[10px] text-red-400 font-medium">FAILED</span>
        )}
      </div>
      <div className="text-xs text-gray-400">
        <span className="text-gray-300 font-medium">{event.source}</span>
        <span className="mx-1.5 text-gray-600">&rarr;</span>
        <span className="text-gray-300 font-medium">{event.target}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1 truncate">{event.summary}</p>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Event Inspector                                                    */
/* ------------------------------------------------------------------ */

function EventInspector({ event }: { event: ProtocolEvent }) {
  const badgeClass = PROTOCOL_BG[event.protocol] ?? PROTOCOL_BG.REST;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-0.5 rounded border font-semibold ${badgeClass}`}>
            {event.protocol}
          </span>
          <span className={`text-xs font-medium ${
            event.status === 'completed' ? 'text-green-400' :
            event.status === 'failed' ? 'text-red-400' :
            'text-yellow-400'
          }`}>
            {event.status.toUpperCase()}
          </span>
        </div>
        <div className="text-sm text-gray-300 mb-1">
          {event.source} &rarr; {event.target}
        </div>
        <p className="text-sm text-gray-400">{event.summary}</p>
        <p className="text-xs text-gray-600 font-mono mt-1">{event.timestamp}</p>
      </div>

      {event.request !== undefined && (
        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Request</h4>
          <pre className="text-xs bg-gray-900 border border-gray-800 rounded p-3 overflow-x-auto text-gray-300 leading-relaxed max-h-64 overflow-y-auto">
            {JSON.stringify(event.request, null, 2)}
          </pre>
        </div>
      )}

      {event.response !== undefined && (
        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Response</h4>
          <pre className="text-xs bg-gray-900 border border-gray-800 rounded p-3 overflow-x-auto text-gray-300 leading-relaxed max-h-64 overflow-y-auto">
            {JSON.stringify(event.response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Agent Inspector                                                    */
/* ------------------------------------------------------------------ */

function AgentInspector({ agent }: { agent: DiscoveryResult }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className={`w-2.5 h-2.5 rounded-full ${agent.available ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className="font-semibold text-sm">{agent.card?.name ?? 'Unknown Agent'}</span>
        </div>
        <p className="text-sm text-gray-400">{agent.card?.description}</p>
        <p className="text-xs text-gray-600 font-mono mt-1">{agent.url}</p>
      </div>

      {agent.card?.skills && agent.card.skills.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Skills</h4>
          <div className="space-y-1">
            {agent.card.skills.map((s) => (
              <div key={s.id} className="text-xs bg-gray-900 border border-gray-800 rounded p-2">
                <span className="font-medium text-gray-300">{s.name}</span>
                <span className="text-gray-500 ml-2">{s.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Full Agent Card</h4>
        <pre className="text-xs bg-gray-900 border border-gray-800 rounded p-3 overflow-x-auto text-gray-300 leading-relaxed max-h-96 overflow-y-auto">
          {JSON.stringify(agent.card ?? { error: agent.error }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
