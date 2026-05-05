"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { loginUser } from "../../../../service/auth/authService";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginCredential = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Logging in...");
    try {
      const result = await loginUser({
        email: email,
        password: password,
      });

      if (!result.success) {
        toast.error(result.message || "Login failed", { id: toastId });
      } else {
        toast.success("Login successful!", { id: toastId });
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An unexpected error occurred", { id: toastId });
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



        <Button
          onClick={loginCredential}
          disabled={loading}
          className="w-full text-white cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Quick Login Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail("superadmin@gmail.com");
              setPassword("123456789");
            }}
            className="text-xs border-primary text-primary hover:bg-primary/10"
          >
            Admin
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail("almamun@gmail.com");
              setPassword("123456789");
            }}
            className="text-xs border-primary text-primary hover:bg-primary/10"
          >
            User
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail("provider@gmail.com");
              setPassword("123456789");
            }}
            className="text-xs border-primary text-primary hover:bg-primary/10"
          >
            Provider
          </Button>
        </div>
      </FieldGroup>
      <div className="text-center text-sm text-gray-600">
        <p>
          do not have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Please register
          </Link>
        </p>
      </div>
    </div>
  );
}
