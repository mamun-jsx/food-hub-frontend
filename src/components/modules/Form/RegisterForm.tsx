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
import { registerUser } from "../../../../service/auth/authService";

import toast from "react-hot-toast";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Creating account...");
    try {
      const result = await registerUser({
        name: name,
        email,
        password,
      });

      if (!result.success) {
        toast.error(result.message || "Register failed", { id: toastId });
      } else {
        toast.success("Registration successful!", { id: toastId });
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <FieldGroup>
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



        <Field orientation="horizontal">
          <Button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="w-full text-white"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Field>
      </FieldGroup>

      <div className="text-center text-sm text-gray-600">
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
