# SharpHaus frontend on Netlify

Netlify builds this directory with `npm run build` and publishes `.next` using
`@netlify/plugin-nextjs`. The runtime must be declared in this directory's
`netlify.toml`: this configuration takes precedence over the repository-root
configuration. Publishing `.next` without the runtime does not serve the Next.js
pages and can result in a site-wide 404.

The contact form submits to Netlify Forms, rather than a separately hosted
Express API. `public/__forms.html` registers the form during deployment, and the
client posts URL-encoded submissions to `/__forms.html` so they are not intercepted
by the Next.js page handler. Keep the field names in the static form and React
component in sync.

Contact submissions are available in the site's Netlify Forms dashboard. Configure
form-submission email notifications in Netlify if inbox delivery is needed; the
old backend's SMTP configuration is not used by this frontend.

After deployment, verify `/`, `/about`, `/services`, `/portfolio`, a portfolio
gallery, and `/contact`. Submit a contact message and confirm it appears in Netlify
Forms. Form persistence is handled by Netlify, not by the local development server.
