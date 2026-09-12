/* NovaPath GA4: public marketing pages only, loaded after analytics consent. */
(function () {
  'use strict';
  if (window.NovaPathAnalytics) return;
  var id = 'G-97TNL7W12W';
  var site = 'Education';
  var hosts = ["explorenovapath.com", "www.explorenovapath.com"];
  if (hosts.indexOf(location.hostname) < 0) return;
  var key = 'novapath_analytics_consent_v1';
  var consent = 'unset', started = false, lastPage = '', panel, choiceButton;
  var blocked = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
  try {
    var saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && Date.now() - saved.time < 180 * 86400000 && /^(granted|denied)$/.test(saved.value)) consent = saved.value;
  } catch (_) {}
  if (blocked) consent = 'denied';
  function publicPath() {
    var path = location.pathname.replace(/\/+$/, '') || '/';
    var fixed = site === 'Business'
      ? ['/', '/sites', '/websites', '/work', '/how-we-work', '/website-help', '/app-rescue', '/workflow-tools', '/blog', '/analytics-privacy.html']
      : ['/', '/about', '/cobuilder', '/blog', '/coachingos', '/custom-software', '/strategic-advisory', '/wage-compensation-studies', '/training-compliance-courses', '/guides', '/analytics-privacy.html'];
    if (fixed.indexOf(path) >= 0) return path;
    // Only public editorial/portfolio routes; never shared previews, sign-in, dashboards, or demos.
    if (/^\/blog\/[a-z0-9-]+$/.test(path)) return path;
    if (site === 'Education' && /^\/guides\/[a-z0-9-]+$/.test(path)) return path;
    if (site === 'Business' && /^\/work\/[a-z0-9-]+$/.test(path)) return path;
    return '';
  }
  function referrer() {
    try { return new URL(document.referrer).origin + '/'; } catch (_) { return ''; }
  }
  function fields() {
    return { page_location: location.origin + publicPath(), page_referrer: referrer(), page_title: 'NovaPath ' + site + ' ' + publicPath(), send_to: id };
  }
  function gtag() { window.dataLayer.push(arguments); }
  function pageView() {
    var path = publicPath();
    window['ga-disable-' + id] = consent !== 'granted' || blocked || !path;
    if (!path || consent !== 'granted' || blocked) { lastPage = ''; return; }
    if (!started) start();
    if (path === lastPage) return;
    lastPage = path;
    gtag('set', fields());
    gtag('event', 'page_view', fields());
  }
  function start() {
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('set', 'ads_data_redaction', true);
    gtag('set', 'url_passthrough', false);
    gtag('js', new Date());
    gtag('config', id, Object.assign(fields(), { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 15552000 }));
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(tag);
  }
  function removeCookies() {
    document.cookie.split(';').forEach(function (item) {
      var name = item.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) return;
      var domains = ['', location.hostname, '.' + location.hostname];
      var labels = location.hostname.split('.');
      if (labels.length > 2) domains.push('.' + labels.slice(-2).join('.'));
      domains.forEach(function (domain) { document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : ''); });
    });
  }
  function choose(value) {
    consent = blocked ? 'denied' : value;
    try { localStorage.setItem(key, JSON.stringify({ value: consent, time: Date.now() })); } catch (_) {}
    if (consent === 'denied') {
      window['ga-disable-' + id] = true;
      if (started) gtag('consent', 'update', { analytics_storage: 'denied' });
      removeCookies();
      lastPage = '';
    } else {
      if (started) gtag('consent', 'update', { analytics_storage: 'granted' });
      pageView();
    }
    panel.hidden = true;
    choiceButton.hidden = false;
    choiceButton.focus({ preventScroll: true });
  }
  var allowed = ['quote_click', 'form_start', 'form_success', 'form_error', 'project_open', 'preview_click', 'preview_start', 'preview_generated', 'preview_request_start', 'preview_request_saved', 'preview_error', 'example_step', 'example_complete', 'generate_lead'];
  window.NovaPathAnalytics = {
    track: function (event) {
      if (allowed.indexOf(event) < 0 || consent !== 'granted' || blocked || !publicPath()) return;
      pageView();
      gtag('event', event, fields());
      if (event === 'form_success' || event === 'preview_request_saved') gtag('event', 'generate_lead', Object.assign(fields(), { lead_type: event === 'form_success' ? 'inquiry' : 'preview_request' }));
    }
  };
  var style = document.createElement('style');
  style.textContent = '#np-analytics-panel{position:fixed;z-index:2147483000;left:16px;bottom:16px;width:min(440px,calc(100vw - 32px));box-sizing:border-box;background:#fff;color:#24212b;padding:20px;border:1px solid #ddd7e7;border-radius:12px;box-shadow:0 8px 36px #0002;font:14px/1.5 system-ui,sans-serif}#np-analytics-panel[hidden],#np-analytics-choices[hidden]{display:none!important}#np-analytics-panel p{margin:0 0 14px}#np-analytics-panel a{color:#513d7a;text-decoration:underline}#np-analytics-panel .np-actions{display:flex;gap:10px;flex-wrap:wrap}#np-analytics-panel button,#np-analytics-choices{font:inherit;cursor:pointer;border:1px solid #746889;border-radius:6px;background:#fff;color:#30273e;padding:9px 15px}#np-analytics-panel button:focus-visible,#np-analytics-choices:focus-visible{outline:3px solid #8260af;outline-offset:3px}#np-analytics-choices{position:fixed;z-index:2147482999;left:12px;bottom:10px;font:12px system-ui,sans-serif;padding:5px 9px}#np-analytics-panel button:disabled{opacity:.5;cursor:default}';
  document.head.appendChild(style);
  panel = document.createElement('section');
  panel.id = 'np-analytics-panel';
  panel.setAttribute('aria-label', 'Analytics cookie choice');
  panel.innerHTML = '<p><strong>Help us understand what works.</strong><br>With your permission, Google Analytics uses cookies to measure visits and inquiries. <a href="/analytics-privacy.html">About analytics</a></p><div class="np-actions"><button type="button" data-choice="denied">Decline analytics</button><button type="button" data-choice="granted">Allow analytics</button></div>';
  panel.querySelectorAll('button').forEach(function (button) { button.addEventListener('click', function () { choose(button.getAttribute('data-choice')); }); });
  choiceButton = document.createElement('button');
  choiceButton.type = 'button';
  choiceButton.id = 'np-analytics-choices';
  choiceButton.textContent = 'Analytics choices';
  choiceButton.addEventListener('click', function () {
    panel.hidden = false;
    choiceButton.hidden = true;
    panel.querySelector('button').focus();
  });
  if (blocked) {
    panel.querySelector('p').textContent = 'Analytics is off because your browser sends a privacy preference. We respect that choice.';
    panel.querySelector('[data-choice="granted"]').disabled = true;
    removeCookies();
  }
  function routeChanged() {
    var visible = !!publicPath();
    panel.hidden = !visible || consent !== 'unset';
    choiceButton.hidden = !visible || consent === 'unset';
    pageView();
  }
  document.body.appendChild(panel);
  document.body.appendChild(choiceButton);
  ['pushState', 'replaceState'].forEach(function (method) {
    var original = history[method];
    history[method] = function () { var result = original.apply(this, arguments); routeChanged(); return result; };
  });
  window.addEventListener('popstate', routeChanged);
  window.addEventListener('storage', function (event) {
    if (event.key !== key) return;
    try { var next = JSON.parse(event.newValue); consent = next && next.value === 'granted' ? 'granted' : 'denied'; } catch (_) { consent = 'denied'; }
    if (blocked) consent = 'denied';
    if (started) gtag('consent', 'update', { analytics_storage: consent });
    if (consent === 'denied') removeCookies();
    routeChanged();
  });
  routeChanged();
}());
