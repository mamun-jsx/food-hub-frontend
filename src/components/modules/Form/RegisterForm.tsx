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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  // signup as create user || register via better auth
  const handleRegister = async () => {
    const { data, error } = await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
      callbackURL: "/",
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <FieldGroup>
        {/* Name */}
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            value={email}
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

        {/* Register Button */}
        <Field orientation="horizontal" className="justify-between">
          <Button
            onClick={handleRegister}
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          >
            Register
          </Button>
        </Field>
      </FieldGroup>

      {/* Login Section */}
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
