<?php
header("Content-Type: application/json", true);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
require 'vendor/autoload.php';

$formContent = json_decode(file_get_contents('php://input'), true);

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'salomevauchier@gmail.com';                     //SMTP username
    $mail->Password   = 'btfjabsutggtwrol';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom($formContent["email"]);
    $mail->addAddress('salomevauchier@gmail.com');     //Add a recipient Name is optional
    // $mail->addReplyTo($formContent["email"], $formContent["name"]);

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Portfolio Contact';
    $mail->Body    = $formContent["message"];
    $mail->AltBody = $formContent["message"];

    $mail->send();
    // echo 'Message has been sent';
    print_r(json_encode((object)["messageSent" => true]));
} catch (Exception $e) {
    // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    print_r(json_encode((object)["messageSent" => false, "messageError" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]));
}

// header("Content-Type: application/json", true);

// class Message
// {
//     public string $name;
//     public string $email;
//     public ?string $phone;
//     public string $message;

//     public function __construct(array $formContent)
//     {
//         $this->name = $formContent["name"];
//         $this->email = $formContent["email"];
//         $this->phone = !empty($formContent["phone"]) ? $formContent["phone"] : null;
//         $this->message = $formContent["message"];
//     }
//     public function send(string $to): bool
//     {
//         $subject = "Portfolio Contact Form";
//         $addPhone = $this->phone ? "phone : " . $this->phone : "";
//         $message = wordwrap($this->message, 70, "\r\n") . "\r\n" . $this->name . "\r\n \r\n" . $addPhone;
//         $headers =
//             [
//                 'From' => $this->email,
//                 'Reply-To' => $this->email,
//                 'X-Mailer' => 'PHP/' . phpversion(),
//                 'Content-Type' => 'text/plain; charset=utf-8',
//                 'Content-Transfer-Encoding' => 'base64'
//             ];

//         return mail(base64_encode($to), base64_encode($subject), base64_encode($message), $headers);
//     }
//     public function sendConfirmation($from)
//     {
//         $to = $this->email;
//         $subject = "Mail Confirmation";
//         $message = "Your message has been sent.";
//         $headers =
//             [
//                 'From' => $from,
//                 'Reply-To' => $from,
//                 'X-Mailer' => 'PHP/' . phpversion()
//             ];

//         mail($to, $subject, $message, $headers);
//     }
// }

// $formContent = json_decode(file_get_contents('php://input'), true);
// $mailbox = "salomevauchier@laposte.net";

// $message = new Message($formContent);
// $messageSent = $message->send($mailbox);

// print_r(json_encode((object)["messageSent" => $messageSent]));
