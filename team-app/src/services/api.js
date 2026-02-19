export const registerUser = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "error@test.com") {
        reject({ message: "Something went wrong!" });
      } else {
        resolve({ message: "User registered successfully!" });
      }
    }, 1000);
  });
};
