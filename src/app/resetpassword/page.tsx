// app/resetpassword/page.tsx
import ResetPassword from '../components/auth/ResetPassword';
import AuthLayout from '../components/auth/AuthLayout';

export default function ResetPasswordPage() {
    return (<AuthLayout
        title="Passwort zurücksetzen"
        subtitle="Geben Sie ein neues Passwort für Ihr Konto ein"
        footerText="Zurück zur"
        footerLinkText="Anmeldung"
        footerLinkHref="/signin"
    >
        <ResetPassword />
    </AuthLayout >
    );
}