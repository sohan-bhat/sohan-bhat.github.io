// Draws a write-up's interactive figure: a few saved runs, one per tab, each
// with two charts and what was reported for it. The runs come from
// write-ups/data/<name>.json, which is blog/demo.json in sohan-bhat/lhd,
// written there by src/experiments/blog_demo.py. Everything is drawn here at
// build time, so the page's own script only switches tabs.

const SIGNAL = {
    weight_change: 'Weight change',
    weight_norm: 'Weight norm',
    grad_norm: 'Gradient norm',
    dead_unit_fraction: 'Dead units',
};
const PLACE = { below: 'below range', inside: 'in range', above: 'above range', invalid: 'not a number' };
const CAUSE = { frozen_layer: 'a frozen layer', dead_units: 'dead units' };
const TAB = { frozen: 'Frozen layer', dead: 'Dead units', healthy: 'Healthy run', missed: 'A miss' };

const W = 340;
const H = 190;
const LEFT = 46;
const RIGHT = 12;
const TOP = 22;
const BOTTOM = 38;

const round = (n) => Math.round(n * 10) / 10;

// One chart: the healthy range as a band, the run as a line, and a dashed
// line at the alarm, after which the run is drawn faint.
const chart = ({ values, low, high, alarm, percent, floorAtZero, label }) => {
    const n = values.length;
    let bottom = floorAtZero ? 0 : Math.min(...values, ...low);
    let top = Math.max(...values, ...high);
    const pad = (top - bottom) * 0.06;
    top += pad;
    if (!floorAtZero) bottom -= pad;
    const x = (i) => round(LEFT + (i / (n - 1)) * (W - LEFT - RIGHT));
    const y = (v) => round(TOP + (1 - (v - bottom) / (top - bottom)) * (H - TOP - BOTTOM));
    const points = (list, from = 0, to = n) =>
        list.slice(from, to).map((v, i) => `${x(i + from)},${y(v)}`).join(' ');
    const band = `${points(high)} ${low.map((v, i) => `${x(i)},${y(v)}`).reverse().join(' ')}`;
    const show = (v) => (percent ? `${Math.round(v * 100)}%` : String(Math.round(v * 100) / 100));
    const ticks = [bottom, (bottom + top) / 2, top - pad];
    const epochs = [1, 5, 10, 15, 20].filter((e) => e <= n);

    const run = alarm
        ? `<polyline class="run" points="${points(values, 0, alarm)}" /><polyline class="run after" points="${points(values, alarm - 1)}" />`
        : `<polyline class="run" points="${points(values)}" />`;
    const mark = alarm
        ? `<line class="alarm" x1="${x(alarm - 1)}" y1="${TOP - 6}" x2="${x(alarm - 1)}" y2="${H - BOTTOM}" /><text x="${x(alarm - 1) + 6}" y="${TOP - 8}">Alarm</text>`
        : '';

    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">
  <polygon class="band" points="${band}" />
  ${ticks.map((v) => `<text x="${LEFT - 8}" y="${y(v) + 4}" text-anchor="end">${show(v)}</text>`).join('')}
  <line class="axis" x1="${LEFT}" y1="${H - BOTTOM}" x2="${W - RIGHT}" y2="${H - BOTTOM}" />
  ${epochs.map((e) => `<text x="${x(e - 1)}" y="${H - BOTTOM + 17}" text-anchor="middle">${e}</text>`).join('')}
  <text x="${W - RIGHT}" y="${H - 5}" text-anchor="end">Epoch</text>
  ${run}
  ${mark}
</svg>`;
};

const describe = (run) => {
    if (!run.fault) return `${run.network}, a healthy run`;
    const dead = run.fault.kind.match(/^dead(\d+)$/);
    const what = dead ? `${dead[1]}% of ${run.fault.layer}'s units killed` : `${run.fault.layer} frozen`;
    return `${run.network} with ${what}${run.lhd ? '' : ', a fault LHD missed'}`;
};

const silent = (run) => `No alarm in ${run.epochs} epochs`;

const panel = (run, first) => {
    const { lhd } = run;
    const signal = SIGNAL[run.signal];
    const answer = lhd
        ? `Alarm at epoch ${lhd.epoch} in ${lhd.layer}, ${CAUSE[lhd.cause] || lhd.cause.replace(/_/g, ' ')}`
        : silent(run);
    const curve = run.accuracy_alarm ? `Alarm at epoch ${run.accuracy_alarm}` : silent(run);
    const signals = lhd
        ? `\n  <ul class="demo-signals" aria-label="Signals of ${lhd.layer} at the alarm">${Object.entries(lhd.positions)
              .map(([name, place]) => `<li${place === 'inside' ? '' : ' class="out"'}>${SIGNAL[name]} ${PLACE[place]}</li>`)
              .join('')}</ul>`
        : '';
    return `<div class="demo-panel" id="demo-${run.key}" role="tabpanel" aria-labelledby="demo-tab-${run.key}"${first ? '' : ' hidden'}>
  <p class="demo-run">${describe(run)}</p>
  <div class="demo-charts">
    <div><p>${signal} of ${run.layer}</p>${chart({
        values: run.values,
        low: run.low,
        high: run.high,
        alarm: lhd && lhd.epoch,
        percent: run.signal === 'dead_unit_fraction',
        floorAtZero: true,
        label: `${signal} of ${run.layer} for each epoch, with its healthy range`,
    })}</div>
    <div><p>Validation accuracy</p>${chart({
        values: run.accuracy,
        low: run.accuracy_low,
        high: run.accuracy_high,
        alarm: lhd && lhd.epoch,
        percent: true,
        label: 'Validation accuracy for each epoch, with its healthy range',
    })}</div>
  </div>
  <dl class="demo-answers"><dt>LHD</dt><dd>${answer}</dd><dt>Accuracy curve</dt><dd>${curve}</dd></dl>${signals}
</div>`;
};

// The whole figure, with the id the post's text links to.
const figure = (runs, id, caption) => `<figure class="demo" id="${id}">
<div class="demo-tabs" role="tablist" aria-label="Example runs">
${runs
    .map(
        (run, i) =>
            `  <button type="button" role="tab" id="demo-tab-${run.key}" aria-controls="demo-${run.key}" aria-selected="${i === 0}"${i === 0 ? '' : ' tabindex="-1"'}>${TAB[run.key] || run.key}</button>`
    )
    .join('\n')}
</div>
${runs.map((run, i) => panel(run, i === 0)).join('\n')}
<figcaption class="caption">${caption}</figcaption>
</figure>`;

// Switches tabs, with the arrow keys too.
const script = `<script>
      document.querySelectorAll('.demo').forEach((demo) => {
        const tabs = [...demo.querySelectorAll('[role=tab]')];
        const show = (tab) =>
          tabs.forEach((t) => {
            const on = t === tab;
            t.setAttribute('aria-selected', on);
            t.tabIndex = on ? 0 : -1;
            document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
          });
        tabs.forEach((tab, i) => {
          tab.addEventListener('click', () => show(tab));
          tab.addEventListener('keydown', (event) => {
            const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
            if (!step) return;
            const next = tabs[(i + step + tabs.length) % tabs.length];
            show(next);
            next.focus();
          });
        });
      });
    </script>`;

module.exports = { figure, script };
