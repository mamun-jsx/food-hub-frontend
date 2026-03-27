import { cookies } from "next/headers";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = async (userData: any) => {
  try {
    const res = await fetch("url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    const storeCookies = await cookies();
    if (result.success) {
      storeCookies.set("token", result.data.accessToken);
      storeCookies.set("refreshToken", result.data.refreshToken);
    }
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error);
  }
};
export const getUser = async () => {
  const storeToken = await cookies();
  const token = storeToken.get("token")?.value;

  // npm  i jwt-decode
  // then check
  // if (token) {
  // then decoded data = await jwtDecode(token)
  // } else {return null}
  console.log(token);
};
