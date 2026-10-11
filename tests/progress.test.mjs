import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
const output = ts.transpileModule(fs.readFileSync('app/leetcode/data.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const context = { exports: {}, Date, Intl, URL, Set };
vm.runInNewContext(output, context);
const { dashboard, parseProgress, localDate } = context.exports;
function fixture(dates = ['2026-10-08', '2026-10-09']) {
  return { schemaVersion: 1, generatedAt: '2026-10-10T16:00:00Z', timezone: 'America/New_York', challengeStartedAt: '2026-09-16', summary: { submissions: dates.length + 70, distinctProblems: 56, datedSubmissions: dates.length, undatedSubmissions: 70, activeDays: dates.length, difficulty: { Easy: 0, Medium: 1, Hard: 0, Unknown: 55 } }, dailyActivity: Object.fromEntries(dates.map(date => [date, { submissions: 1, distinctProblems: 1 }])), challenge: { completedDays: dates.length, longestStreak: 2, lastCompletedDate: dates.at(-1) ?? null, streakEndingOnLastCompletedDate: 2 }, recentSubmissions: [] };
}
test('historical imports count only in lifetime totals', () => {
  const d = dashboard(parseProgress(fixture([])), new Date('2026-10-10T16:00:00Z'));
  assert.equal(d.profile.totalSolved, 56); assert.equal(d.profile.undatedSubmissions, 70); assert.equal(d.profile.currentStreak, 0); assert.equal(d.today.count, 0);
});
test('yesterday streak remains live today and resets after midnight ET', () => {
  const p = parseProgress(fixture());
  assert.equal(dashboard(p, new Date('2026-10-11T03:59:59Z')).profile.currentStreak, 2);
  const d = dashboard(p, new Date('2026-10-11T04:00:00Z'));
  assert.equal(d.profile.currentStreak, 0); assert.equal(d.profile.longestStreak, 2); assert.equal(d.today.date, '2026-10-11');
});
test('today uses daily counts even when absent from the truncated recent list', () => {
  const p = fixture(['2026-10-10']);
  p.dailyActivity['2026-10-10'] = { submissions: 12, distinctProblems: 2 }; p.summary.submissions = 82; p.summary.datedSubmissions = 12;
  const d = dashboard(parseProgress(p), new Date('2026-10-10T16:00:00Z'));
  assert.equal(d.today.count, 12); assert.equal(d.today.entries.length, 0); assert.equal(d.agent.status, 'safe'); assert.equal(d.profile.currentStreak, 1);
});
test('unverified problem names link to their source, with unknown metadata', () => {
  const p = fixture();
  p.recentSubmissions.push({ id: 'two-integer-sum/submission-0', problemId: 'two-integer-sum', title: 'Two Integer Sum', recordedAt: '2026-10-09T12:00:00Z', localDate: '2026-10-09', difficulty: null, topics: null, links: {}, sourceUrl: 'https://github.com/example/repo/blob/sha/solution.py' });
  const entry = dashboard(parseProgress(p), new Date('2026-10-10T16:00:00Z')).entries[0];
  assert.equal(entry.url, p.recentSubmissions[0].sourceUrl); assert.equal(entry.difficulty, 'Unknown');
});
test('timezone calendar math works over spring and fall DST', () => {
  for (const [dates, now] of [[['2026-03-07', '2026-03-08'], '2026-03-09T04:01:00Z'], [['2026-10-31', '2026-11-01'], '2026-11-02T05:01:00Z']]) {
    const p = fixture(dates); p.challengeStartedAt = '2026-01-01';
    assert.equal(dashboard(parseProgress(p), new Date(now)).profile.currentStreak, 2);
  }
  assert.equal(localDate(new Date('2026-11-02T04:30:00Z')), '2026-11-01');
});
test('challenge starts explicitly and pre-start activity does not create a streak', () => {
  const d = dashboard(parseProgress(fixture(['2026-09-14', '2026-09-15'])), new Date('2026-09-15T16:00:00Z'));
  assert.equal(d.today.started, false); assert.equal(d.profile.currentStreak, 0); assert.equal(d.profile.longestStreak, 0);
});
test('future dates do not count toward current or best streak', () => {
  const d = dashboard(parseProgress(fixture(['2026-10-11', '2026-10-12'])), new Date('2026-10-10T16:00:00Z'));
  assert.equal(d.profile.currentStreak, 0); assert.equal(d.profile.longestStreak, 0);
});
test('malformed snapshots and inconsistent totals fail validation', () => {
  for (const mutate of [p => p.schemaVersion = 2, p => p.timezone = 'UTC', p => p.summary.submissions = -1, p => p.summary.difficulty.Unknown = 0, p => p.dailyActivity['2026-02-30'] = { submissions: 1, distinctProblems: 1 }, p => p.generatedAt = 'invalid', p => p.recentSubmissions = null]) {
    const p = fixture(); mutate(p); assert.throws(() => parseProgress(p));
  }
});

