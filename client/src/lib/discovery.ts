export function inquiryDiscoverySummary(): string {
  const discovery = (window as Window & { NovaPathDiscovery?: { summary(): string } }).NovaPathDiscovery;
  return discovery?.summary() ?? "";
}
