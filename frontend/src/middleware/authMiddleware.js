

const authMiddleware = (store) => (next) => (action) => {
  console.log("In Auth middleware");
  const authToken = store.getState().auth.token;
  console.log("auth token", authToken);
};

export default authMiddleware;