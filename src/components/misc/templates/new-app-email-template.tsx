import { SubmissionFormData } from "@/lib/types";
import * as React from "react";

const NewAppEmailTemplate: React.FC<Readonly<SubmissionFormData>> = ({
  appName,
  appUrl,
  optionalMessage
}) => {
  return (
    <section
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "0.875rem",
        color: "#495057",
        padding: "1rem"
      }}>
      <div
        style={{
          padding: "1rem",
          border: "1px solid #dee2e6",
          boxShadow: "1px 1px .5rem rgba(0, 0, 0, 0.1)",
          borderRadius: "0.5rem"
        }}>
        <p style={{ marginTop: "0" }}>Someone submitted a new app:</p>
        <div
          style={{
            marginBottom: "1.5rem",
            borderLeft: "3px solid #495057",
            paddingLeft: "0.75rem"
          }}>
          <p>
            App Name: &ldquo;<strong>{appName}</strong>&rdquo;{" "}
          </p>
          <p style={{ marginBottom: "0" }}>
            App URL: &ldquo;<strong>{appUrl}</strong>&rdquo;{" "}
          </p>
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
            src="https://icons.encryptedlist.xyz/logo.svg"
            alt="EncryptedList Logo"
            style={{
              width: "1.25rem",
              height: "1.25rem",
              backgroundColor: "transparent"
            }}
          />
          <p>EncryptedList</p>
        </div>
      </div>
    </section>
  );
};

export default NewAppEmailTemplate;
