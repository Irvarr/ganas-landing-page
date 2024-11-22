const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp();

const {getFirestore} = require("firebase-admin/firestore");
const db = getFirestore();

// Initialize CORS middleware
const corsHandler = cors({ origin: true });

exports.submitEmail = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Method Not Allowed" });
    }

    const { email } = req.body;

    if (!email || !validateEmail(email)) {
      return res.status(400).send({ message: "Invalid email address." });
    }

    try {
      const docRef = db.collection("emails").doc();
      await docRef.set({
        email,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(200).send({ message: "Email successfully saved." });
    } catch (error) {
      console.error("Error saving email:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  });
});

// Function to validate email format
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
