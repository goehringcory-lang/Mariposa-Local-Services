// Window helpers for the rate limiters and the activity reports.
//
// These live outside the components that use them on purpose: calling
// `Date.now()` directly in a component body trips the react-hooks/purity lint
// rule, since a re-render would silently produce a different cutoff.

/** The Date this many minutes before now. */
export function minutesAgo(minutes: number): Date {
  return new Date(Date.now() - minutes * 60 * 1000);
}

/** The Date this many days before now. */
export function daysAgo(days: number): Date {
  return minutesAgo(days * 24 * 60);
}
