import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-paper">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-green/20 border-t-green" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
