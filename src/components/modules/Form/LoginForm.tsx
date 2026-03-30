"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "../../../../service/auth/auth";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loginCredential = async () => {
    setMessage("");

    // Validation check
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email: email,
        password: password,
        callbackURL: "/",
      });

      if (error) {
        // Better Auth returns error messages directly
        alert(error.message || "Login failed");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };
 
 
  return (
    <div className="max-w-md mx-auto space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="••••••••"
          />
        </Field>

        {/* Display validation or error messages */}
        {message && (
          <p className="text-red-500 text-sm font-medium">{message}</p>
        )}

        <Button
          onClick={loginCredential}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </FieldGroup>
      <div className="text-center text-sm text-gray-600">
        <p>
          do not have an account?{" "}
          <Link
            href="/register"
            className="text-green-600 font-medium hover:underline"
          >
            Please register
          </Link>
        </p>
      </div>
    </div>
  );
}
