import * as React from "react";

interface ReportEmailTemplateProps {
  productName: string;
  problem: string;
  optionalMessage: string;
}

const ProblemPill: React.FC<{ problem: string }> = ({ problem }) => {
  return (
    <div
      style={{
        display: "inline-block",
        margin: "0 0.25rem",
        padding: "0 0.5rem",
        borderRadius: "2rem",
        color: "#f8f9fa",
        fontSize: "0.875rem",
        lineHeight: 1.25,
        border: "1px solid #343a40",
        backgroundColor: "#212529"
      }}>
      {problem}
    </div>
  );
};

const ReportEmailTemplate: React.FC<Readonly<ReportEmailTemplateProps>> = ({
  productName,
  problem,
  optionalMessage
}) => {
  return (
    <section
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "0.875rem",
        color: "#495057",
        padding: "1.25rem",
        border: "1px solid #dee2e6",
        boxShadow: "1px 1px .75rem rgba(0, 0, 0, 0.15)",
        borderRadius: "0.5rem"
      }}>
      <div style={{ marginBottom: "1.5rem" }}>
        Someone reported
        <span>
          {" "}
          &ldquo;<strong>{productName}</strong>&rdquo;{" "}
        </span>
        for the
        <ProblemPill problem={problem} />
        problem.
      </div>
      {optionalMessage.length > 0 && (
        <div
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#f1f3f5",
            border: "1px solid #e9ecef",
            borderRadius: "0.5rem",
            marginBottom: "1rem"
          }}>
          <h3 style={{ color: "#212529", margin: 0, marginBottom: "0.5rem" }}>
            Message
          </h3>
          <p>{optionalMessage}</p>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          color: "#495057",
          fontFamily: "monospace"
        }}>
        <img
          src="https://evergreens.vercel.app/logo.svg"
          alt="EncryptedList Logo"
          style={{
            width: "1.25rem",
            height: "1.25rem",
            backgroundColor: "transparent"
          }}
        />
        <p>EncryptedList</p>
      </div>
    </section>
  );
};

export default ReportEmailTemplate;
