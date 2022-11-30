const admin = require("firebase-admin");

const serviceAccount = require("./src/serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gymOtp.firebaseio.com",
});

const verifyToken = async () => {
  try {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5NmFkY2U5OTk5YmJmNWNkMzBmMjlmNDljZDM3ZjRjNWU2NDI3NDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ3ltb3RwIiwiYXVkIjoiZ3ltb3RwIiwiYXV0aF90aW1lIjoxNjY5NzE4OTMyLCJ1c2VyX2lkIjoiWWdPdXNIZElmcVJCY084NjBsYkl1NWIzYkE5MyIsInN1YiI6IllnT3VzSGRJZnFSQmNPODYwbGJJdTViM2JBOTMiLCJpYXQiOjE2Njk3MTg5MzIsImV4cCI6MTY2OTcyMjUzMiwicGhvbmVfbnVtYmVyIjoiKzk3Nzk4NDk4MzM2NDMiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis5Nzc5ODQ5ODMzNjQzIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.vjNDIFdnoP6DpOIqxq0yGJKCwf7ZddUFg-mjA8OC18t1mVPbXETMTJVYfrm5bWRhioRsHTI5O8en6pQSz6tvK0-qHQQ4eL_1b5SD0q8LJwmAfNGO0pFFMZkmedeHueItES6odMTE7GSdHoUS5zV9y4CwqUCN5z_H45h1zUpy0wttoDvFY-LrwZdAmFTkIQg_ceiPJ7KflADD4QdqIqEwUULx5s7sCOtSNNLAOABk6yBVLHw3MeSqrxpJwsczPRbMFLRwsy88j3_jsdPBnyPTZmrEs62Gi0tdCJHxl0cc3vR60zW2FCmmrXwjdyZs0tdJbvdWENswlOWzKsBAcucyHg"
      );
    console.log(decodedToken);
  } catch (err) {
    console.log(err);
  }
};

verifyToken();
