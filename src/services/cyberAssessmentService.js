import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export const submitCyberAssessment = async (formData) => {
  if (!formData.companyName?.trim() || !formData.name?.trim() || !formData.email?.trim()) {
    throw new Error("Please complete company name, your name, and email.");
  }

  try {
    const docRef = await addDoc(collection(db, "cyber-assessments"), {
      ...formData,
      timestamp: serverTimestamp(),
      status: "new",
      source: "website_cyber_readiness_assessment",
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting cyber assessment:", error);
    throw new Error("Failed to submit assessment. Please try again.");
  }
};
