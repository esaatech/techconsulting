import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export const submitDiscoveryForm = async (formData) => {
  if (!formData.companyName?.trim() || !formData.primaryContact?.trim() || !formData.email?.trim()) {
    throw new Error("Please complete company name, contact name, and email.");
  }

  try {
    const docRef = await addDoc(collection(db, "discoveries"), {
      ...formData,
      timestamp: serverTimestamp(),
      status: "new",
      source: "website_discovery_questionnaire",
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting discovery form:", error);
    throw new Error("Failed to submit discovery form. Please try again.");
  }
};
