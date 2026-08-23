import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "3rem", maxWidth: 820 }}>
      <Link to="/" className="btn-link">← Back to home</Link>

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <h1 className="page-title">Privacy Policy</h1>
        <p className="hint">Last updated: August 2026</p>

        <p className="card-meta" style={{ marginTop: "1rem" }}>
          Coretech Talents ("we", "us", "our") is committed to protecting your personal data in
          accordance with the Digital Personal Data Protection Act, 2023 ("DPDP Act") and other
          applicable laws of India. This Privacy Policy explains what personal data we collect,
          why we collect it, how we use it, and the rights you have over it.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>1. Who we are</h3>
        <p className="card-meta">
          Coretech Talents is a recruitment and staffing platform based in Hosur, Tamil Nadu,
          India, connecting candidates with manufacturing, industrial, and corporate employers.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>2. What personal data we collect</h3>
        <p className="card-meta">Depending on how you use the platform, we may collect:</p>
        <ul className="card-meta">
          <li>Candidates: full name, email, phone number, resume file, resume text/skills, location, designation, current and expected salary, notice period, education details, profile photo</li>
          <li>Recruiters: full name, email, company name, designation, mobile number, location</li>
          <li>Usage data: pages visited and general site interactions, collected via Google Analytics (GA4)</li>
          <li>Contact form submissions: name, email, mobile number, and the message you submit</li>
        </ul>

        <h3 style={{ marginTop: "1.75rem" }}>3. Why we collect it (purpose)</h3>
        <p className="card-meta">We use your personal data to:</p>
        <ul className="card-meta">
          <li>Create and manage your candidate or recruiter account</li>
          <li>Match candidates with relevant job openings and recruiters with relevant candidates</li>
          <li>Allow recruiters to review applications and candidate profiles for hiring purposes</li>
          <li>Send account-related and service-related communications (e.g. application status, approval status)</li>
          <li>Understand how our platform is used, so we can improve it (via GA4 analytics)</li>
          <li>Respond to queries submitted through our Contact Us form</li>
        </ul>

        <h3 style={{ marginTop: "1.75rem" }}>4. Consent</h3>
        <p className="card-meta">
          By creating an account or submitting information through our platform, you consent to
          the collection and use of your personal data as described in this policy. Where required
          by the DPDP Act, we will seek your explicit consent before processing your data for a
          specific purpose. You may withdraw consent at any time by contacting us (see Section 9),
          though this may limit or end your ability to use certain features of the platform.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>5. Who we share data with</h3>
        <p className="card-meta">
          Candidate profile information and resumes are shared with recruiters on our platform for
          the purpose of hiring. We do not sell your personal data to third parties. We use the
          following third-party service providers to operate the platform:
        </p>
        <ul className="card-meta">
          <li>Railway — hosts our backend application and database</li>
          <li>Vercel — hosts our frontend website</li>
          <li>Resend — sends transactional emails (e.g. campus drive requests)</li>
          <li>Google Analytics (GA4) — website usage analytics</li>
        </ul>
        <p className="card-meta">
          These providers process data on our behalf and are bound by their own privacy and
          security practices.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>6. Data storage and security</h3>
        <p className="card-meta">
          Your data is stored on servers provided by Railway (database) and accessed through our
          application. We take reasonable technical and organizational measures to protect your
          data against unauthorized access, alteration, or loss. However, no method of transmission
          or storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>7. Data retention</h3>
        <p className="card-meta">
          We retain your personal data for as long as your account remains active, or as long as
          needed to provide our services to you. If you request deletion of your account and data,
          we will remove it within a reasonable timeframe, except where retention is required by law.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>8. Your rights under the DPDP Act</h3>
        <p className="card-meta">As a data principal under the DPDP Act, you have the right to:</p>
        <ul className="card-meta">
          <li>Access the personal data we hold about you</li>
          <li>Correct or update inaccurate or incomplete data</li>
          <li>Request erasure of your personal data</li>
          <li>Withdraw consent for processing at any time</li>
          <li>Nominate another individual to exercise your rights in the event of death or incapacity</li>
          <li>Lodge a grievance regarding how your data has been handled</li>
        </ul>
        <p className="card-meta">
          To exercise any of these rights, contact us using the details in Section 9.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>9. Grievance Officer</h3>
        <p className="card-meta">
          In accordance with the DPDP Act, we have designated a Grievance Officer to address your
          concerns regarding the processing of your personal data.
        </p>
        <p className="card-meta">
          <strong>Grievance Officer</strong><br />
          Coretech Talents<br />
          Hosur, Tamil Nadu, India<br />
          Email: <a href="mailto:coretechtalents@outlook.com">coretechtalents@outlook.com</a>
        </p>
        <p className="card-meta">
          We will acknowledge and respond to your grievance within a reasonable timeframe.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>10. Cookies and tracking</h3>
        <p className="card-meta">
          We use cookies and similar technologies, including Google Analytics, to understand how
          visitors use our site. You can control cookie preferences through our cookie consent
          banner, shown when you first visit the site.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>11. Changes to this policy</h3>
        <p className="card-meta">
          We may update this Privacy Policy from time to time to reflect changes in our practices
          or legal requirements. We will update the "Last updated" date at the top of this page
          when changes are made.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>12. Contact us</h3>
        <p className="card-meta">
          For any questions about this Privacy Policy or how we handle your data, contact us at{" "}
          <a href="mailto:coretechtalents@outlook.com">coretechtalents@outlook.com</a>.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;