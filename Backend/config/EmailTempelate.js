export const verification_template = `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #9370db; /* YouTube Red */
      color: white;
      text-align: center;
      padding: 20px;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content h1 {
      font-size: 20px;
      color: #333333;
    }
    .content p {
      font-size: 16px;
      color: #555555;
      margin: 10px 0;
    }
    .otp-code {
      display: inline-block;
      padding: 10px 20px;
      margin: 20px 0;
      font-size: 28px; 
      font-weight: bold;
      color: #ffffff;
      background-color: #71b7e6;
      border-radius: 5px;
    }
    .footer {
      background-color: #f1f1f1;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #777777;
    }
    .footer a {
      color: #9370db;
      text-decoration: none;
    }
    @media only screen and (max-width: 600px) {
      .content h1 {
        font-size: 18px;
      }
      .otp-code {
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      JobJunction OTP Verification
    </div>zz

    <!-- Content -->
    <div class="content">
      <h1>Hi,</h1>
      <p>To continue, use the following One-Time Password (OTP):</p>
      <div class="otp-code">
        123456
      </div>
      <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>If you didn’t request this code, please <a href="#">report it here</a>.</p>
      <p>© 2024 YouTube, LLC.</p>
    </div>
  </div>
</body>
</html>`
