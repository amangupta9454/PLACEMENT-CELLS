
// ─── Shared wrapper/layout ─────────────────────────────────────────────────────
const wrapper = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Placement Cell</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1d4ed8 0%,#7c3aed 60%,#0891b2 100%);padding:32px 40px;border-radius:16px 16px 0 0;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;letter-spacing:-0.5px;">
                🎓 Placement Cell
              </h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;font-weight:500;">
                Your Gateway to Top Careers
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
                This email was sent by <strong style="color:#475569;">Placement Cell</strong>.<br/>
                If you did not request this, please ignore this email.<br/>
                &copy; ${new Date().getFullYear()} Placement Cell. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ─── OTP Verification Template ─────────────────────────────────────────────────
export const otpEmailTemplate = (name, otp) => {
  const content = `
    <h2 style="margin:0 0 8px;color:#0f172a;font-size:22px;font-weight:700;">
      Verify Your Email Address
    </h2>
    <p style="margin:0 0 28px;color:#475569;font-size:15px;line-height:1.6;">
      Hi <strong>${name}</strong>, welcome to <strong>Placement Cell</strong>! 
      Use the OTP below to complete your registration. It expires in <strong>10 minutes</strong>.
    </p>

    <!-- OTP Box -->
    <div style="background:linear-gradient(135deg,#eff6ff,#f5f3ff);border:2px solid #bfdbfe;border-radius:12px;padding:32px;text-align:center;margin-bottom:28px;">
      <p style="margin:0 0 8px;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
        Your One-Time Password
      </p>
      <div style="display:inline-block;background:#1d4ed8;border-radius:10px;padding:16px 40px;margin:8px 0;">
        <span style="color:#ffffff;font-size:40px;font-weight:900;letter-spacing:12px;font-family:'Courier New',monospace;">
          ${otp}
        </span>
      </div>
      <p style="margin:12px 0 0;color:#94a3b8;font-size:12px;">
        ⏱ Valid for 10 minutes only
      </p>
    </div>

    <!-- Steps -->
    <div style="background:#f8fafc;border-radius:10px;padding:20px 24px;margin-bottom:28px;border-left:4px solid #3b82f6;">
      <p style="margin:0 0 8px;color:#0f172a;font-size:14px;font-weight:700;">What happens next?</p>
      <ol style="margin:0;padding-left:20px;color:#475569;font-size:14px;line-height:1.8;">
        <li>Enter this OTP on the registration page</li>
        <li>Your account will be activated immediately</li>
        <li>A TPO will verify your profile within 24 hours</li>
        <li>Start exploring and applying to job listings!</li>
      </ol>
    </div>

    <!-- Security Note -->
    <div style="border:1px solid #fde68a;background:#fffbeb;border-radius:8px;padding:14px 18px;">
      <p style="margin:0;color:#92400e;font-size:13px;line-height:1.6;">
        🔒 <strong>Security Tip:</strong> Never share this OTP with anyone. 
        Placement Cell staff will never ask for your OTP.
      </p>
    </div>
  `;
  return wrapper(content);
};

