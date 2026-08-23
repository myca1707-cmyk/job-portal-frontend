import { Link } from "react-router-dom";

function TermsOfService() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "3rem", maxWidth: 820 }}>
      <Link to="/" className="btn-link">← Back to home</Link>

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <h1 className="page-title">Terms of Service</h1>
        <p className="hint">Last updated: August 2026</p>

        <p className="card-meta" style={{ marginTop: "1rem" }}>
          These Terms of Service ("Terms") govern your use of the Coretech Talents platform,
          accessible at coretechtalents.com. By creating an account or using our services, you
          agree to these Terms.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>1. Who we are</h3>
        <p className="card-meta">
          Coretech Talents is a recruitment and staffing platform based in Hosur, Tamil Nadu,
          India, connecting candidates with manufacturing, industrial, and corporate employers.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>2. Eligibility</h3>
        <p className="card-meta">
          You must be at least 18 years old to create an account on Coretech Talents. By
          registering, you confirm that the information you provide is accurate and that you
          have the legal capacity to enter into these Terms.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>3. Accounts</h3>
        <p className="card-meta">
          Candidates and recruiters must register for an account to access most features of the
          platform. Recruiter accounts require manual approval by our admin team before login is
          enabled. You are responsible for maintaining the confidentiality of your login
          credentials and for all activity under your account.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>4. Use of the platform</h3>
        <p className="card-meta">Candidates may use the platform to:</p>
        <ul className="card-meta">
          <li>Create and maintain a profile, including uploading a resume</li>
          <li>Browse and apply to job openings posted by recruiters</li>
          <li>Track the status of their applications</li>
        </ul>
        <p className="card-meta">Recruiters may use the platform to:</p>
        <ul className="card-meta">
          <li>Post job openings</li>
          <li>Search and review candidate profiles and resumes</li>
          <li>Manage applicants through a hiring pipeline</li>
          <li>Request campus hiring drive support (Campus Exploration)</li>
        </ul>

        <h3 style={{ marginTop: "1.75rem" }}>5. Acceptable use</h3>
        <p className="card-meta">You agree not to:</p>
        <ul className="card-meta">
          <li>Provide false, misleading, or fraudulent information in your profile, job postings, or applications</li>
          <li>Use the platform to harass, discriminate against, or spam other users</li>
          <li>Attempt to access accounts, data, or systems you are not authorized to access</li>
          <li>Scrape, copy, or redistribute data from the platform without permission</li>
          <li>Use candidate data obtained through the platform for any purpose other than legitimate recruitment</li>
        </ul>

        <h3 style={{ marginTop: "1.75rem" }}>6. Recruiter responsibilities</h3>
        <p className="card-meta">
          Recruiters are responsible for the accuracy of job postings and for handling candidate
          data (including resumes and contact details accessed through the platform) responsibly
          and in compliance with applicable data protection laws, including the DPDP Act, 2023.
          Candidate data accessed through Coretech Talents must only be used for genuine
          recruitment purposes related to job openings on this platform.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>7. Fees</h3>
        <p className="card-meta">
          Coretech Talents is currently free to use for candidates. Any fees applicable to
          recruiter or employer services will be communicated separately before you are charged.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>8. Intellectual property</h3>
        <p className="card-meta">
          All content, branding, design, and code on the Coretech Talents platform, excluding
          content submitted by users (such as resumes and job postings), is the property of
          Coretech Talents and may not be copied or reused without permission.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>9. Termination</h3>
        <p className="card-meta">
          We reserve the right to suspend or terminate accounts that violate these Terms, provide
          false information, or misuse the platform. You may request deletion of your account and
          associated data at any time by contacting us.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>10. Disclaimer</h3>
        <p className="card-meta">
          Coretech Talents facilitates connections between candidates and recruiters but does not
          guarantee employment outcomes, the accuracy of job postings made by recruiters, or the
          suitability of any candidate for any role. We are not a party to any employment
          agreement formed between a candidate and a recruiter or employer.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>11. Limitation of liability</h3>
        <p className="card-meta">
          To the maximum extent permitted by law, Coretech Talents shall not be liable for any
          indirect, incidental, or consequential damages arising from your use of the platform,
          including but not limited to loss of employment opportunities, data, or business.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>12. Changes to these Terms</h3>
        <p className="card-meta">
          We may update these Terms from time to time. Continued use of the platform after changes
          are posted constitutes acceptance of the updated Terms. We will update the "Last updated"
          date at the top of this page when changes are made.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>13. Governing law</h3>
        <p className="card-meta">
          These Terms are governed by the laws of India. Any disputes arising from these Terms or
          your use of the platform shall be subject to the jurisdiction of the courts in Tamil
          Nadu, India.
        </p>

        <h3 style={{ marginTop: "1.75rem" }}>14. Contact us</h3>
        <p className="card-meta">
          For any questions about these Terms, contact us at{" "}
          <a href="mailto:coretechtalents@outlook.com">coretechtalents@outlook.com</a>. See also
          our <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

export default TermsOfService;
