import React from "react";

export function PrivacyPage() {
  const page = {
    background: "var(--cream)",
    color: "var(--charcoal)",
    minHeight: "100vh",
  };

  const wrap = {
    maxWidth: 600,
    margin: "0 auto",
    padding: "40px 24px 120px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    lineHeight: 1.7,
  };

  const h1 = {
    fontFamily: "'Fraunces', serif",
    fontSize: 28,
    marginBottom: 6,
  };

  const subtitle = {
    color: "var(--muted)",
    marginBottom: 18,
  };

  const h2 = {
    fontFamily: "'Fraunces', serif",
    fontSize: 17,
    marginTop: 32,
    marginBottom: 10,
  };

  const hr = {
    border: "none",
    borderTop: "1px solid #eee",
    margin: "24px 0",
  };

  const a = {
    color: "var(--ocean)",
  };

  const ul = {
    paddingLeft: 18,
    marginTop: 10,
    marginBottom: 10,
  };

  return (
    <div style={page}>
      <div style={wrap}>
        <h1 style={h1}>Privacy Policy</h1>
        <div style={subtitle}>Portland PlayDates — Last updated: March 18, 2026</div>

        <hr style={hr} />

        <h2 style={h2}>Who we are</h2>
        <p>
          Portland PlayDates is a community app connecting families with
          <br />
          young children in Greater Portland, Maine. We are operated by
          <br />
          Jordan Haddadi, based in Portland, Maine. You can reach us at
          <br />
          <a style={a} href="mailto:jordan@portlandplaydates.com">
            jordan@portlandplaydates.com
          </a>
        </p>

        <hr style={hr} />

        <h2 style={h2}>What information we collect</h2>
        <p>When you create an account or use Portland PlayDates, we may collect:</p>
        <ul style={ul}>
          <li>Your email address (used for login and communication)</li>
          <li>Your first name, town, and neighborhood</li>
          <li>Information about your kids (names, ages, and emoji avatars)</li>
          <li>A profile photo if you choose to upload one</li>
          <li>Your caregiver role, goals, and how you heard about us</li>
          <li>Playdates you create or RSVP to</li>
        </ul>

        <hr style={hr} />

        <h2 style={h2}>How we use your information</h2>
        <p>We use your information to:</p>
        <ul style={ul}>
          <li>Create and manage your account</li>
          <li>Show your profile to other Portland PlayDates members</li>
          <li>Send you login codes and account-related emails</li>
          <li>
            Send you emails about playdates, community updates, and
            <br />
            Portland PlayDates news
          </li>
          <li>Improve the app and understand how our community uses it</li>
        </ul>

        <hr style={hr} />

        <h2 style={h2}>What we share</h2>
        <p>We do not sell your personal information. Ever.</p>
        <p>
          Your name, avatar, town, and neighborhood are visible to other Portland
          PlayDates members. Your email address is never shown to other users.
        </p>
        <p>
          We use the following third-party services to operate Portland PlayDates:
        </p>
        <ul style={ul}>
          <li>Supabase: database and authentication</li>
          <li>Resend: transactional email (login codes)</li>
          <li>Klaviyo: community email communications</li>
          <li>Vercel: website hosting</li>
          <li>Cloudflare: security and performance</li>
        </ul>
        <p>
          Each of these services has their own privacy policy and handles data in
          accordance with applicable law.
        </p>

        <hr style={hr} />

        <h2 style={h2}>Email communications</h2>
        <p>By creating an account you consent to receive:</p>
        <ul style={ul}>
          <li>Login codes and account-related emails</li>
          <li>Emails about upcoming playdates and community events</li>
          <li>Occasional updates about Portland PlayDates</li>
        </ul>
        <p>
          You can unsubscribe from community emails at any time by clicking the
          unsubscribe link in any email. You will still receive login codes and
          essential account emails.
        </p>

        <hr style={hr} />

        <h2 style={h2}>Your data rights</h2>
        <p>You have the right to:</p>
        <ul style={ul}>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your account and associated data</li>
          <li>Unsubscribe from marketing emails at any time</li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <a style={a} href="mailto:jordan@portlandplaydates.com">
            jordan@portlandplaydates.com
          </a>{" "}
          and we will respond within 30 days.
        </p>

        <hr style={hr} />

        <h2 style={h2}>Children's privacy</h2>
        <p>
          Portland PlayDates is designed for parents, caregivers, nannies,
          grandparents, and au pairs. It is not directed at children under 13. We
          do not knowingly collect personal information from children under 13.
          If you believe a child under 13 has provided us with personal
          information, please contact us and we will delete it.
        </p>
        <p>
          Information about children entered by a parent or caregiver is used only
          to help match families with age-appropriate playdates.
        </p>

        <hr style={hr} />

        <h2 style={h2}>Data security</h2>
        <p>
          We take reasonable measures to protect your information. Your account
          is secured with email-based authentication and all data is encrypted in
          transit. However, no method of transmission over the internet is 100%
          secure.
        </p>

        <hr style={hr} />

        <h2 style={h2}>Changes to this policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you
          of significant changes by email. Continued use of Portland PlayDates
          after changes constitutes acceptance of the updated policy.
        </p>

        <hr style={hr} />

        <h2 style={h2}>Contact us</h2>
        <p>
          Questions about this privacy policy? Email us at{" "}
          <a style={a} href="mailto:jordan@portlandplaydates.com">
            jordan@portlandplaydates.com
          </a>
        </p>
        <p>
          Portland PlayDates
          <br />
          Portland, Maine
          <br />
          <a style={a} href="mailto:jordan@portlandplaydates.com">
            jordan@portlandplaydates.com
          </a>
          <br />
          <a
            style={a}
            href="https://portlandplaydates.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            portlandplaydates.com
          </a>
        </p>
      </div>
    </div>
  );
}