// ─── New Job Alert Template ────────────────────────────────────────────────────
export const jobAlertEmailTemplate = (job, student) => {
  const deadline = new Date(job.deadline).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const branches = Array.isArray(job.eligibility?.branch)
    ? job.eligibility.branch.join(', ')
    : job.eligibility?.branch || 'All Branches';

  const skills = Array.isArray(job.requiredSkills) && job.requiredSkills.length
    ? job.requiredSkills.join(', ')
    : (Array.isArray(job.eligibility?.skills) && job.eligibility.skills.length ? job.eligibility.skills.join(', ') : 'No specific requirements');

  const isExpired = new Date() > new Date(job.deadline);
  const compensation = job.stipend || job.ctc || job.package || 'To be disclosed';

  const content = `
    <!-- Job Banner -->
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#1e1b4b 100%);border-radius:12px;padding:28px;margin-bottom:28px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px 16px;margin-bottom:14px;">
        <span style="color:#93c5fd;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
          🔔 New Placement Drive — ${job.jobType || 'Full-Time'}
        </span>
      </div>
      <h2 style="margin:0 0 6px;color:#ffffff;font-size:26px;font-weight:800;">${job.companyName}</h2>
      <p style="margin:0;color:#a5b4fc;font-size:16px;font-weight:500;">${job.role}</p>
      ${job.workMode ? `<p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">🏢 ${job.workMode}</p>` : ''}
    </div>

    <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
      Hi <strong style="color:#0f172a;">${student.name}</strong>, 
      a new campus placement drive has been posted. Review the details below and apply before the deadline!
    </p>

    <!-- Job Details Grid -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border-collapse:separate;border-spacing:0 8px;">
      ${[
        { icon: '💰', label: compensation.includes('LPA') ? 'CTC' : 'Stipend / Package', value: compensation, color: '#059669' },
        { icon: '📍', label: 'Location', value: job.location, color: '#0284c7' },
        { icon: '📅', label: 'Application Deadline', value: deadline, color: isExpired ? '#dc2626' : '#7c3aed' },
        { icon: '🎓', label: 'Min. CGPA Required', value: `${job.eligibility?.cgpa || 'N/A'} / 10`, color: '#d97706' },
        { icon: '🏫', label: 'Eligible Branches', value: branches, color: '#0f172a' },
        { icon: '⚡', label: 'Required Skills', value: skills, color: '#0f172a' },
        ...(job.openings ? [{ icon: '👥', label: 'Openings', value: `${job.openings} position(s)`, color: '#7c3aed' }] : []),
      ].map(({ icon, label, value, color }) => `
        <tr>
          <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 18px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:36px;vertical-align:middle;"><span style="font-size:20px;">${icon}</span></td>
                <td style="vertical-align:middle;">
                  <p style="margin:0;color:#94a3b8;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${label}</p>
                  <p style="margin:2px 0 0;color:${color};font-size:14px;font-weight:700;">${value}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `).join('')}
    </table>

    <!-- Job Description -->
    <div style="background:#f8fafc;border-radius:10px;padding:20px 24px;margin-bottom:28px;border-left:4px solid #7c3aed;">
      <p style="margin:0 0 8px;color:#0f172a;font-size:14px;font-weight:700;">Job Description</p>
      <p style="margin:0;color:#475569;font-size:14px;line-height:1.7;">${job.description}</p>
    </div>

    <!-- CTA Button -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/student/jobs"
         style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#7c3aed);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:15px;font-weight:700;letter-spacing:0.3px;box-shadow:0 4px 15px rgba(29,78,216,0.35);">
        View &amp; Apply Now →
      </a>
      <p style="margin:12px 0 0;color:#94a3b8;font-size:12px;">
        Log in to your Placement Cell account to apply
      </p>
    </div>

    ${isExpired ? `
    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:14px 18px;">
      <p style="margin:0;color:#991b1b;font-size:13px;font-weight:600;">
        ⚠️ This drive has already closed. Please check the portal for other open listings.
      </p>
    </div>
    ` : `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px 18px;">
      <p style="margin:0;color:#166534;font-size:13px;font-weight:600;">
        ✅ This drive is currently open. Apply before <strong>${deadline}</strong>!
      </p>
    </div>
    `}
  `;

  return wrapper(content);
};

// ─── Application Confirmation Template (sent to student on apply) ──────────────
export const applicationConfirmationTemplate = (student, job) => {
  const content = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:#dcfce7;border-radius:50%;padding:16px;margin-bottom:16px;">
        <span style="font-size:36px;">✅</span>
      </div>
      <h2 style="margin:0 0 8px;color:#15803d;font-size:24px;font-weight:800;">Application Submitted!</h2>
      <p style="margin:0;color:#475569;font-size:15px;">Hi <strong>${student.applicantName || student.name}</strong>, your application has been received.</p>
    </div>

    <div style="background:linear-gradient(135deg,#f8fafc,#f0f9ff);border:1px solid #bfdbfe;border-radius:12px;padding:24px;margin-bottom:28px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
            <span style="color:#64748b;font-size:13px;">Company</span>
            <p style="margin:2px 0 0;color:#0f172a;font-size:15px;font-weight:700;">${job.companyName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
            <span style="color:#64748b;font-size:13px;">Role</span>
            <p style="margin:2px 0 0;color:#1d4ed8;font-size:15px;font-weight:700;">${job.role}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
            <span style="color:#64748b;font-size:13px;">Applied On</span>
            <p style="margin:2px 0 0;color:#0f172a;font-size:14px;">${new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;">
            <span style="color:#64748b;font-size:13px;">Current Status</span>
            <p style="margin:4px 0 0;"><span style="display:inline-block;background:#dbeafe;color:#1d4ed8;border-radius:20px;padding:4px 14px;font-size:13px;font-weight:700;">Applied</span></p>
          </td>
        </tr>
      </table>
    </div>

    <div style="background:#f8fafc;border-left:4px solid #7c3aed;border-radius:8px;padding:16px 20px;margin-bottom:28px;">
      <p style="margin:0 0 6px;color:#0f172a;font-size:14px;font-weight:700;">What Happens Next?</p>
      <ol style="margin:0;padding-left:18px;color:#475569;font-size:13px;line-height:1.9;">
        <li>The TPO will review your application</li>
        <li>If shortlisted, you'll receive an email with further instructions</li>
        <li>Track your application status in your dashboard</li>
      </ol>
    </div>

    <div style="text-align:center;">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/student/applications"
         style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#7c3aed);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:700;box-shadow:0 4px 15px rgba(29,78,216,0.3);">
        Track Your Application →
      </a>
    </div>
  `;
  return wrapper(content);
};

