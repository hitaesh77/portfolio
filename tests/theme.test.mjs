import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
function runtime(saved = 'light', blocked = false) {
  const values = new Map([['portfolio-theme', saved]]);
  const classes = new Set();
  const listeners = new Map();
  let notify = () => {};
  const root = { classList: { contains: key => classes.has(key), toggle: (key, on) => { if (on) classes.add(key); else classes.delete(key); notify(); } } };
  const storage = { getItem: key => values.get(key), setItem: (key, value) => { if (blocked) throw new Error('Storage blocked'); values.set(key, value); } };
  const context = { exports: {}, document: { documentElement: root }, localStorage: storage, window: { localStorage: storage, addEventListener: (name, cb) => listeners.set(name, cb), removeEventListener: name => listeners.delete(name) }, MutationObserver: class { constructor(cb) { notify = cb; } observe() {} disconnect() {} }, require: name => {
    if (name === 'react') return { useSyncExternalStore: (subscribe, getSnapshot) => { subscribe(() => {}); return getSnapshot(); } };
    if (name === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
    throw new Error(name);
  } };
  const boot = fs.readFileSync('app/layout.tsx', 'utf8').match(/__html: `([^`]+)`/)[1];
  vm.runInNewContext(boot, context);
  const code = ts.transpileModule(fs.readFileSync('app/components/theme-toggle.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(code, context);
  return { mount: () => context.exports.default(), values, listeners, root };
}
test('theme selection survives toggle remounts when navigating between pages', () => {
  const r = runtime('dark');
  assert.equal(r.mount().props['aria-label'], 'Switch to light theme');
  r.mount().props.onClick();
  assert.equal(r.values.get('portfolio-theme'), 'light');
  assert.equal(r.mount().props['aria-label'], 'Switch to dark theme');
  r.mount().props.onClick();
  assert.equal(r.mount().props['aria-label'], 'Switch to light theme');
});
test('theme remains selected across navigation when browser storage is blocked', () => {
  const r = runtime('light', true);
  r.mount().props.onClick();
  assert.equal(r.mount().props['aria-label'], 'Switch to light theme');
});
test('theme updates from another tab and renders the matching icon', () => {
  const r = runtime('light');
  const lightIcon = r.mount().props.children.type;
  r.listeners.get('storage')({ key: 'portfolio-theme', newValue: 'dark' });
  const dark = r.mount();
  assert.equal(dark.props['aria-label'], 'Switch to light theme');
  assert.notEqual(dark.props.children.type, lightIcon);
});
