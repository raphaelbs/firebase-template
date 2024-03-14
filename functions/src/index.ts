import {setGlobalOptions} from "firebase-functions/v2";

// The region is set when creating the storage bucket
setGlobalOptions({region: "<FIX:region>"});

// export const helloWorld = onRequest(async (request, response) => {
//   response.send("Hello from Firebase!");
// });
