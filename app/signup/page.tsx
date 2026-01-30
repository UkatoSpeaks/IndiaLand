import LoginPage from "../login/page";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
