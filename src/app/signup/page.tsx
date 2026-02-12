// app/signup/page.tsx
import SignUpForm from '../components/auth/SignUpForm';
import AuthLayout from '../components/auth/AuthLayout';

export default function SignUpPage() {
    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join our community and start shopping"
            footerText="Already have an account?"
            footerLinkText="Sign in here"
            footerLinkHref="/signin"
        >
            <SignUpForm />
        </AuthLayout>
    );
}