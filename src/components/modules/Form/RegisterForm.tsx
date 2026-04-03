"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "../../../../service/auth/auth";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("");

    // simple validation
    if (!name || !email || !password) {
      setMessage("All fields are required");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name: name.toUpperCase(),
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setMessage(error.message || "Register failed");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <FieldGroup>
        {/* Name */}
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Jordan Lee"
          />
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
          <FieldDescription>
            We&apos;ll never share your email.
          </FieldDescription>
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </Field>

        {/* Message */}
        {message && <p className="text-red-500 text-sm">{message}</p>}

        {/* Button */}
        <Field orientation="horizontal">
          <Button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Field>
      </FieldGroup>

      {/* Login link */}
      <div className="text-center text-sm text-gray-600">
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
