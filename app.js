// Decides where the welcome page goes after the animation.
(function () {
    // In the morning (4am-12pm Baghdad), continue to the morning dashboard
  try {
    var bh = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Baghdad', hour: '2-digit', hour12: false }).format(new Date()), 10);
    var forced = location.search.indexOf('dashboard') !== -1;
    var go = function () { setTimeout(function () { location.replace('dashboard.html'); }, 13200); };
    if (forced || (bh >= 4 && bh < 12)) { go(); }
    else {
      // "Show the dashboard now" switch, set remotely in mode.json
      fetch('mode.json?t=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.json(); })
        .then(function (m) { if (m && m.dashboard_until && Date.now() < m.dashboard_until) go(); })
        .catch(function () {});
    }
  } catch (e) {}
})();
