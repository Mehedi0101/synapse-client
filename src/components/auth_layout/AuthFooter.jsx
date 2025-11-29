import Swal from "sweetalert2";

const AuthFooter = () => {

  // ---------- show privacy function ----------
  const showPrivacyPolicy = () => {
    Swal.fire({
      title: `<span class="font-poppins">Privacy Policy</span>`,
      html: `
      <div style="text-align:left; max-height:400px; overflow-y:auto; padding-right:10px;">
        
        <p class="font-open-sans mb-4"><strong>Effective Date:</strong> <span class="text-primary">November 29, 2025</span></p>

        <p class="font-open-sans mb-6">
          Synapse values your privacy and is committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, and share your data when you use our services.
        </p>

        <h3 class="font-poppins text-primary mb-2">1. Information We Collect</h3>
        <ul class="font-open-sans mb-6 ml-5 list-disc space-y-1">
          <li><strong>Personal Information:</strong> Name, email, phone number, profile details.</li>
          <li><strong>Usage Data:</strong> Pages visited, actions performed, time spent.</li>
          <li><strong>Cookies & Tracking:</strong> To improve your experience and show personalized content.</li>
        </ul>

        <h3 class="font-poppins text-primary mb-2">2. How We Use Your Information</h3>
        <ul class="font-open-sans mb-6 ml-5 list-disc space-y-1">
          <li>Provide and improve our services.</li>
          <li>Communicate with you, including notifications and support.</li>
          <li>Analyze usage to enhance your experience.</li>
        </ul>

        <h3 class="font-poppins text-primary mb-2">3. Sharing Your Information</h3>
        <p class="font-open-sans mb-2">We do not sell your personal information. We may share your information with:</p>
        <ul class="font-open-sans mb-6 ml-5 list-disc space-y-1">
          <li>Service providers to help us operate.</li>
          <li>Law enforcement if required by law.</li>
        </ul>

        <h3 class="font-poppins text-primary mb-2">4. Your Choices</h3>
        <ul class="font-open-sans mb-6 ml-5 list-disc space-y-1">
          <li>You can update or delete your profile information anytime.</li>
          <li>You can opt-out of marketing emails.</li>
        </ul>

        <h3 class="font-poppins text-primary mb-2">5. Security</h3>
        <p class="font-open-sans mb-6">We implement reasonable measures to protect your data, but no method is 100% secure.</p>

        <h3 class="font-poppins text-primary mb-2">6. Changes to This Policy</h3>
        <p class="font-open-sans mb-6">We may update this Privacy Policy occasionally. Changes will be posted on this page with the effective date.</p>

        <p class="font-open-sans mb-4">For questions about this Privacy Policy, contact us.</p>

      </div>
    `,
      showCloseButton: true,
      confirmButtonText: "Close",
      confirmButtonColor: '#6f16d7',
      width: 600,
      scrollbarPadding: false,
    });
  };

  // ---------- show terms function ----------
  const showTerms = () => {
    Swal.fire({
      title: `<span class="font-poppins">Terms of Service<span>`,
      html: `
      <div style="text-align:left; max-height:400px; overflow-y:auto; padding-right:10px;">

        <p class="font-open-sans mb-4"><strong>Effective Date:</strong> <span class="text-primary">November 29, 2025</span></p>

        <p class="font-open-sans mb-6">
          By using our services, you agree to these Terms of Service. 
          Please read them carefully as they govern your use of our platform.
        </p>

        <h3 class="font-poppins text-primary mb-2">1. Use of Services</h3>
        <ul class="font-open-sans mb-6 ml-5 list-disc space-y-1">
          <li>You may use our services only for lawful purposes.</li>
          <li>You must comply with all applicable laws and regulations.</li>
          <li>Do not attempt to disrupt or interfere with the services.</li>
        </ul>

        <h3 class="font-poppins text-primary mb-2">2. Account Responsibilities</h3>
        <ul class="font-open-sans mb-6 ml-5 list-disc space-y-1">
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>Any activity under your account is your responsibility.</li>
          <li>Notify us immediately of any unauthorized account use.</li>
        </ul>

        <h3 class="font-poppins text-primary mb-2">3. User Content</h3>
        <ul class="font-open-sans mb-6 ml-5 list-disc space-y-1">
          <li>You retain ownership of your content but grant us a license to display it on our platform.</li>
          <li>Do not upload content that infringes on others' rights.</li>
          <li>We may remove content that violates our policies.</li>
        </ul>

        <h3 class="font-poppins text-primary mb-2">4. Limitation of Liability</h3>
        <p class="font-open-sans mb-6">
          Synapse is not liable for indirect, incidental, or consequential damages arising from the use of our services.
        </p>

        <h3 class="font-poppins text-primary mb-2">5. Termination</h3>
        <p class="font-open-sans mb-6">
          We reserve the right to suspend or terminate accounts that violate these Terms or engage in harmful behavior.
        </p>

        <h3 class="font-poppins text-primary mb-2">6. Changes to Terms</h3>
        <p class="font-open-sans mb-6">
          We may update these Terms occasionally. Changes will be posted on this page with the effective date.
        </p>

        <p class="font-open-sans mb-4">
          For questions regarding these Terms, please contact us.
        </p>

      </div>
    `,
      showCloseButton: true,
      confirmButtonText: "Close",
      confirmButtonColor: '#6f16d7',
      width: 600,
      scrollbarPadding: false,
    });
  };

  // ---------- show contact function ----------
  const showContact = () => {
    Swal.fire({
      title: `<span class="font-poppins">Contact Us</span>`,
      html: `
      <div style="text-align:left; max-height:400px; overflow-y:auto; padding-right:10px;">

        <p class="font-open-sans mb-4">
          If you have any questions, issues, or feedback, feel free to reach out to us.
        </p>

        <h3 class="font-poppins text-primary mb-2">📧 Email Support</h3>
        <p class="font-open-sans mb-6">
          <a href="mailto:mehedih2909@gmail.com" class="">
            mehedih2909@gmail.com
          </a>
        </p>

        <h3 class="font-poppins text-primary mb-2">🐞 Report a Bug</h3>
        <p class="font-open-sans mb-6">
          Found an issue? Please describe it clearly and attach screenshots if possible.
        </p>

        <h3 class="font-poppins text-primary mb-2">📄 Feedback</h3>
        <p class="font-open-sans mb-6">
          We value your suggestions! Help us improve Synapse by sharing your ideas.
        </p>

      </div>
    `,
      showCloseButton: true,
      confirmButtonText: "Close",
      confirmButtonColor: '#6f16d7',
      width: 600,
      scrollbarPadding: false,
    });
  };


  return (
    <footer className="text-center text-gray-400 text-xs sm:text-sm py-4 mt-10">

      {/* ---------- links ---------- */}
      <div className="flex justify-center space-x-4">
        <button to="#" className="hover:text-white cursor-pointer" onClick={showPrivacyPolicy}>
          Privacy Policy
        </button>
        <button className="hover:text-white cursor-pointer" onClick={showTerms}>
          Terms
        </button>
        <button className="hover:text-white cursor-pointer" onClick={showContact}>
          Contact
        </button>
      </div>

      {/* ---------- copyright text ---------- */}
      <p className="mt-2">© 2025 Synapse. All rights reserved.</p>
    </footer>
  );
};

export default AuthFooter;
