# portfolio
My Portfolio Site!

The `/leetcode` page displays live NeetCode practice from
`https://raw.githubusercontent.com/hitaesh77/neetcode-submissions-a43s9ite/dashboard-data/progress.json`.
It fetches in the browser without credentials, refreshes every five minutes, and
provides a manual Refresh button. GitHub Actions and raw-file caching can delay
new submissions. The displayed publication timestamp identifies the snapshot.

The client validates schema version 1 and fetches progress each time the page opens.
While the page stays open, failed refreshes keep the last loaded snapshot and display
a warning. An initial failure shows a retry state without demo statistics. Progress
is not persisted in browser storage. No environment variables are required.
Streaks use dated challenge activity and America/New_York calendar dates; unknown
difficulties remain Unknown. Historical imports count only toward lifetime totals.

Run `npm test` for the adapter and date-boundary tests, and `npx tsc --noEmit` for
type checking. For an end-to-end check, open `/leetcode`, sync a new accepted
NeetCode submission to GitHub, wait for the publishing Action to succeed, and
click Refresh. Check the publication time, today's count, and recent submissions.
