const functions = require("firebase-functions");
const admin = require("firebase-admin");

// addMarker() will expect the following in data:
// const parseSending = {
//     loc: loc,
//     name: descriptionInput,
//     time: new Date().toUTCString(),
//     category: categorySelection,
//     subtype: subtypeSelection
//   };

const checktypes = data => {
  try {
    if (data.loc.length !== 2) return false;
    if (typeof data.loc[0] !== "number") return false;
    if (typeof data.loc[1] !== "number") return false;
    if (typeof data.name !== "string" || data.name.length === 0) return false;
    if (typeof data.time !== "string" || data.time.length === 0) return false;
    if (typeof data.category !== "string" || data.category.length === 0)
      return false;
    if (typeof data.subtype !== "string" || data.subtype.length === 0)
      return false;
    return true;
  } catch (error) {
    return false;
  }
};

exports.addMarker = functions.https.onCall(async (data, context) => {
  if (checktypes(data) === false) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with currect stuff."
    );
  }

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }

  console.log("[index.js] firebase functions received data", data);

  await admin
    .firestore()
    .collection("markers")
    .doc("Smartone2019")
    .collection(
      `${parseFloat(data.loc[0]).toFixed(1)}
      +${parseFloat(data.loc[1]).toFixed(1)}`
    )
    .add(data);
});
