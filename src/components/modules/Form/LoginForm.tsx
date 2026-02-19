import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function LoginForm() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            placeholder="name@example.com"
          />
          <FieldDescription>
            We&apos;ll send updates to this address.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
          <Input
            id="fieldgroup-password"
            type="password"
            placeholder="••••••••"
          />
        </Field>

        <Field orientation="horizontal" className="justify-between">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Field>
      </FieldGroup>

      {/* Register Section */}
      <div className="text-center text-sm text-gray-600">
        <p>
          If you don’t have an account,{" "}
          <Link
            href="/register"
            className="text-green-600 font-medium hover:underline"
          >
            please register
          </Link>
        </p>
      </div>
    </div>
  );
}
