import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { submitDiscoveryForm } from "../services/discoveryService";

const INITIAL_FORM = {
  companyName: "",
  primaryContact: "",
  role: "",
  email: "",
  phone: "",
  industry: "",
  website: "",
  locations: "",
  staffSize: "",
  physicalLocations: "",
  workStyle: "",
  itManagement: "",
  deviceCount: "",
  servers: "",
  platforms: [],
  keyApplications: "",
  challenges: "",
  recentIncidents: "",
  priorities: [],
  antivirus: "",
  mfa: "",
  emailSecurity: "",
  backups: "",
  compliance: "",
  backupDetails: "",
  downtimeTolerance: "",
  disasterRecoveryPlan: "",
  serviceLevel: "",
  goals: "",
  drivingProject: "",
  budget: "",
  timeline: "",
  decisionMakers: "",
  anythingElse: "",
};

const STEPS = [
  { id: 1, title: "Company & Contact" },
  { id: 2, title: "Organization & IT Setup" },
  { id: 3, title: "Challenges & Priorities" },
  { id: 4, title: "Security & Continuity" },
  { id: 5, title: "Goals & Timeline" },
  { id: 6, title: "Review & Submit" },
];

const displayValue = (value) => {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  if (typeof value === "string" && value.trim()) return value.trim();
  return "—";
};

const PLATFORM_OPTIONS = [
  "Microsoft 365",
  "Google Workspace",
  "On-premise email",
  "Azure",
  "Other cloud",
];

const PRIORITY_OPTIONS = [
  "Reliable support",
  "Better security",
  "Cloud migration",
  "Backup & recovery",
  "Cost control",
  "Network / Wi-Fi",
  "Compliance / audit",
  "Scaling / growth",
  "Other",
];

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-400";
const labelClass = "block text-sm text-orange-100 mb-2";
const sectionTitleClass = "text-xl font-semibold text-white mb-1";
const hintClass = "text-sm text-gray-400 mb-6";

