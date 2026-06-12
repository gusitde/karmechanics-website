/* karmechanics.com — km.js
   Vanilla JS, CSP-safe: no inline scripts, no inline handlers, no eval,
   no innerHTML. All user-facing strings live in the markup (copy deck
   v1.0) — JS only toggles pre-rendered elements and renders pricing
   data with createElement/textContent. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Config — storefront side.
     API_BASE is the Luca platform host serving the billing public API.
     If this value changes, ALSO update connect-src in public/_headers
     (CSP) or every fetch below is blocked by the browser.
     ------------------------------------------------------------------ */
  var API_BASE = 'https://www.lucaexpress.com';
  var PRODUCT_CODE = 'karmechanics';

  /* Cloudflare Turnstile sitekey.
     BUILDER NOTE: this is the official Turnstile TEST key (always
     passes). Swap for the real karmechanics widget sitekey at G5. */
  var TURNSTILE_SITEKEY = '1x00000000000000000000AA';

  /* Pricing fallback behavior: the deck prices ($20/$200, $10/$100,
     $5/$50) are pre-rendered in the static markup. The live plans API
     only REPLACES that markup when it returns a fully parseable
     catalog — any error, timeout, or partial payload leaves the static
     deck pricing untouched. Price changes go through the copy deck. */

  /* ---------- Tiny helpers ---------- */
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function fmtUsd(n) {
    var v = Math.round(n * 100) / 100;
    return '$' + (v % 1 === 0 ? String(v) : v.toFixed(2));
  }

  function getJson(url) {
    return fetch(url, { headers: { Accept: 'application/json' } }).then(function (res) {
      return res.json()
        .catch(function () { return {}; })
        .then(function (data) { return { status: res.status, data: data }; });
    });
  }

  function postJson(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json()
        .catch(function () { return {}; })
        .then(function (data) { return { status: res.status, data: data }; });
    });
  }

  function showEl(el) { if (el) el.hidden = false; }
  function hideEl(el) { if (el) el.hidden = true; }

  function setFieldError(input, show) {
    var err = document.getElementById(input.id + '-error');
    if (err) err.hidden = !show;
    input.setAttribute('aria-invalid', show ? 'true' : 'false');
  }

  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = qs('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Billing interval toggle (Monthly / Annual) ---------- */
  qsa('[data-price-region]').forEach(function (region) {
    var buttons = qsa('[data-billing-toggle]', region);
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        region.setAttribute('data-interval', btn.getAttribute('data-billing-toggle'));
        buttons.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
      });
    });
  });

  /* ---------- Live pricing (plans API → static deck fallback) ---------- */
  function toDollars(value) {
    var n = Number(value);
    if (!isFinite(n) || n <= 0) return null;
    /* Heuristic: the catalog tops out at $200/yr, so any value >= 1000
       means the API sent cents. */
    return n >= 1000 ? n / 100 : n;
  }

  function pluckPrice(raw, interval) {
    var candidates = [
      raw[interval],
      raw[interval + '_price'],
      raw['price_' + interval],
      raw[interval + '_price_cents'],
      raw.prices && raw.prices[interval],
      raw.price && raw.price[interval]
    ];
    for (var i = 0; i < candidates.length; i++) {
      var v = toDollars(candidates[i]);
      if (v !== null) return v;
    }
    return null;
  }

  function normalizePlans(payload) {
    var list = payload && (payload.plans || payload.items || payload.data);
    if (!list && Array.isArray(payload)) list = payload;
    if (!Array.isArray(list) || !list.length) return null;
    var plans = [];
    for (var i = 0; i < list.length; i++) {
      var raw = list[i] || {};
      var code = raw.plan_code || raw.code || raw.id;
      var name = raw.name || raw.title;
      var monthly = pluckPrice(raw, 'monthly');
      var annual = pluckPrice(raw, 'annual');
      /* Never half-render: one unparseable plan keeps the deck fallback. */
      if (!code || !name || monthly === null || annual === null) return null;
      plans.push({ plan_code: String(code), name: String(name), monthly: monthly, annual: annual });
    }
    return plans;
  }

  function buildPricingRow(plan) {
    var li = document.createElement('li');
    li.className = 'pricing-row';

    var name = document.createElement('span');
    name.className = 'pricing-name';
    name.textContent = plan.name;

    var price = document.createElement('span');
    price.className = 'pricing-price';
    var monthly = document.createElement('span');
    monthly.className = 'price-monthly';
    monthly.textContent = fmtUsd(plan.monthly) + '/mo';
    var annual = document.createElement('span');
    annual.className = 'price-annual';
    annual.textContent = fmtUsd(plan.annual) + '/yr';
    price.appendChild(monthly);
    price.appendChild(annual);

    var cta = document.createElement('a');
    cta.className = 'btn btn-primary btn-sm';
    cta.href = '/signup/?plan=' + encodeURIComponent(plan.plan_code);
    cta.textContent = 'Start free trial';

    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(cta);
    return li;
  }

  function renderPricing(rowsEl, plans) {
    var frag = document.createDocumentFragment();
    plans.forEach(function (plan) { frag.appendChild(buildPricingRow(plan)); });
    rowsEl.textContent = '';
    rowsEl.appendChild(frag);
  }

  function updatePickerPrices(plans) {
    var byCode = {};
    plans.forEach(function (p) { byCode[p.plan_code] = p; });
    qsa('[data-plan-price-monthly]').forEach(function (el) {
      var p = byCode[el.getAttribute('data-plan-price-monthly')];
      if (p) el.textContent = fmtUsd(p.monthly) + '/mo';
    });
    qsa('[data-plan-price-annual]').forEach(function (el) {
      var p = byCode[el.getAttribute('data-plan-price-annual')];
      if (p) el.textContent = fmtUsd(p.annual) + '/yr';
    });
  }

  var pricingRows = qs('[data-pricing-rows]');
  if (pricingRows || qs('[data-plan-price-monthly]')) {
    getJson(API_BASE + '/billing/public/api/plans?product=' + PRODUCT_CODE)
      .then(function (res) {
        var plans = res.status === 200 ? normalizePlans(res.data) : null;
        if (!plans) return; /* static deck pricing stays */
        if (pricingRows) renderPricing(pricingRows, plans);
        updatePickerPrices(plans);
      })
      .catch(function () { /* static deck pricing stays */ });
  }

  /* ---------- Turnstile (explicit render, CSP-safe) ---------- */
  var turnstileSlot = qs('[data-turnstile]');

  if (turnstileSlot) {
    /* api.js loads async with ?render=explicit; poll instead of relying
       on a global onload callback (script order is not guaranteed). */
    var tries = 0;
    var timer = window.setInterval(function () {
      tries += 1;
      if (window.turnstile && typeof window.turnstile.render === 'function') {
        window.clearInterval(timer);
        try {
          var widgetId = window.turnstile.render(turnstileSlot, { sitekey: TURNSTILE_SITEKEY });
          if (widgetId !== null && widgetId !== undefined) {
            turnstileSlot.setAttribute('data-widget-id', String(widgetId));
          }
        } catch (err) { /* render failed; submit surfaces the generic error */ }
      } else if (tries > 200) {
        window.clearInterval(timer); /* ~10 s: give up; submit surfaces the error */
      }
    }, 50);
  }

  function turnstileToken() {
    if (turnstileSlot && window.turnstile) {
      var id = turnstileSlot.getAttribute('data-widget-id');
      if (id !== null) {
        try { return window.turnstile.getResponse(id) || ''; } catch (err) { /* fall through */ }
      }
    }
    var input = document.querySelector('input[name="cf-turnstile-response"]');
    return input ? input.value : '';
  }

  function turnstileReset() {
    if (turnstileSlot && window.turnstile && typeof window.turnstile.reset === 'function') {
      var id = turnstileSlot.getAttribute('data-widget-id');
      try { window.turnstile.reset(id !== null ? id : undefined); } catch (err) { /* not rendered */ }
    }
  }

  /* ---------- Signup flow ---------- */
  var signupForm = qs('[data-signup-form]');
  if (signupForm) initSignup(signupForm);

  function initSignup(form) {
    form.setAttribute('novalidate', '');
    var submitBtn = form.querySelector('button[type="submit"]');
    var btnLabel = submitBtn ? submitBtn.textContent : '';
    var genericError = qs('[data-error="generic"]', form);
    var region = form.closest('[data-price-region]') || qs('[data-price-region]');
    var params = new URLSearchParams(window.location.search);

    /* Restore the saved plan choice (set just before the Stripe
       redirect — "saved on this page whenever you're ready"), then let
       explicit ?plan= / ?interval= params override it. */
    var saved = null;
    try { saved = JSON.parse(window.localStorage.getItem('km-plan-choice') || 'null'); } catch (err) { saved = null; }
    var planParam = params.get('plan') || (saved && saved.plan) || '';
    var intervalParam = params.get('interval') || (saved && saved.interval) || '';

    if (planParam) {
      var radio = qsa('input[name="plan"]', form).filter(function (r) { return r.value === planParam; })[0];
      if (radio) radio.checked = true;
    }
    if ((intervalParam === 'annual' || intervalParam === 'monthly') && region) {
      qsa('[data-billing-toggle]', region).forEach(function (b) {
        if (b.getAttribute('data-billing-toggle') === intervalParam) b.click();
      });
    }

    /* Post-checkout states via query params (?state=success|cancel). */
    var state = params.get('state');
    var successPanel = qs('[data-panel="success"]');
    var cancelPanel = qs('[data-panel="cancel"]');
    var formSection = qs('[data-signup-section]');

    if (state === 'success') {
      showEl(successPanel);
      hideEl(formSection);
      try { window.localStorage.removeItem('km-plan-choice'); } catch (err) { /* ignore */ }
      var sessionId = params.get('session_id');
      if (sessionId && successPanel) {
        pollCheckoutStatus(sessionId, function () {
          showEl(qs('[data-error="provision-failed"]', successPanel));
        });
      }
    } else if (state === 'cancel') {
      showEl(cancelPanel);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideEl(genericError);

      var email = qs('#signup-email', form);
      var emailOk = isValidEmail(email.value.trim());
      setFieldError(email, !emailOk);
      if (!emailOk) { email.focus(); return; }

      var planInput = form.querySelector('input[name="plan"]:checked');
      var plan = planInput ? planInput.value : '';
      var interval = region && region.getAttribute('data-interval') === 'annual' ? 'annual' : 'monthly';
      var token = turnstileToken();
      if (!plan || !token) { showEl(genericError); return; }

      try {
        window.localStorage.setItem('km-plan-choice', JSON.stringify({ plan: plan, interval: interval }));
      } catch (err) { /* private mode: skip persistence */ }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = form.getAttribute('data-msg-sending') || btnLabel;
      }

      postJson(API_BASE + '/billing/public/api/checkout-session', {
        product_code: PRODUCT_CODE,
        plan_code: plan,
        interval: interval,
        email: email.value.trim(),
        success_url: window.location.origin + '/signup/?state=success&session_id={CHECKOUT_SESSION_ID}',
        cancel_url: window.location.origin + '/signup/?state=cancel',
        turnstile_token: token
      })
        .then(function (res) {
          if (res.data && res.data.ok && res.data.url) {
            window.location.href = res.data.url; /* hand off to Stripe Checkout */
            return;
          }
          showEl(genericError);
          restore();
        })
        .catch(function () {
          showEl(genericError);
          restore();
        });

      function restore() {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = btnLabel;
        }
        turnstileReset();
      }
    });
  }

  /* Poll the checkout-session status endpoint after Stripe returns.
     {ok, status: 'pending'|'provisioned'|'failed'} — stop on
     'provisioned' (the email drives the next step), surface the deck's
     generic error on 'failed', and retry 'pending' for ~30 s. */
  function pollCheckoutStatus(sessionId, onFailed) {
    var attempts = 0;
    function tick() {
      attempts += 1;
      getJson(API_BASE + '/billing/public/api/checkout-session/' + encodeURIComponent(sessionId) + '/status')
        .then(function (res) {
          var status = res.data && res.data.status;
          if (status === 'provisioned') return;
          if (status === 'failed') { onFailed(); return; }
          if (attempts < 12) window.setTimeout(tick, 2500);
        })
        .catch(function () {
          if (attempts < 12) window.setTimeout(tick, 2500);
        });
    }
    tick();
  }

  /* ---------- Sign-in flow (magic link) ---------- */
  var signinForm = qs('[data-signin-form]');
  if (signinForm) initSignin(signinForm);

  function initSignin(form) {
    form.setAttribute('novalidate', '');
    var submitBtn = form.querySelector('button[type="submit"]');
    var btnLabel = submitBtn ? submitBtn.textContent : '';
    var genericError = qs('[data-error="generic"]', form);
    var unknownError = qs('[data-error="unknown-email"]', form);
    var sentState = qs('[data-state="sent"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideEl(genericError);
      hideEl(unknownError);

      var email = qs('#signin-email', form);
      var emailOk = isValidEmail(email.value.trim());
      setFieldError(email, !emailOk);
      if (!emailOk) { email.focus(); return; }

      var token = turnstileToken();
      if (!token) { showEl(genericError); return; }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = form.getAttribute('data-msg-sending') || btnLabel;
      }

      postJson(API_BASE + '/billing/public/api/magic-link', {
        email: email.value.trim(),
        intent: 'login',
        turnstile_token: token
      })
        .then(function (res) {
          if (res.data && res.data.ok) {
            form.hidden = true;
            showEl(sentState);
            return;
          }
          /* The API always answers {ok:true} for valid requests (no
             account enumeration) — but if it ever signals an unknown
             account, show the deck's unknown-email message. */
          var msg = (res.data && (res.data.error || res.data.message)) || '';
          if (res.status === 404 || /unknown|not[ _-]?found|no (such )?(account|plan|customer)/i.test(msg)) {
            showEl(unknownError);
          } else {
            showEl(genericError);
          }
          restore();
        })
        .catch(function () {
          showEl(genericError);
          restore();
        });

      function restore() {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = btnLabel;
        }
        turnstileReset();
      }
    });
  }
})();
