import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { submitCyberAssessment } from "../services/cyberAssessmentService";

const SCORE_MAP = { Yes: 2, Partial: 1, No: 0 };

const QUESTIONS = [
  {
    id: "mfa",
    category: "Access & Identity",
    label: "Do you require multi-factor authentication (MFA) for email and critical systems?",
  },
  {
    id: "endpoint",
    category: "Access & Identity",
    label: "Are all company devices protected with up-to-date antivirus / endpoint security?",
  },
  {
    id: "emailSecurity",
    category: "Email & Data",
    label: "Do you have email security / anti-phishing filtering beyond the default inbox tools?",
  },
  {
    id: "backups",
    category: "Email & Data",
    label: "Are critical business data backed up regularly and tested for restore?",
  },
  {
    id: "patching",
    category: "Operations",
    label: "Are systems and software patched on a defined schedule?",
  },
  {
    id: "accessControl",
    category: "Operations",
    label: "Do you remove or adjust access promptly when staff leave or change roles?",
  },
  {
    id: "policies",
    category: "Process & People",
    label: "Do you have documented security policies staff are expected to follow?",
  },
  {
    id: "training",
    category: "Process & People",
    label: "Do employees receive regular security awareness training (phishing, passwords, etc.)?",
  },
  {
    id: "incidentPlan",
    category: "Response",
    label: "Do you have a written incident response plan for cyber attacks or data loss?",
  },
  {
    id: "monitoring",
    category: "Response",
    label: "Do you monitor systems for unusual activity or security alerts?",
  },
];

const STEPS = [
  { id: 1, title: "About You" },
  { id: 2, title: "Defenses & Operations" },
  { id: 3, title: "Process & Response" },
  { id: 4, title: "Your Results" },
];

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-400";
const labelClass = "block text-sm text-orange-100 mb-2";

const getScoreLevel = (percent) => {
  if (percent >= 75) {
    return {
      level: "Strong",
      color: "text-green-400",
      summary:
        "You have solid foundations. Focus on closing remaining gaps and testing your response plan regularly.",
    };
  }
  if (percent >= 45) {
    return {
      level: "Moderate",
      color: "text-yellow-300",
      summary:
        "Some protections are in place, but important gaps remain. Prioritize MFA, backups, and incident readiness.",
    };
  }
  return {
    level: "Needs Attention",
    color: "text-orange-400",
    summary:
      "Your environment has meaningful exposure. We recommend a guided readiness review to reduce risk quickly.",
  };
};

