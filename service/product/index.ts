import { cookies } from "next/headers";

export const getAllProduct = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
      cache: "no-store",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error);
  }
};
// ====================================
// "use server"
// export const addProduct = async (payload) => {
//   const storeToken = await cookies();
//   const token = storeToken.get("token")?.value;
//   try {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
//       method: "POST",
//       headers: {
//         authorization: token,
        // "Content-Type": "Application/json",

//       },
//       cache: "no-store",
//     });
//     const result = await res.json();
//     return result;
//   } catch (error) {
//     return Error(error);
//   }
// };
