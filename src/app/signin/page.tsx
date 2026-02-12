// app/signin/page.tsx
import SignInForm from '../components/auth/SignInForm';
import AuthLayout from '../components/auth/AuthLayout';

export default function SignInPage() {
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your account to continue shopping"
            footerText="Don't have an account?"
            footerLinkText="Sign up here"
            footerLinkHref="/signup"
        >
            <SignInForm />
        </AuthLayout>
    );
}