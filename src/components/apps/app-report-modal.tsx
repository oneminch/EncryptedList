"use client";

import ModalIcon from "../modal/modal-icon";
import React, { useState } from "react";
import AltItemPill from "./app-item-pill";
import { submitAppReport } from "@/lib/data";
import { Icon } from "@iconify/react";

interface ReportAppProps {
  appName: string;
}

const problems = [
  "Incorrect Information",
  "Wrong Tag",
  "Broken Link",
  "Sunsetted",
  "Other"
];

const ReportApp: React.FC<ReportAppProps> = ({ appName }) => {
  // Form State
  const [selectedProblem, setSelectedProblem] = useState<string>("");
  const [optionalMessage, setOptionalMessage] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  // Submission State
  const [submissionResponse, setSubmissionResponse] = useState<string>("");
  const [isSubmissionError, setIsSubmissionError] = useState(false);
  const [isSubmissionPending, setIsSubmissionPending] = useState(false);

  const resetSubmission = () => {
    setSubmissionResponse("");
    setIsSubmissionError(false);
  };

  const handleProblemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetSubmission();
    const newOption = event.target.value;

    if (newOption) {
      setFormError("");
    }

    setSelectedProblem(newOption);
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    resetSubmission();

    setOptionalMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    resetSubmission();

    if (!selectedProblem) {
      setFormError("Please Select an Option");
      return;
    } else {
      setFormError("");
    }

    const reportData = {
      appName,
      problem: selectedProblem,
      optionalMessage
    };

    try {
      setIsSubmissionPending(true);
      const response = await submitAppReport(reportData);
      setSubmissionResponse(response?.message);
    } catch (error: any) {
      setIsSubmissionError(true);
      setSubmissionResponse(error?.message as string);
    } finally {
      setIsSubmissionPending(false);
    }
  };

  return (
    <section className="min-w-xs">
      <ModalIcon icon="ph:flag-banner-duotone" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <fieldset
          className={`px-4 border rounded-md ${
            formError.length > 0
              ? "border-rose-500 dark:border-rose-500"
              : "border-zinc-300 dark:border-zinc-500"
          }`}>
          <legend className="px-2 font-medium text-zinc-600 dark:text-zinc-400">
            <span>What seems to be wrong with</span>
            <span className="font-semibold text-yellow-400">
              {" "}
              &#10077;
              <span className="text-zinc-800 dark:text-zinc-200">
                {appName}
              </span>
              &#10078;
            </span>
            <span>? </span>
            <abbr title="Required" className="text-rose-500">
              *
            </abbr>
          </legend>
          <div className="flex flex-col gap-y-2 pt-2 pb-4 text-sm">
            {problems.map((problem) => (
              <label key={problem} className="cursor-pointer">
                <input
                  type="radio"
                  name="problem"
                  value={problem}
                  className="mr-2"
                  checked={selectedProblem === problem}
                  onChange={handleProblemChange}
                />
                {problem}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="overflow-hidden h-4 mb-2">
          <p
            className={`text-rose-500 text-xs transform duration-100 ${
              formError.length > 0
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-0"
            }`}>
            {formError}
          </p>
        </div>
        <label htmlFor="report-message">
          <p className="font-medium text-zinc-600 dark:text-zinc-400 mb-2 cursor-pointer">
            Message (Optional)
          </p>
          <textarea
            id="report-message"
            placeholder="Provide more details..."
            value={optionalMessage}
            onChange={handleMessageChange}
            className="w-full p-2 resize-y text-base placeholder:text-sm border border-zinc-300 dark:border-zinc-500 rounded-md focus-visible:global-focus"
            rows={4}
          />
        </label>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center overflow-hidden h-6">
            <p
              className={`flex items-center gap-x-1 transform duration-100 ${
                submissionResponse.length > 0
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-0"
              }  ${
                isSubmissionError
                  ? "text-rose-500 dark:text-rose-600"
                  : "text-emerald-500 dark:text-emerald-600"
              }`}>
              <Icon
                icon={
                  isSubmissionError
                    ? "ph:warning-circle-duotone"
                    : "ph:check-circle-duotone"
                }
              />
              {submissionResponse}
            </p>
          </div>
          <button
            type="submit"
            disabled={isSubmissionPending}
            className="action-item w-20! h-8! border-none! px-2 bg-yellow-500 text-zinc-900 hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-400 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500">
            {isSubmissionPending ? (
              <Icon icon="svg-spinners:3-dots-fade" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ReportApp;
