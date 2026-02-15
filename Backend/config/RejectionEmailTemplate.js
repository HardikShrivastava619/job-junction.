export const rejection_template = ` 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Application Rejected</title>
  <style>
    /* ...styles unchanged... */
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
JobJunction Application Update
    </div>

    <div class="content">
      <h1>Hello, Dear {{NAME}}</h1>
      <p>
        Thank you for your interest in the opportunity at {{COMPANY}}.
        After careful review, we regret to inform you that your application has not been successful at this time.
      </p>
      <p>
        We appreciate the time and effort you invested in the process, and we genuinely hope to have the chance to work with you in the future.
      </p>
      <div class="highlight-box">
        Wishing You the Best of Luck Ahead!
      </div>
    </div>

    <div class="footer">
      <p>If you believe this email was sent in error, please <a href="#">let us know here</a>.</p>
      <p>© 2024 JobJunction, LLC. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
