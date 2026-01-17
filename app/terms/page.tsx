import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Terms of Service - A MackProjekt",
  description: "Terms and conditions for using our services",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />
      
      <section className="mx-auto max-w-4xl px-7 pt-32 pb-20">
        <SectionHeading
          eyebrow="Legal"
          title="Terms of Service"
          subtitle="Last updated: January 16, 2026"
        />

        <div className="mt-12 space-y-8 text-muted">
          {/* Agreement to Terms */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">1. Agreement to Terms</h2>
            <p className="leading-relaxed">
              By accessing or using mackprojekt.com (the "Site"), you agree to be bound by these Terms of Service 
              ("Terms"). If you disagree with any part of these terms, you may not access the Site.
            </p>
          </div>

          {/* Use License */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">2. Use License</h2>
            <p className="mb-3">Permission is granted to temporarily access the Site for personal, non-commercial use. This is a grant of license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes or public display</li>
              <li>Attempt to reverse engineer any software on the Site</li>
              <li>Remove any copyright or proprietary notations</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </div>

          {/* User Accounts */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">3. User Accounts</h2>
            <div className="space-y-3">
              <p>When you create an account, you agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your password</li>
                <li>Accept all responsibility for activity under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              <p className="mt-3">We reserve the right to terminate accounts that violate these Terms.</p>
            </div>
          </div>

          {/* Prohibited Uses */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">4. Prohibited Uses</h2>
            <p className="mb-3">You may not use the Site for any unlawful purpose or to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon or violate our intellectual property rights or the rights of others</li>
              <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>Submit false or misleading information</li>
              <li>Upload or transmit viruses or any other type of malicious code</li>
              <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>Interfere with or circumvent security features of the Site</li>
              <li>Attempt to gain unauthorized access to any systems or networks</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">5. Intellectual Property</h2>
            <p className="leading-relaxed">
              The Site and its original content, features, and functionality are owned by A MackProjekt and are 
              protected by international copyright, trademark, patent, trade secret, and other intellectual property 
              or proprietary rights laws. Our trademarks may not be used in connection with any product or service 
              without prior written consent.
            </p>
          </div>

          {/* User Content */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">6. User-Generated Content</h2>
            <p className="mb-3">By submitting content to the Site (forms, messages, feedback), you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute such content. You represent that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You own or control all rights to the content</li>
              <li>The content is accurate and not misleading</li>
              <li>The content does not violate these Terms or any law</li>
            </ul>
          </div>

          {/* Third-Party Links */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">7. Third-Party Links</h2>
            <p className="leading-relaxed">
              The Site may contain links to third-party websites or services that are not owned or controlled by 
              A MackProjekt. We have no control over, and assume no responsibility for, the content, privacy policies, 
              or practices of any third-party sites or services.
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">8. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              THE SITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. A MACKPROJEKT MAKES NO WARRANTIES, 
              EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS AND NEGATES ALL OTHER WARRANTIES INCLUDING, WITHOUT 
              LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
              OR NON-INFRINGEMENT OF INTELLECTUAL PROPERTY.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">9. Limitation of Liability</h2>
            <p className="leading-relaxed">
              IN NO EVENT SHALL A MACKPROJEKT OR ITS SUPPLIERS BE LIABLE FOR ANY CONSEQUENTIAL LOSS SUFFERED 
              OR INCURRED BY YOU OR ANY THIRD PARTY ARISING FROM THE USE OR INABILITY TO USE THIS SITE OR THE 
              MATERIALS ON THIS SITE, EVEN IF A MACKPROJEKT HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          </div>

          {/* Indemnification */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">10. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify, defend, and hold harmless A MackProjekt and its officers, directors, employees, 
              contractors, agents, licensors, and suppliers from and against any claims, liabilities, damages, 
              judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising 
              out of or relating to your violation of these Terms or your use of the Site.
            </p>
          </div>

          {/* Termination */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">11. Termination</h2>
            <p className="leading-relaxed">
              We may terminate or suspend your account and access to the Site immediately, without prior notice 
              or liability, for any reason, including breach of these Terms. Upon termination, your right to use 
              the Site will immediately cease.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">12. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United States, 
              without regard to its conflict of law provisions. Any legal action or proceeding arising under 
              these Terms will be brought exclusively in the federal or state courts located in the United States.
            </p>
          </div>

          {/* Changes to Terms */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">13. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. We will 
              provide notice of any material changes by posting the new Terms on this page with an updated date. 
              Your continued use of the Site after any changes constitutes acceptance of the new Terms.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">14. Contact Information</h2>
            <p className="leading-relaxed mb-3">
              If you have questions about these Terms, contact us:
            </p>
            <div className="glass rounded-lg p-6 space-y-2">
              <p><strong className="text-text">A MackProjekt</strong></p>
              <p>Email: <a href="mailto:legal@mackprojekt.com" className="text-brand hover:text-brand2 underline">legal@mackprojekt.com</a></p>
              <p>General Inquiries: <a href="mailto:ampstudio@mackprojekt.com" className="text-brand hover:text-brand2 underline">ampstudio@mackprojekt.com</a></p>
            </div>
          </div>

          {/* Severability */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">15. Severability</h2>
            <p className="leading-relaxed">
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be 
              changed and interpreted to accomplish the objectives of such provision to the greatest extent 
              possible under applicable law and the remaining provisions will continue in full force and effect.
            </p>
          </div>

          {/* Entire Agreement */}
          <div>
            <h2 className="text-xl font-bold text-text mb-3">16. Entire Agreement</h2>
            <p className="leading-relaxed">
              These Terms constitute the entire agreement between us regarding our Site and supersede and replace 
              any prior agreements we might have had regarding the Site.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
