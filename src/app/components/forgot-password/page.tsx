// app/forgot-password/page.tsx
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import AuthLayout from '../components/auth/AuthLayout';

export default function ForgotPasswordPage() {
    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Enter your email to receive a reset link"
            footerText="Remember your password?"
            footerLinkText="Sign in here"
            footerLinkHref="/signin"
        >
            <ForgotPasswordForm />
        </AuthLayout>
    );
}