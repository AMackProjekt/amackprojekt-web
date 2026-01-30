import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Privacy Policy - A MackProjekt",
  description: "Our privacy policy and data protection practices",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />
      
      <section className="mx-auto max-w-4xl px-7 pt-32 pb-20">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy"
          subtitle="Last updated: January 16, 2026"
        />

        <div className="mt-12 space-y-8 text-muted">
          {/* Introduction */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">1. Introduction</h2>
            <p className="leading-relaxed">
              A MackProjekt ("we," "our," or "us") operates mackprojekt.com (the "Site"). 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our Site and use our services.
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-text mb-2">2.1 Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name, email address, and contact information (via forms)</li>
                  <li>Account credentials (email and password) for authenticated services</li>
                  <li>Messages and inquiries submitted through our contact forms</li>
                  <li>Waitlist signup information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-text mb-2">2.2 Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Analytics Data:</strong> We use Google Analytics 4 (GA4) to collect information about your visit, including:
                    <ul className="list-circle pl-6 mt-1">
                      <li>IP address (anonymized)</li>
                      <li>Browser type and version</li>
                      <li>Device information (type, operating system)</li>
                      <li>Pages visited, time spent, and navigation patterns</li>
                      <li>Referral source (how you found our site)</li>
                      <li>Geographic location (country/city level)</li>
                    </ul>
                  </li>
                  <li><strong>Google Tag Manager:</strong> We use GTM to manage tracking tags and pixels</li>
                  <li><strong>Cookies:</strong> Small text files stored on your device (see Section 4)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use collected information for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Service Delivery:</strong> To operate, maintain, and improve our Site and services</li>
              <li><strong>Communication:</strong> To respond to inquiries, send notifications about your account</li>
              <li><strong>Analytics:</strong> To understand user behavior, optimize user experience, and measure campaign effectiveness</li>
              <li><strong>Security:</strong> To detect, prevent, and address technical issues and fraud</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              <li><strong>Marketing:</strong> To send promotional materials (only with your consent)</li>
            </ul>
          </div>

          {/* Cookies and Tracking */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">4. Cookies and Tracking Technologies</h2>
            <div className="space-y-3">
              <p>We use the following types of cookies:</p>
              
              <div className="glass rounded-lg p-4 space-y-2">
                <div>
                  <strong className="text-text">Essential Cookies (Always Active)</strong>
                  <p className="text-sm">Required for site functionality, authentication, and security. Cannot be disabled.</p>
                </div>
              </div>

              <div className="glass rounded-lg p-4 space-y-2">
                <div>
                  <strong className="text-text">Analytics Cookies (Optional)</strong>
                  <p className="text-sm">Google Analytics 4 cookies (_ga, _ga_*, _gid) track site usage and performance. Retention: 2 years.</p>
                </div>
              </div>

              <div className="glass rounded-lg p-4 space-y-2">
                <div>
                  <strong className="text-text">Marketing Cookies (Optional)</strong>
                  <p className="text-sm">Used for targeted advertising and campaign tracking. Managed via Google Tag Manager.</p>
                </div>
              </div>

              <div className="glass rounded-lg p-4 space-y-2">
                <div>
                  <strong className="text-text">Functional Cookies (Optional)</strong>
                  <p className="text-sm">Enable enhanced features like preferences and personalization.</p>
                </div>
              </div>

              <p className="mt-4">
                You can control cookie preferences through our cookie banner or your browser settings.
              </p>
            </div>
          </div>

          {/* Third-Party Data Sharing */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">5. Third-Party Data Sharing</h2>
            <p className="mb-3">We share information with the following third parties:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text">Google LLC:</strong> Analytics data is processed by Google Analytics 4 
                and Google Tag Manager. Google may associate this data with your Google account if you're signed in. 
                See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand2 underline">Google's Privacy Policy</a> and <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand2 underline">opt-out options</a>.
              </li>
              <li>
                <strong className="text-text">Microsoft Azure:</strong> Data is stored and processed on Azure infrastructure 
                (Cosmos DB, Azure Functions, Azure Communication Services) in the United States. Microsoft complies with 
                GDPR and data protection frameworks.
              </li>
              <li>
                <strong className="text-text">Service Providers:</strong> We may share data with trusted vendors who 
                perform services on our behalf (email delivery, hosting, security).
              </li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
            </p>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">6. Data Security</h2>
            <p className="leading-relaxed">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Bcrypt password hashing with salt rounds</li>
              <li>JWT-based authentication with secure token storage</li>
              <li>Rate limiting and DDoS protection</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and logging</li>
            </ul>
            <p className="mt-3">
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">7. Data Retention</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>User Accounts:</strong> Retained until account deletion is requested</li>
              <li><strong>Contact Form Submissions:</strong> Retained for 2 years or until resolution</li>
              <li><strong>Analytics Data:</strong> Google Analytics retains data for 2 months (default setting)</li>
              <li><strong>Session Data:</strong> Expired JWT tokens are retained for 7 days for security audits</li>
            </ul>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">8. Your Privacy Rights</h2>
            <p className="mb-3">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong>Portability:</strong> Request data in a machine-readable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications or disable cookies</li>
              <li><strong>Object:</strong> Object to data processing for direct marketing purposes</li>
              <li><strong>Restrict:</strong> Request restriction of processing in certain circumstances</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at <a href="mailto:privacy@mackprojekt.com" className="text-brand hover:text-brand2 underline">privacy@mackprojekt.com</a> or <a href="mailto:ampstudio@mackprojekt.com" className="text-brand hover:text-brand2 underline">ampstudio@mackprojekt.com</a>.
            </p>
          </div>

          {/* Children's Privacy */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">9. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our Site is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you believe we have collected information 
              from a child, please contact us immediately.
            </p>
          </div>

          {/* Security & Compliance */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">10. Security & Compliance</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-text mb-2">10.1 Data Security</h3>
                <p className="leading-relaxed mb-2">
                  We implement appropriate technical and organizational security measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Encryption of data in transit (HTTPS/TLS 1.3)</li>
                  <li>Encryption of data at rest in Azure Cosmos DB</li>
                  <li>Secure authentication mechanisms (bcrypt password hashing, JWT tokens)</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and role-based permissions</li>
                  <li>Network security groups and firewalls</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-text mb-2">10.2 Industry Compliance</h3>
                <p className="leading-relaxed mb-2">
                  While we are not currently HIPAA or SOC 2 certified, our infrastructure and practices are designed with these standards in mind:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>HIPAA Readiness:</strong> For T.O.O.L.S. Inc. platform serving justice-involved individuals, 
                  we implement controls aligned with HIPAA requirements including data encryption, access logging, and audit trails. 
                  We do not currently handle Protected Health Information (PHI) but are prepared to meet HIPAA compliance when required.</li>
                  <li><strong>SOC 2 Type II Alignment:</strong> Our security controls align with SOC 2 Trust Service Criteria 
                  for security, availability, and confidentiality. We leverage Azure's SOC 2 Type II certified infrastructure.</li>
                  <li><strong>GDPR Compliance:</strong> We adhere to GDPR principles including data minimization, purpose limitation, 
                  and user rights (access, rectification, erasure, portability).</li>
                  <li><strong>CCPA Compliance:</strong> California residents have additional rights under CCPA including the right to 
                  know what personal information is collected, sold, or disclosed.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-text mb-2">10.3 Azure Security Features</h3>
                <p className="leading-relaxed mb-2">
                  Our infrastructure is hosted on Microsoft Azure, leveraging enterprise-grade security:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Azure Cosmos DB with automatic encryption and geo-replication</li>
                  <li>Azure Static Web Apps with DDoS protection</li>
                  <li>Azure Functions with managed identity and Key Vault integration</li>
                  <li>Application Insights for monitoring and threat detection</li>
                  <li>Azure Active Directory for identity management</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-text mb-2">10.4 Third-Party Services</h3>
                <p className="leading-relaxed mb-2">
                  We work with trusted third-party services that maintain their own compliance certifications:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Microsoft Azure:</strong> ISO 27001, SOC 2, HIPAA, FedRAMP certified</li>
                  <li><strong>Mailchimp:</strong> GDPR compliant, SOC 2 Type II certified</li>
                  <li><strong>Google Analytics:</strong> GDPR compliant with data processing agreement</li>
                </ul>
              </div>

              <div className="bg-brand/10 border border-brand/30 rounded-lg p-4">
                <p className="text-sm text-text/90 leading-relaxed">
                  <strong>⚠️ Important Note:</strong> While we implement security best practices and align with industry 
                  standards, no method of transmission over the Internet or electronic storage is 100% secure. We cannot 
                  guarantee absolute security but are committed to protecting your information using industry-standard measures.
                </p>
              </div>
            </div>
          </div>

          {/* International Transfers */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">11. International Data Transfers</h2>
            <p className="leading-relaxed">
              Your information may be transferred to and processed in the United States and other countries 
              where our service providers operate. These countries may have different data protection laws. 
              We ensure appropriate safeguards are in place, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
              <li>Privacy Shield Framework compliance (where applicable)</li>
              <li>Adequacy decisions by regulatory authorities</li>
            </ul>
          </div>

          {/* California Privacy Rights */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">12. California Privacy Rights (CCPA)</h2>
            <p className="mb-3">California residents have additional rights under the CCPA:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Know what personal information is collected, used, and shared</li>
              <li>Delete personal information held by businesses</li>
              <li>Opt-out of sale of personal information (we do not sell data)</li>
              <li>Non-discrimination for exercising CCPA rights</li>
            </ul>
            <p className="mt-3">
              To submit a CCPA request, email <a href="mailto:privacy@mackprojekt.com" className="text-brand hover:text-brand2 underline">privacy@mackprojekt.com</a> with "CCPA Request" in the subject line.
            </p>
          </div>

          {/* GDPR Compliance */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">13. GDPR Compliance (EU Users)</h2>
            <p className="mb-3">If you are in the European Economic Area (EEA), we process your data under the following lawful bases:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Consent:</strong> You have given clear consent for us to process your data (e.g., analytics cookies)</li>
              <li><strong>Contract:</strong> Processing is necessary to fulfill our contract with you (e.g., user accounts)</li>
              <li><strong>Legal Obligation:</strong> Processing is required by law (e.g., tax records)</li>
              <li><strong>Legitimate Interest:</strong> Processing is necessary for our legitimate business interests (e.g., security, fraud prevention)</li>
            </ul>
            <p className="mt-3">
              You have the right to lodge a complaint with your local data protection authority.
            </p>
          </div>

          {/* Do Not Track */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">14. Do Not Track Signals</h2>
            <p className="leading-relaxed">
              Some browsers support "Do Not Track" (DNT) signals. Because there is no industry standard for DNT, 
              our Site does not currently respond to DNT signals. However, you can control tracking through our 
              cookie consent banner.
            </p>
          </div>

          {/* Changes to Privacy Policy */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">15. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with 
              an updated "Last updated" date. We encourage you to review this policy periodically. Continued 
              use of our Site after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">16. Contact Us</h2>
            <p className="leading-relaxed mb-3">
              If you have questions about this Privacy Policy or our data practices, contact us:
            </p>
            <div className="glass rounded-lg p-6 space-y-2">
              <p><strong className="text-text">A MackProjekt</strong></p>
              <p>Email: <a href="mailto:privacy@mackprojekt.com" className="text-brand hover:text-brand2 underline">privacy@mackprojekt.com</a></p>
              <p>General Inquiries: <a href="mailto:ampstudio@mackprojekt.com" className="text-brand hover:text-brand2 underline">ampstudio@mackprojekt.com</a></p>
              <p className="text-sm text-muted mt-3">We will respond to privacy requests within 30 days.</p>
            </div>
          </div>

          {/* Google Analytics Disclosure */}
          <div className="glass rounded-lg p-6 border border-brand/30 mt-8">
            <h3 className="text-lg font-bold text-brand mb-3">⚠️ Google Analytics 4 & Tag Manager Notice</h3>
            <p className="text-sm leading-relaxed mb-3">
              This site uses Google Analytics 4 (Measurement ID: G-D78085990C) and Google Tag Manager (GTM-N2TDDSNS) 
              to collect and analyze website traffic. Google Analytics collects information such as how often users 
              visit this site, what pages they visit, and what other sites they used prior to coming to this site.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              Google uses this data to provide us with reports about traffic and your visit. Google may also use 
              the data collected to contextualize and personalize ads within its own advertising network.
            </p>
            <p className="text-sm leading-relaxed">
              <strong>Learn more:</strong>{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand2 underline">
                How Google uses data
              </a>{" | "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand2 underline">
                Opt-out of Google Analytics
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
