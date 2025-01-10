<?php
$message = ""; // Default message

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message_content = $_POST['message'];

    // Validate inputs
    if (!empty($name) && !empty($email) && !empty($message_content)) {
        // Mail settings
        $to = 'ambetsafrankline@gmail.com'; // Replace with your email
        $subject = 'New Contact Form Message';
        $body = "You have a new message from: $name\n\nEmail: $email\n\nMessage:\n$message_content";

        if (mail($to, $subject, $body)) {
            $message = "Message sent successfully!";
            $status = "success";
        } else {
            $message = "Error: Message not sent!";
            $status = "error";
        }
    } else {
        $message = "Please fill in all fields.";
        $status = "error";
    }

    // Redirect back to index with message and status
    header("Location: index.html?message=" . urlencode($message) . "&status=" . $status);
    exit;
}
?>
