import AuthFormLayout from "../layouts/AuthLayout";
import AuthStatusLayout from "../layouts/StatusLayout";
import AccountVerification from "../pages/auth/AccountVerification";
import ChangePass from "../pages/auth/changePassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import RegisterUser from "../pages/auth/Register";
import ResendVerification from "../pages/auth/ResendVerification";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmailPage from "../pages/auth/verifyEmailPage";

export const authRoutes = [
  // Auth forms layout
  {
    children: [
      {
        path: "register",
        element: (
          <AuthFormLayout title="Welcome" subtitle="Register your Account here">
            <RegisterUser />
          </AuthFormLayout>
        ),
      },
      {
        path: "login",
        element: (
          <AuthFormLayout title="Welcome" subtitle="Login to your Account here">
            <Login />
          </AuthFormLayout>
        ),
      },
      {
        path: "forgotPass",
        element: (
          <AuthFormLayout
            title="Forgot Password"
            subtitle="Enter your email below so we can send you a reset link"
          >
            <ForgotPassword />
          </AuthFormLayout>
        ),
      },
      {
        path: "resetPass/:token",
        element: (
          <AuthFormLayout title="Reset Password" subtitle="Change your password here">
            <ResetPassword />
          </AuthFormLayout>
        ),
      },
      {
        path: "changePass",
        element: (
          <AuthFormLayout title="Change Password" subtitle="Change your password here">
            <ChangePass />
          </AuthFormLayout>
        ),
      },
      {
        path: "resendVerifyEmail",
        element: (
          <AuthFormLayout
            title="✅ Email Sent!"
            subtitle="Please check your inbox for the verification email."
          >
            <ResendVerification />
          </AuthFormLayout>
        ),
      },
    ],
  },

  // Auth status pages layout
  {
    children: [
      {
        path: "verifyEmail",
        element: (
          <AuthStatusLayout>
            <VerifyEmailPage />
          </AuthStatusLayout>
        ),
      },
      {
        path: "verify/:token",
        element: (
          <AuthStatusLayout>
            <AccountVerification />
          </AuthStatusLayout>
        ),
      },
    ],
  },
];