function Discovery() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArrayValue = (field, value) => {
    setFormData((prev) => {
      const current = prev[field] || [];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.companyName.trim() || !formData.primaryContact.trim() || !formData.email.trim()) {
        setErrorMessage("Please enter company name, primary contact, and email to continue.");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enter key on earlier steps should advance, not submit
    if (step < STEPS.length) {
      nextStep();
      return;
    }

    if (!validateStep()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      await submitDiscoveryForm(formData);
      setSubmitStatus("success");
      setFormData(INITIAL_FORM);
      setStep(1);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const RadioGroup = ({ name, options, value }) => (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <label
          key={option}
          className={`cursor-pointer px-3 py-2 rounded-lg border text-sm transition ${
            value === option
              ? "bg-orange-500/80 border-orange-400 text-white"
              : "bg-white/5 border-white/20 text-gray-200 hover:border-orange-400/50"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={handleChange}
            className="sr-only"
          />
          {option}
        </label>
      ))}
    </div>
  );

  const CheckboxGroup = ({ field, options }) => (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const selected = formData[field]?.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggleArrayValue(field, option)}
            className={`px-3 py-2 rounded-lg border text-sm transition ${
              selected
                ? "bg-orange-500/80 border-orange-400 text-white"
                : "bg-white/5 border-white/20 text-gray-200 hover:border-orange-400/50"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#020814] text-white pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8 text-center">
          <p className="text-orange-400 text-sm uppercase tracking-wide mb-2">
            IT Discovery Questionnaire
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Help us tailor the right solution
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Complete as much as you can — even partial answers help. Your
            responses are confidential and used only to prepare your proposal.
          </p>
        </div>

        {/* Progress */}
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

        {submitStatus === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-semibold text-secondary mb-3">
              Thank you — discovery received
            </h2>
            <p className="text-gray-300 mb-6">
              We&apos;ll review your answers and prepare a tailored proposal.
              Expect a follow-up from our team shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/services/managed-it"
                className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-lg font-semibold transition"
              >
                Back to Managed IT
              </Link>
              <button
                type="button"
                onClick={() => setSubmitStatus(null)}
                className="border border-white/30 hover:bg-white/10 px-5 py-3 rounded-lg font-semibold transition"
              >
                Submit another
              </button>
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/40"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {step === 1 && (
                  <>
                    <h2 className={sectionTitleClass}>1. Company & Contact</h2>
                    <p className={hintClass}>Required fields are marked with *</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Company name *</label>
                        <input
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Primary contact *</label>
                        <input
                          name="primaryContact"
                          value={formData.primaryContact}
                          onChange={handleChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Role / title</label>
                        <input
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Phone</label>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Industry / sector</label>
                        <input
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Website</label>
                        <input
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Locations / sites</label>
                        <input
                          name="locations"
                          value={formData.locations}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className={sectionTitleClass}>2. Organization & Current IT</h2>
                    <p className={hintClass}>Rough answers are fine.</p>
                    <div>
                      <label className={labelClass}>
                        How many staff / users need IT support?
                      </label>
                      <RadioGroup
                        name="staffSize"
                        value={formData.staffSize}
                        options={["1–10", "11–25", "26–50", "51–100", "100+"]}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        How many physical locations or offices?
                      </label>
                      <input
                        name="physicalLocations"
                        value={formData.physicalLocations}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Do staff work on-site, remotely, or hybrid?
                      </label>
                      <input
                        name="workStyle"
                        value={formData.workStyle}
                        onChange={handleChange}
                        placeholder="e.g. 60% on-site, 40% remote"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        How is your IT currently managed?
                      </label>
                      <input
                        name="itManagement"
                        value={formData.itManagement}
                        onChange={handleChange}
                        placeholder="Internal staff, another provider, ad-hoc, none"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Approx. computers / laptops in use
                      </label>
                      <input
                        name="deviceCount"
                        value={formData.deviceCount}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Do you have servers? How many and what do they do?
                      </label>
                      <textarea
                        name="servers"
                        value={formData.servers}
                        onChange={handleChange}
                        rows={3}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Which platforms do you use?</label>
                      <CheckboxGroup field="platforms" options={PLATFORM_OPTIONS} />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Key business applications your team relies on daily
                      </label>
                      <textarea
                        name="keyApplications"
                        value={formData.keyApplications}
                        onChange={handleChange}
                        rows={3}
                        className={inputClass}
                      />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className={sectionTitleClass}>3. Challenges & Priorities</h2>
                    <p className={hintClass}>Tell us what matters most right now.</p>
                    <div>
                      <label className={labelClass}>
                        Biggest IT challenges or frustrations today
                      </label>
                      <textarea
                        name="challenges"
                        value={formData.challenges}
                        onChange={handleChange}
                        rows={4}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Recent downtime, data loss, or security incidents?
                      </label>
                      <textarea
                        name="recentIncidents"
                        value={formData.recentIncidents}
                        onChange={handleChange}
                        rows={3}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>What matters most? (select all that apply)</label>
                      <CheckboxGroup field="priorities" options={PRIORITY_OPTIONS} />
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2 className={sectionTitleClass}>4. Security & Continuity</h2>
                    <p className={hintClass}>Yes / No / Not sure is fine.</p>
                    <div>
                      <label className={labelClass}>Antivirus / endpoint protection</label>
                      <RadioGroup
                        name="antivirus"
                        value={formData.antivirus}
                        options={["Yes", "No", "Not sure"]}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Multi-factor authentication (MFA)</label>
                      <RadioGroup
                        name="mfa"
                        value={formData.mfa}
                        options={["Yes", "No", "Not sure"]}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email security / spam filtering</label>
                      <RadioGroup
                        name="emailSecurity"
                        value={formData.emailSecurity}
                        options={["Yes", "No", "Not sure"]}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Regular data backups</label>
                      <RadioGroup
                        name="backups"
                        value={formData.backups}
                        options={["Yes", "No", "Not sure"]}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Compliance or regulatory requirements?
                      </label>
                      <input
                        name="compliance"
                        value={formData.compliance}
                        onChange={handleChange}
                        placeholder="e.g. industry standards, audits"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        How is data backed up, and how often?
                      </label>
                      <textarea
                        name="backupDetails"
                        value={formData.backupDetails}
                        onChange={handleChange}
                        rows={3}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        How long could you operate if systems went down?
                      </label>
                      <input
                        name="downtimeTolerance"
                        value={formData.downtimeTolerance}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Do you have a disaster recovery / BCP today?
                      </label>
                      <input
                        name="disasterRecoveryPlan"
                        value={formData.disasterRecoveryPlan}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </>
                )}

                {step === 5 && (
                  <>
                    <h2 className={sectionTitleClass}>5. Goals, Scope & Timeline</h2>
                    <p className={hintClass}>This helps us shape the right proposal.</p>
                    <div>
                      <label className={labelClass}>Level of service you&apos;re looking for</label>
                      <RadioGroup
                        name="serviceLevel"
                        value={formData.serviceLevel}
                        options={[
                          "Fully managed IT",
                          "Co-managed (with our team)",
                          "Specific project only",
                        ]}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Main goals for the next 12 months where IT could help
                      </label>
                      <textarea
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        rows={3}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Specific project driving this? (office move, migration, growth…)
                      </label>
                      <input
                        name="drivingProject"
                        value={formData.drivingProject}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Budget range or expectation</label>
                      <input
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>When are you hoping to get started?</label>
                      <RadioGroup
                        name="timeline"
                        value={formData.timeline}
                        options={[
                          "Immediately",
                          "Within 1 month",
                          "1–3 months",
                          "Just exploring",
                        ]}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Who is involved in the decision, and is there a decision date?
                      </label>
                      <input
                        name="decisionMakers"
                        value={formData.decisionMakers}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Anything else we should know?</label>
                      <textarea
                        name="anythingElse"
                        value={formData.anythingElse}
                        onChange={handleChange}
                        rows={4}
                        className={inputClass}
                      />
                    </div>
                  </>
                )}

                {step === 6 && (
                  <>
                    <h2 className={sectionTitleClass}>6. Review your answers</h2>
                    <p className={hintClass}>
                      Check everything below, then submit. Use Edit to go back and change a section.
                    </p>

                    {[
                      {
                        stepId: 1,
                        title: "Company & Contact",
                        rows: [
                          ["Company name", formData.companyName],
                          ["Primary contact", formData.primaryContact],
                          ["Role / title", formData.role],
                          ["Email", formData.email],
                          ["Phone", formData.phone],
                          ["Industry", formData.industry],
                          ["Website", formData.website],
                          ["Locations", formData.locations],
                        ],
                      },
                      {
                        stepId: 2,
                        title: "Organization & IT Setup",
                        rows: [
                          ["Staff / users", formData.staffSize],
                          ["Physical locations", formData.physicalLocations],
                          ["Work style", formData.workStyle],
                          ["IT management", formData.itManagement],
                          ["Devices", formData.deviceCount],
                          ["Servers", formData.servers],
                          ["Platforms", formData.platforms],
                          ["Key applications", formData.keyApplications],
                        ],
                      },
                      {
                        stepId: 3,
                        title: "Challenges & Priorities",
                        rows: [
                          ["Challenges", formData.challenges],
                          ["Recent incidents", formData.recentIncidents],
                          ["Priorities", formData.priorities],
                        ],
                      },
                      {
                        stepId: 4,
                        title: "Security & Continuity",
                        rows: [
                          ["Antivirus", formData.antivirus],
                          ["MFA", formData.mfa],
                          ["Email security", formData.emailSecurity],
                          ["Regular backups", formData.backups],
                          ["Compliance", formData.compliance],
                          ["Backup details", formData.backupDetails],
                          ["Downtime tolerance", formData.downtimeTolerance],
                          ["Disaster recovery / BCP", formData.disasterRecoveryPlan],
                        ],
                      },
                      {
                        stepId: 5,
                        title: "Goals & Timeline",
                        rows: [
                          ["Service level", formData.serviceLevel],
                          ["Goals", formData.goals],
                          ["Driving project", formData.drivingProject],
                          ["Budget", formData.budget],
                          ["Timeline", formData.timeline],
                          ["Decision makers", formData.decisionMakers],
                          ["Anything else", formData.anythingElse],
                        ],
                      },
                    ].map((section) => (
                      <div
                        key={section.stepId}
                        className="rounded-xl border border-white/15 bg-white/5 p-4 mb-4"
                      >
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <h3 className="font-semibold text-orange-300">{section.title}</h3>
                          <button
                            type="button"
                            onClick={() => setStep(section.stepId)}
                            className="text-sm text-orange-400 hover:text-orange-300 underline"
                          >
                            Edit
                          </button>
                        </div>
                        <dl className="space-y-2">
                          {section.rows.map(([label, value]) => (
                            <div
                              key={label}
                              className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-sm"
                            >
                              <dt className="text-gray-400">{label}</dt>
                              <dd className="sm:col-span-2 text-gray-100 whitespace-pre-wrap">
                                {displayValue(value)}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

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
                  Next: {STEPS[step].title}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold transition disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit Discovery"}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Discovery;
