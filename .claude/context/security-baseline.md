# Security Baseline

Sandbar UI has no auth, no database, and no user accounts — the risk surface is **supply chain** (a widely-depended-on published package), **XSS via components that render arbitrary/rich content**, and the **live code playground** (the docs site executes consumer-typed code).

## OWASP-Relevant Risks for This Project
| Risk | Where it applies | Mitigation |
|------|------------------|-----------|
| A03 Injection (XSS) | `Code`, `Prose`, any component rendering Shiki output or MDX-derived HTML | `dangerouslySetInnerHTML` only for sanitized, build-time-generated syntax-highlighting output — never for arbitrary runtime strings; no component accepts raw HTML as a prop |
| A05 Security Misconfiguration | Docs site playground sandbox | Sandpack/`react-live` runner executes in a sandboxed iframe on an isolated origin — no access to the parent window, cookies, or `localStorage`; verify the sandbox `allow`/`sandbox` attributes explicitly rather than trusting the library's defaults |
| A06 Vulnerable/Outdated Components | Every `packages/*` and `apps/*` dependency | `npm audit`/`pnpm audit` clean before merge; no new critical/high CVEs from an added dependency |
| A08 Software/Data Integrity Failures | npm publish pipeline | Publish with npm provenance + 2FA on the `@sandbar-ui` org; lockfile committed and respected in CI (`--frozen-lockfile`); no `eval`/`new Function` anywhere in shipped runtime code |
| A09 Logging Failures | N/A at runtime (no server logs of user data) | CI/build logs never print npm publish tokens, Algolia/Chromatic API keys |

## Live Playground Sandbox (docs site only)
This is the one place in the project that executes untrusted (consumer-authored, in-browser) code. Whichever runner the ADR selects (Sandpack or `react-live`):
- Runs in an iframe on a separate origin, not the parent docs-site origin
- Has no access to the parent page's cookies, `localStorage`, or DOM
- Any "Open in StackBlitz/CodeSandbox" link opens a new tab to the third-party service — it does not embed that service's editor inline with elevated trust
- Treat a proposal to eval user code directly in the parent page (no sandbox) as a blocking security finding, not a style nit

## Secrets Management
- npm publish token, Chromatic project token, Algolia/DocSearch API key: CI secrets only, never committed, never referenced from client-side docs-site code except a public-scoped search key that's meant to be exposed (confirm which Algolia key is public-safe vs admin before using it client-side)
- `.env`/`.env.local` in `apps/docs` is never committed; `.env.example` documents required keys with placeholder values

## Dependency Supply Chain
- `npm audit`/`pnpm audit` run before adding any dependency (see `dependencies.md` for the approval process)
- No dependency with a postinstall script gets added without reading what the script does
- License check against `dependencies.md`'s allowed list before adding — a copyleft dependency in `@sandbar-ui/react` would force downstream consumers into obligations they didn't sign up for

## Component-Level Guidance
- `Code`/`Prose` components that render syntax-highlighted or MDX-derived content: the highlighting happens at build/render time through Shiki's sanitized output, not by piping arbitrary user strings through `dangerouslySetInnerHTML`
- `FileUpload`/`ColorPicker`/any component accepting user-provided values: validate/clamp on the component's own boundary (e.g. reject a `FileUpload` accept-type mismatch) even though there's no server to also validate — the component is the boundary
- No component reads `window.location`/`document.cookie` for anything security-relevant — Sandbar UI is a UI library, not a place to make auth or routing security decisions

## PR Security Checklist
- [ ] No `dangerouslySetInnerHTML` added without a sanitized, build-time source
- [ ] Live playground changes keep the sandbox isolated (iframe, separate origin, no parent-page eval)
- [ ] `pnpm audit` — no new critical/high vulnerabilities from added dependencies
- [ ] No secrets, publish tokens, or API keys in code, logs, or committed files
- [ ] New env vars added to the relevant `.env.example`, not hardcoded
- [ ] License of any new dependency checked against `dependencies.md`
