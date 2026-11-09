/** Sætter klassenavne sammen og springer tomme værdier over. */
export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