function CyberAssessment() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedResult, setSavedResult] = useState(null);

  const score = useMemo(() => {
    const values = QUESTIONS.map((q) => SCORE_MAP[answers[q.id]] ?? null).filter(
      (v) => v !== null
    );
    if (!values.length) return { earned: 0, max: QUESTIONS.length * 2, percent: 0 };
    const earned = values.reduce((sum, v) => sum + v, 0);
    const max = QUESTIONS.length * 2;
    return { earned, max, percent: Math.round((earned / max) * 100) };
  }, [answers]);

  const scoreMeta = getScoreLevel(score.percent);

  const setAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!contact.companyName.trim() || !contact.name.trim() || !contact.email.trim()) {
        setErrorMessage("Please enter company name, your name, and email.");
        return false;
      }
    }
    if (step === 2) {
      const step2Ids = QUESTIONS.slice(0, 6).map((q) => q.id);
      if (step2Ids.some((id) => !answers[id])) {
        setErrorMessage("Please answer all questions on this step.");
        return false;
      }
    }
    if (step === 3) {
      const step3Ids = QUESTIONS.slice(6).map((q) => q.id);
      if (step3Ids.some((id) => !answers[id])) {
        setErrorMessage("Please answer all questions on this step.");
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (step < STEPS.length) nextStep();
  };

  const handleFinalSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    const payload = {
      ...contact,
      answers,
      scorePercent: score.percent,
      scoreLevel: scoreMeta.level,
      scoreEarned: score.earned,
      scoreMax: score.max,
    };

    try {
      await submitCyberAssessment(payload);
      setSavedResult(payload);
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const QuestionBlock = ({ question }) => (
    <div className="rounded-xl border border-white/15 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-wide text-orange-300 mb-2">
        {question.category}
      </p>
      <p className="text-sm md:text-base text-gray-100 mb-4">{question.label}</p>
      <div className="flex flex-wrap gap-2">
        {["Yes", "Partial", "No"].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setAnswer(question.id, option)}
            className={`px-4 py-2 rounded-lg border text-sm transition ${
              answers[question.id] === option
                ? "bg-orange-500/80 border-orange-400 text-white"
                : "bg-white/5 border-white/20 text-gray-200 hover:border-orange-400/50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#020814] text-white pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8 text-center">
          <p className="text-orange-400 text-sm uppercase tracking-wide mb-2">
            Cyber Readiness Assessment
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            How prepared is your organization?
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Answer a short set of questions. We&apos;ll score your readiness and
            highlight where to focus next.
          </p>
        </div>

        <div className="mb-10">
          <div className="flex justify-between gap-2 mb-3">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`flex-1 h-1.5 rounded-full ${
                  s.id <= step ? "bg-orange-500" : "bg-white/15"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400">
            Step {step} of {STEPS.length}: {STEPS[step - 1].title}
          </p>
        </div>

        {submitStatus === "success" && savedResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-semibold mb-2">Assessment saved</h2>
            <p className={`text-3xl font-bold mb-2 ${scoreMeta.color}`}>
              {savedResult.scorePercent}% — {savedResult.scoreLevel}
            </p>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Thanks, {savedResult.name}. Our team will review your results and
              follow up with practical next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/services/cyber-attack-readiness"
                className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-lg font-semibold transition"
              >
                Back to Cyber Attack Readiness
              </Link>
              <Link
                to="/services/managed-it"
                className="border border-white/30 hover:bg-white/10 px-5 py-3 rounded-lg font-semibold transition"
              >
                Explore Managed IT
              </Link>
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={handleFormSubmit}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/40"
          >
            <div className="space-y-5">
              {step === 1 && (
                <>
                  <h2 className="text-xl font-semibold">1. About You</h2>
                  <p className="text-sm text-gray-400 mb-2">
                    We use this to personalize your results and follow up if you want help.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Company name *</label>
                      <input
                        name="companyName"
                        value={contact.companyName}
                        onChange={handleContactChange}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Your name *</label>
                      <input
                        name="name"
                        value={contact.name}
                        onChange={handleContactChange}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={handleContactChange}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone</label>
                      <input
                        name="phone"
                        value={contact.phone}
                        onChange={handleContactChange}
                        className={inputClass}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClass}>Role / title</label>
                      <input
                        name="role"
                        value={contact.role}
                        onChange={handleContactChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl font-semibold">2. Defenses & Operations</h2>
                  <p className="text-sm text-gray-400">
                    Answer Yes, Partial, or No for each item.
                  </p>
                  <div className="space-y-4">
                    {QUESTIONS.slice(0, 6).map((q) => (
                      <QuestionBlock key={q.id} question={q} />
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-xl font-semibold">3. Process & Response</h2>
                  <p className="text-sm text-gray-400">
                    These questions cover people, policy, and incident readiness.
                  </p>
                  <div className="space-y-4">
                    {QUESTIONS.slice(6).map((q) => (
                      <QuestionBlock key={q.id} question={q} />
                    ))}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="text-xl font-semibold">4. Your Results</h2>
                  <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-center mb-4">
                    <p className="text-sm text-gray-400 mb-2">Readiness score</p>
                    <p className={`text-5xl font-bold ${scoreMeta.color}`}>
                      {score.percent}%
                    </p>
                    <p className={`text-xl font-semibold mt-2 ${scoreMeta.color}`}>
                      {scoreMeta.level}
                    </p>
                    <p className="text-gray-300 mt-4 max-w-lg mx-auto">
                      {scoreMeta.summary}
                    </p>
                    <p className="text-xs text-gray-500 mt-3">
                      Score based on {score.earned}/{score.max} points across{" "}
                      {QUESTIONS.length} controls.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-orange-300">Quick snapshot</h3>
                    {QUESTIONS.map((q) => (
                      <div
                        key={q.id}
                        className="flex justify-between gap-3 text-sm border-b border-white/10 py-2"
                      >
                        <span className="text-gray-300">{q.label}</span>
                        <span className="text-white font-medium shrink-0">
                          {answers[q.id] || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {errorMessage && (
              <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
            )}
            {submitStatus === "error" && !errorMessage && (
              <p className="mt-4 text-sm text-red-400">
                Failed to submit. Please try again.
              </p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1 || isSubmitting}
                className="px-5 py-3 rounded-lg border border-white/25 hover:bg-white/10 transition disabled:opacity-40"
              >
                Back
              </button>

              {step < STEPS.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-5 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold transition"
                >
                  {step === 3 ? "See my results" : `Next: ${STEPS[step].title}`}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="px-5 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold transition disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Save & Request Follow-up"}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CyberAssessment;
