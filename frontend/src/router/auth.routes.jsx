import AuthFormLayout from "../layouts/Auth/AuthFormLayout";
import AuthStatusLayout from "../layouts/Auth/AuthStatusLayout";
import AccountVerification from "../pages/AuthPages/AccountVerificationResultPage";
import ChangePass from "../pages/AuthPages/ChangePasswordPage";
import ForgotPassword from "../pages/AuthPages/ForgotPasswordPage";
import Login from "../pages/AuthPages/LoginPage";
import RegisterUser from "../pages/AuthPages/RegisterPage";
import ResendVerification from "../pages/AuthPages/ResendVerificationEmailPage";
import ResetPassword from "../pages/AuthPages/ResetPasswordPage";
import VerifyEmailPage from "../pages/AuthPages/EmailVerificationNoticePage";

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
          <AuthFormLayout
            title="Reset Password"
            subtitle="Change your password here"
          >
            <ResetPassword />
          </AuthFormLayout>
        ),
      },
      {
        path: "changePass",
        element: (
          <AuthFormLayout
            title="Change Password"
            subtitle="Change your password here"
          >
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
