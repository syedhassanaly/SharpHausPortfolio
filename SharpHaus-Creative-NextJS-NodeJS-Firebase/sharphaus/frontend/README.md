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

Form detection must be enabled in Netlify before deploying. The repository's
`.netlify/features/netlify-forms` activation marker enables Netlify Forms through
the deployment integration. Keep this marker: the static form alone cannot
register submissions when the site's `ignore_html_forms` setting is enabled.
After enabling form detection, redeploy so Netlify registers the `contact` form.

Contact submissions are saved in the site's Netlify Forms dashboard. To deliver
them by email, open **Project configuration > Notifications > Emails and webhooks
> Form submission notifications** and add an email notification for the `contact`
form to `syedhassan2327@gmail.com`. The current automation credentials cannot
create this notification, so this is a required dashboard setup step. The old
backend's SMTP configuration is not used by this frontend, and no email password
is needed for Netlify's built-in notifications.

After deployment, verify `/`, `/about`, `/services`, `/portfolio`, a portfolio
gallery, and `/contact`. Submit a contact message and confirm it appears in Netlify
Forms and reaches the configured inbox. Use a real email address and a meaningful
message when verifying delivery, and check Netlify Forms' spam folder if needed.
Form persistence is handled by Netlify, not by the local development server.
