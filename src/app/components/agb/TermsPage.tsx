// components/agb/TermsPage.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Scale, Shield, Truck, CreditCard, RefreshCw, AlertCircle } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gradient-to-b from-lime-50 to-amber-50 py-8 md:py-12">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb Navigation */}
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Zurück zum Shop
                        </Link>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-4xl mx-auto">
                        {/* Main Title */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-100 rounded-full mb-4">
                                <FileText className="text-lime-700" size={32} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-lime-900 mb-3">
                                Allgemeine Geschäftsbedingungen
                            </h1>
                            <p className="text-lg text-lime-700">
                                Casa Smecca - Ihre Rechte und Pflichten
                            </p>
                        </div>

                        {/* Content Card */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
                            {/* Decorative Border */}
                            <div className="h-2 bg-gradient-to-r from-lime-600 via-emerald-600 to-amber-600"></div>

                            <div className="p-6 md:p-8 lg:p-12">
                                {/* Quote Banner */}
                                <div className="bg-gradient-to-r from-lime-50 to-emerald-50 border-l-4 border-lime-600 p-6 rounded-r-lg mb-8">
                                    <div className="flex items-start">
                                        <Scale className="text-lime-700 mt-1 mr-4 flex-shrink-0" size={24} />
                                        <div>
                                            <p className="text-lg font-semibold text-lime-900 italic">
                                                &quot;Transparenz und Fairness in jedem Geschäft&quot;
                                            </p>
                                            <p className="text-lime-700 mt-1">- Unser Grundsatz für jede Geschäftsbeziehung</p>
                                        </div>
                                    </div>
                                </div>

                                {/* AGB Content */}
                                <div className="prose prose-lg max-w-none">
                                    <div className="text-gray-700 space-y-8">

                                        {/* Section 1 */}
                                        <section className="border-b border-lime-100 pb-8">
                                            <div className="flex items-start mb-4">
                                                <div className="bg-lime-100 p-2 rounded-lg mr-4">
                                                    <FileText className="text-lime-700" size={20} />
                                                </div>
                                                <h2 className="text-2xl font-bold text-lime-900">AGB (Allgemeine Geschäftsbedingungen)</h2>
                                            </div>

                                            <div className="ml-12 space-y-6">
                                                {/* Geltungsbereich */}
                                                <div>
                                                    <h3 className="text-xl font-semibold text-emerald-800 mb-3 flex items-center">
                                                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                                                        Geltungsbereich und Vertragspartner
                                                    </h3>
                                                    <p className="text-gray-700 leading-relaxed">
                                                        Diese AGB gelten für alle Verträge, die zwischen dem Laden „Casa Smecca“,
                                                        Büchelistrasse 9, 4410 Liestal, Telefon: 078 637 84 10 (Inhaber: Salvo Smecca)
                                                        (im Folgenden: Händler) und dem Kunden abgeschlossen werden.
                                                    </p>
                                                    <p className="text-gray-700 leading-relaxed mt-2">
                                                        Kunde ist der Verbraucher oder Unternehmer im Sinne des Schweizer Rechts.
                                                        Abweichende Regelungen bedürfen der ausdrücklichen schriftlichen Zustimmung des Händlers.
                                                    </p>
                                                </div>

                                                {/* Angebot und Vertragsschluss */}
                                                <div>
                                                    <h3 className="text-xl font-semibold text-emerald-800 mb-3 flex items-center">
                                                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                                                        Angebot und Vertragsschluss
                                                    </h3>
                                                    <div className="space-y-2">
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Alle dargestellten Produkte/Leistungen sind unverbindlich, sofern nicht ausdrücklich als verbindlich gekennzeichnet.
                                                        </p>
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Der Vertrag kommt erst zustande, wenn der Kunde eine Bestellung abgibt und der Händler
                                                            diese durch eine ausdrückliche Auftragsbestätigung oder durch Ausführung der Lieferung annimmt.
                                                        </p>
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Bestell- und Lieferdaten werden dem Kunden in der Regel per E-Mail bestätigt.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Section 2 */}
                                        <section className="border-b border-lime-100 pb-8">
                                            <div className="flex items-start mb-4">
                                                <div className="bg-amber-100 p-2 rounded-lg mr-4">
                                                    <CreditCard className="text-amber-700" size={20} />
                                                </div>
                                                <h2 className="text-2xl font-bold text-lime-900">Preise, Zahlung & Lieferung</h2>
                                            </div>

                                            <div className="ml-12 space-y-6">
                                                {/* Preise und Zahlung */}
                                                <div>
                                                    <h3 className="text-xl font-semibold text-amber-800 mb-3 flex items-center">
                                                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                                                        Preise und Zahlung
                                                    </h3>
                                                    <div className="space-y-2">
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Die angegebenen Preise verstehen sich in CHF, inkl. der gesetzlich geltenden Mehrwertsteuer,
                                                            soweit nicht anders angegeben.
                                                        </p>
                                                        <div className="bg-amber-50 p-4 rounded-lg mt-3">
                                                            <p className="font-semibold text-amber-800 mb-2">Zahlungsarten:</p>
                                                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                                                <li>Barzahlung</li>
                                                                <li>Rechnung</li>
                                                                <li>Kreditkarte</li>
                                                                <li>Andere im Shop angegebene Zahlungsmethoden</li>
                                                            </ul>
                                                        </div>
                                                        <p className="text-gray-700 leading-relaxed mt-3">
                                                            Bei Zahlungsverzug gelten die gesetzlichen Verzugsregelungen. Der Händler behält sich das Recht vor,
                                                            Mahngebühren und Verzugszinsen zu verlangen.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Lieferung */}
                                                <div>
                                                    <h3 className="text-xl font-semibold text-amber-800 mb-3 flex items-center">
                                                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                                                        Lieferung und Leistungsort
                                                    </h3>
                                                    <div className="space-y-2">
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Liefer- oder Leistungsort ist der angegebene Geschäftssitz des Händlers bzw. die vertraglich vereinbarte Anschrift.
                                                        </p>
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Lieferungen erfolgen gemäß den im Angebot oder in der Bestellbestätigung genannten Modalitäten.
                                                            Teillieferungen sind zulässig, sofern sie dem Kunden zumutbar sind.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Section 3 - Widerrufsrecht */}
                                        <section className="border-b border-lime-100 pb-8">
                                            <div className="flex items-start mb-4">
                                                <div className="bg-emerald-100 p-2 rounded-lg mr-4">
                                                    <RefreshCw className="text-emerald-700" size={20} />
                                                </div>
                                                <h2 className="text-2xl font-bold text-lime-900">Widerrufsrecht & Gewährleistung</h2>
                                            </div>

                                            <div className="ml-12 space-y-6">
                                                {/* Widerrufsrecht */}
                                                <div className="bg-emerald-50 p-6 rounded-xl">
                                                    <h3 className="text-xl font-semibold text-emerald-800 mb-3 flex items-center">
                                                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                                                        Widerrufsrecht (für Verbraucher)
                                                    </h3>
                                                    <div className="space-y-3">
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Verbraucher haben grundsätzlich das Recht, binnen 14 Tagen ohne Angabe von Gründen den Vertrag zu widerrufen.
                                                        </p>
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Die Widerrufsfrist beträgt 14 Tage ab dem Tag des Erhalts der Ware bzw. bei Dienstleistungen ab dem Tag des Vertragsschlusses.
                                                        </p>
                                                        <div className="bg-white p-4 rounded-lg border border-emerald-200">
                                                            <p className="font-semibold text-emerald-800 mb-2">So widerrufen Sie:</p>
                                                            <p className="text-gray-700">
                                                                Informieren Sie uns (Casa Smecca, Büchelistrasse 9, 4410 Liestal, Telefon: 078 637 84 10, Inhaber: Salvo Smecca)
                                                                mittels eindeutiger Erklärung über Ihren Entschluss zum Widerruf (z. B. per Brief, E-Mail).
                                                            </p>
                                                        </div>
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Folgen des Widerrufs: Wir erstatten alle Zahlungen, die Sie geleistet haben, einschließlich der Versandkosten
                                                            (sofern teilweise Lieferung). Die Rückzahlung erfolgt unverzüglich und spätestens binnen 14 Tagen ab dem Zeitpunkt,
                                                            an dem die Widerrufserklärung bei uns eingegangen ist.
                                                        </p>
                                                        <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                                                            <p className="font-semibold text-amber-800 mb-2 flex items-center">
                                                                <AlertCircle size={18} className="mr-2" />
                                                                Wichtige Ausnahmen:
                                                            </p>
                                                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                                                <li>Ware, die schnell verderben kann oder deren Verfallsdatum überschritten ist</li>
                                                                <li>Maßgefertigte oder persönlich zugeschnittene Waren</li>
                                                                <li>Digitale Inhalte bei vorheriger Einwilligung</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Gewährleistung */}
                                                <div>
                                                    <h3 className="text-xl font-semibold text-emerald-800 mb-3 flex items-center">
                                                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                                                        Gewährleistung und Mängelrüge
                                                    </h3>
                                                    <div className="space-y-2">
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Es gelten die gesetzlichen Gewährleistungsrechte. Bei Mängeln haben Sie zunächst Anspruch auf Nacherfüllung (Nachbesserung oder Ersatzlieferung).
                                                        </p>
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Schlägt die Nacherfüllung fehl oder ist sie Ihnen unzumutbar, können Sie hinsichtlich der betroffenen Ware
                                                            Minderung der Vergütung (Rabatt), Rücktritt vom Vertrag oder Schadenersatz verlangen.
                                                        </p>
                                                        <div className="bg-lime-50 p-4 rounded-lg mt-3">
                                                            <p className="font-semibold text-lime-800 mb-2">Mängelanzeige:</p>
                                                            <p className="text-gray-700">
                                                                Offensichtliche Mängel sind uns unverzüglich, spätestens jedoch innerhalb von 2 Wochen nach Lieferung,
                                                                schriftlich anzuzeigen; verdeckte Mängel sind ebenfalls unverzüglich nach Entdeckung mitzuteilen.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Section 4 */}
                                        <section className="pb-8">
                                            <div className="flex items-start mb-4">
                                                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                                    <Shield className="text-blue-700" size={20} />
                                                </div>
                                                <h2 className="text-2xl font-bold text-lime-900">Weitere Bestimmungen</h2>
                                            </div>

                                            <div className="ml-12 space-y-6">
                                                {/* Haftung */}
                                                <div>
                                                    <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                                                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                                        Haftung
                                                    </h3>
                                                    <div className="space-y-2">
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Die Haftung des Händlers für vertragliche Pflichtverletzungen sowie aus Delikt ist unbegrenzt in Fällen von Vorsatz oder grober Fahrlässigkeit.
                                                        </p>
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Bei leichter Fahrlässigkeit haftet der Händler nur für vertragstypische, vorhersehbare Schäden, sofern wesentliche Vertragspflichten verletzt wurden.
                                                        </p>
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Die Haftung für Folgeschäden, entgangenen Gewinn oder indirekte Schäden ist ausgeschlossen, soweit gesetzlich zulässig.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Datenschutz */}
                                                <div>
                                                    <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                                                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                                        Datenschutz
                                                    </h3>
                                                    <div className="space-y-2">
                                                        <p className="text-gray-700 leading-relaxed">
                                                            Personenbezogene Daten des Kunden werden vom Händler nur im Rahmen der geltenden Datenschutzgesetze (insb. Datenschutzgesetz Schweiz) verarbeitet.
                                                        </p>
                                                        <div className="bg-blue-50 p-4 rounded-lg mt-3">
                                                            <p className="font-semibold text-blue-800 mb-2">Ihre Rechte:</p>
                                                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                                                <li>Auskunft über gespeicherte Daten</li>
                                                                <li>Berichtigung unrichtiger Daten</li>
                                                                <li>Löschung Ihrer Daten</li>
                                                                <li>Einschränkung der Verarbeitung</li>
                                                                <li>Widerspruch gegen die Verarbeitung</li>
                                                            </ul>
                                                            <p className="text-gray-700 mt-3">
                                                                Kontakt: Casa Smecca, Büchelistrasse 9, 4410 Liestal, Telefon: 078 637 84 10
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Schlussbestimmungen */}
                                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                                                        <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                                                        Schlussbestimmungen
                                                    </h3>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <p className="font-semibold text-gray-800 mb-1">Anwendbares Recht:</p>
                                                            <p className="text-gray-700">Schweizer Recht unter Ausschluss des UN-Kaufrechts (CISG).</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800 mb-1">Gerichtsstand:</p>
                                                            <p className="text-gray-700">
                                                                Sofern der Kunde Kaufmann, juristische Person oder öffentliche Körperschaft ist,
                                                                ist der Gerichtsstand am Sitz des Händlers; alternativ gelten die gesetzlichen Vorgaben.
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800 mb-1">Änderungen der AGB:</p>
                                                            <p className="text-gray-700">
                                                                Änderungen oder Ergänzungen dieser AGB bedürfen der Schriftform; mündliche Nebenabreden bestehen nicht.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Signature */}
                                        <div className="mt-12 pt-8 border-t border-lime-200">
                                            <div className="text-center">
                                                <div className="inline-flex items-center justify-center w-12 h-12 bg-lime-100 rounded-full mb-4">
                                                    <FileText className="text-lime-700" size={24} />
                                                </div>
                                                <p className="text-2xl font-bold text-lime-900 mb-2">Salvo Smecca</p>
                                                <p className="text-lime-700">Gründer & Inhaber</p>
                                                <p className="text-gray-600 text-sm mt-2">Casa Smecca - Import von italienischen Delikatessen</p>
                                                <p className="text-gray-500 text-xs mt-4">
                                                    Stand: {new Date().getFullYear()} | Letzte Aktualisierung: Januar {new Date().getFullYear()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-8 text-center">
                            <Link
                                href="/kontakt"
                                className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors mr-4"
                            >
                                Kontaktieren Sie uns bei Fragen
                            </Link>
                            <Link
                                href="/shop"
                                className="inline-flex items-center bg-white hover:bg-gray-50 text-lime-700 font-semibold py-3 px-8 rounded-lg border border-lime-300 transition-colors"
                            >
                                Zurück zum Shop
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}