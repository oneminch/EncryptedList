"use client";

import { SubmissionFormData } from "@/lib/types";
import { submitNewApp } from "@/lib/data";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

const initialState = {
  appName: "",
  appUrl: "",
  optionalMessage: ""
};

const SubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<SubmissionFormData>(initialState);

  const [validationError, setValidationError] = useState("");

  const [submissionResponse, setSubmissionResponse] = useState("");
  const [pending, setPending] = useState(false);
  const [isSubmissionError, setIsSubmissionError] = useState(false);

  const resetSubmission = () => {
    setValidationError("");
    setSubmissionResponse("");
    setIsSubmissionError(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    resetSubmission();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetSubmission();

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(
      formData
    ) as unknown as SubmissionFormData;

    const { appName, appUrl } = formDataObj;

    if (!appName.trim() || !appUrl.trim()) {
      setValidationError("Please Provide Valid Details");
      return;
    } else {
      setValidationError("");
    }

    setPending(true);
    try {
      const response = await submitNewApp(formData);
      setSubmissionResponse(response?.message);
    } catch (error: any) {
      setIsSubmissionError(true);
      setSubmissionResponse(error?.message as string);
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-y-2 w-1/3 text-sm">
      <div className="flex flex-col gap-y-4">
        <label>
          <p>
            App Name{" "}
            <abbr title="Required" className="text-rose-500">
              *
            </abbr>
          </p>
          <input
            id="app-name"
            type="text"
            name="appName"
            value={formData.appName}
            onChange={handleInputChange}
            className={`w-full py-1 px-2 mt-2 text-sm bg-zinc-50 dark:bg-zinc-800 rounded-md focus-visible:global-focus border ${
              validationError.length > 0
                ? "border-rose-500 dark:border-rose-500"
                : "border-zinc-200 dark:border-zinc-700"
            }`}
          />
        </label>
        <label>
          <p>
            App URL{" "}
            <abbr title="Required" className="text-rose-500">
              *
            </abbr>
          </p>
          <input
            id="app-url"
            type="text"
            name="appUrl"
            value={formData.appUrl}
            onChange={handleInputChange}
            className={`w-full py-1 px-2 mt-2 text-sm bg-zinc-50 dark:bg-zinc-800 rounded-md focus-visible:global-focus border ${
              validationError.length > 0
                ? "border-rose-500 dark:border-rose-500"
                : "border-zinc-200 dark:border-zinc-700"
            }`}
          />
        </label>
      </div>
      <div className="flex items-center overflow-hidden h-4 mb-2">
        <p
          aria-live="polite"
          role="status"
          className={`flex items-center gap-x-1 text-rose-500 text-xs transform duration-100 ${
            validationError.length > 0
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-0"
          }`}>
          <Icon icon="heroicons:exclamation-circle" />
          {validationError}
        </p>
      </div>

      <label htmlFor="optional-message" className="mb-2">
        <p className="font-medium text-zinc-600 dark:text-zinc-400 mb-2 cursor-pointer">
          Message (Optional)
        </p>
        <textarea
          id="optional-message"
          name="optionalMessage"
          placeholder="Provide more details..."
          value={formData.optionalMessage}
          onChange={handleInputChange}
          className="w-full p-2 resize-y text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus-visible:global-focus"
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
                  ? "heroicons:exclamation-circle"
                  : "heroicons:check-circle"
              }
            />
            {submissionResponse}
          </p>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="action-item w-20! h-8! border-none! px-2 bg-yellow-500 text-zinc-900 hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-400 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500">
          {pending ? <Icon icon="svg-spinners:3-dots-fade" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default SubmissionForm;
