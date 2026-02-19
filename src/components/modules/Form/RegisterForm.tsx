import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function RegisterForm() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <FieldGroup>
        {/* Name */}
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" placeholder="Jordan Lee" />
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="name@example.com" />
          <FieldDescription>
            We&apos;ll never share your email.
          </FieldDescription>
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" placeholder="••••••••" />
        </Field>

        {/* Register Button */}
        <Field orientation="horizontal" className="justify-between">
          <Button type="submit" className="w-full">
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
