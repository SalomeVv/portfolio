<?php
header("Content-Type: application/json", true);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
require 'vendor/autoload.php';

$formContent = json_decode(file_get_contents('php://input'), true);
// print_r(json_encode($formContent));

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                           
    $mail->Host       = 'smtp.gmail.com';                     
    $mail->SMTPAuth   = true;                                   
    $mail->Username   = '';                     
    $mail->Password   = '';                               
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom($formContent["email"], $formContent["name"]);
    $mail->addAddress('');     
    $mail->addReplyTo($formContent["email"], $formContent["name"]);

    //Content
    $mail->isHTML(true);                       
    $mail->Subject = 'Portfolio Contact';
    $mail->Body    = $formContent["message"]."\r\n tel: ".$formContent["phone"];
    $mail->AltBody = $formContent["message"]."\r\n tel: ".$formContent["phone"];

    $mail->send();
    print_r(json_encode((object)["messageSent" => true]));
} catch (Exception $e) {
    print_r(json_encode((object)["messageSent" => false, "messageError" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]));
}