// ─── Application Status Update Template ───────────────────────────────────────
export const applicationEmailTemplate = (name, companyName, role, status) => {
  let statusColor = '#3b82f6';
  let statusBg = '#dbeafe';
  let icon = '📋';
  let title = 'Application Submitted';
  let message = `We have successfully received your detailed application for <strong>${role}</strong> at <strong>${companyName}</strong>.`;

  if (status === 'Shortlisted') {
    statusColor = '#d97706';
    statusBg = '#fef3c7';
    icon = '⭐';
    title = 'You\'ve Been Shortlisted!';
    message = `Congratulations! You have been <strong>shortlisted</strong> for the <strong>${role}</strong> position at <strong>${companyName}</strong>. The placement cell will contact you with further details regarding rounds/interviews.`;
  } else if (status === 'Selected') {
    statusColor = '#16a34a';
    statusBg = '#dcfce7';
    icon = '🎉';
    title = 'Congratulations — You\'re Selected!';
    message = `Amazing news! You have been officially <strong>selected</strong> for the <strong>${role}</strong> role at <strong>${companyName}</strong>. We are incredibly proud of you! The HR team will reach out with your offer details shortly.`;
  } else if (status === 'Rejected') {
    statusColor = '#dc2626';
    statusBg = '#fee2e2';
    icon = '📩';
    title = 'Application Update';
    message = `We regret to inform you that your application for the <strong>${role}</strong> position at <strong>${companyName}</strong> has not been moved forward at this time. Don't be discouraged — keep building your skills and applying!`;
  }

  const content = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:${statusBg};border-radius:50%;padding:16px;margin-bottom:16px;">
        <span style="font-size:36px;">${icon}</span>
      </div>
      <h2 style="margin:0 0 6px;color:${statusColor};font-size:24px;font-weight:800;">${title}</h2>
      <p style="margin:0;color:#475569;font-size:15px;">Hi <strong>${name}</strong></p>
    </div>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid ${statusColor};border-radius:8px;padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0;color:#334155;font-size:15px;line-height:1.7;">${message}</p>
    </div>

    <div style="background:#f8fafc;border-radius:10px;padding:18px 22px;margin-bottom:28px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 0;border-bottom:1px solid #e2e8f0;">
            <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Company</span>
            <p style="margin:2px 0 0;color:#0f172a;font-size:14px;font-weight:700;">${companyName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0;border-bottom:1px solid #e2e8f0;">
            <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Role</span>
            <p style="margin:2px 0 0;color:#1d4ed8;font-size:14px;font-weight:700;">${role}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0;">
            <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Status</span>
            <p style="margin:4px 0 0;"><span style="display:inline-block;background:${statusBg};color:${statusColor};border-radius:20px;padding:4px 14px;font-size:13px;font-weight:700;">${status}</span></p>
          </td>
        </tr>
      </table>
    </div>

    <div style="text-align:center;">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/student/applications"
         style="display:inline-block;background:${statusColor};color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:700;box-shadow:0 4px 15px rgba(0,0,0,0.2);">
        View in Dashboard →
      </a>
    </div>
  `;

  return wrapper(content);
};

// ─── Priority Alert Template ───────────────────────────────────────
export const alertEmailTemplate = (title, message) => {
  const content = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:#fee2e2;border-radius:50%;padding:16px;margin-bottom:16px;">
        <span style="font-size:36px;">🚨</span>
      </div>
      <h2 style="margin:0 0 6px;color:#dc2626;font-size:24px;font-weight:800;">${title}</h2>
    </div>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #dc2626;border-radius:8px;padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0;color:#334155;font-size:15px;line-height:1.7;">${message}</p>
    </div>

    <div style="text-align:center;">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}"
         style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:700;box-shadow:0 4px 15px rgba(220,38,38,0.2);">
        View on Portal →
      </a>
    </div>
  `;
  return wrapper(content);
};