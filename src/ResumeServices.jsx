import ResumeBuilder from "./ResumeBuilder";

export default function ResumeServices() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <div className="card" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 className="page-title">Build a resume that gets you shortlisted</h2>
        <p className="card-desc">
          Answer a few quick questions and we'll put together a clean, professional resume you can download instantly.
        </p>
      </div>

      <ResumeBuilder />
    </div>
  );
}