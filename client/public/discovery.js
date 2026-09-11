/* First-party, session-only inquiry attribution. No tracking requests or form values collected. */
(function () {
  'use strict';
  var key = 'novapath_discovery_v1';
  function safePath(value) {
    if (!value) return "";
    try { var parsed = new URL(value, location.origin); return parsed.origin === location.origin ? parsed.pathname.slice(0, 200) : ''; } catch (_) { return ''; }
  }
  function clean(value) { return String(value || '').replace(/[^a-zA-Z0-9 _./:-]/g, '').slice(0, 100); }
  var data;
  try { data = JSON.parse(sessionStorage.getItem(key) || 'null'); } catch (_) {}
  if (!data || typeof data.created !== 'number' || Date.now() - data.created > 24 * 60 * 60 * 1000) {
    var referrer = '';
    try { var ref = new URL(document.referrer); if (ref.origin !== location.origin) referrer = ref.hostname; } catch (_) {}
    var query = new URLSearchParams(location.search);
    data = { created: Date.now(), entry: safePath(location.href), referrer: referrer, source: clean(query.get('utm_source')), medium: clean(query.get('utm_medium')), campaign: clean(query.get('utm_campaign')) };
  }
  if (/^\/(guides|custom-software|strategic-advisory|coachingos|wage-compensation-studies|training-compliance-courses)(\/|$)/.test(location.pathname)) data.resource = safePath(location.href);
  try { sessionStorage.setItem(key, JSON.stringify(data)); } catch (_) {}
  window.NovaPathDiscovery = {
    summary: function () {
      var lines = [['Entry page', safePath(data.entry)], ['Referring site', clean(data.referrer)], ['Latest resource', safePath(data.resource || '')], ['Campaign source', clean(data.source)], ['Campaign medium', clean(data.medium)], ['Campaign', clean(data.campaign)]];
      return lines.filter(function (pair) { return pair[1]; }).map(function (pair) { return pair[0] + ': ' + pair[1]; }).join('\n');
    }
  };
}());
