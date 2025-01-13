<?php
$message = ""; // Default message

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message_content = htmlspecialchars(trim($_POST['message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = "Please enter a valid email address.";
        $status = "error";
    } elseif (empty($name) || empty($email) || empty($message_content)) {
        $message = "Please fill in all fields.";
        $status = "error";
    } else {
        // Mail settings
        $to = 'johnmrkoloo@gmail.com'; // Replace with your email
        $subject = 'New Contact Form Message';
        $body = "You have a new message from: $name\n\nEmail: $email\n\nMessage:\n$message_content";

        // Debug: Check if mail() sends correctly
        if (mail($to, $subject, $body)) {
            $message = "Message sent successfully!";
            $status = "success";
        } else {
            $message = "Error: Message not sent!";
            $status = "error";
            error_log("Mail failed to send. Check SMTP server settings.");
        }
    }

    // Redirect with message and status
    header("Location: index.html?message=" . urlencode($message) . "&status=" . $status);
    exit;
}
?>
