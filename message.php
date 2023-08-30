<?php

header("Content-Type: application/json", true);

class Message
{
    public string $name;
    public string $email;
    public ?string $phone;
    public string $message;

    public function __construct(array $formContent)
    {
        $this->name = $formContent["name"];
        $this->email = $formContent["email"];
        $this->phone = !empty($formContent["phone"]) ? $formContent["phone"] : null;
        $this->message = $formContent["message"];
    }
    public function send(string $to): bool
    {
        $subject = "Portfolio Contact Form";
        $addPhone = $this->phone ? "phone : " . $this->phone : "";
        $message = wordwrap($this->message, 70, "\r\n") . "\r\n" . $this->name . "\r\n \r\n" . $addPhone;
        $headers =
            [
                'From' => $this->email,
                'Reply-To' => $this->email,
                'X-Mailer' => 'PHP/' . phpversion(),
                'Content-Type' => 'text/plain; charset=utf-8',
                'Content-Transfer-Encoding' => 'base64'
            ];

        return mail(base64_encode($to), base64_encode($subject), base64_encode($message), $headers);
    }
    public function sendConfirmation($from)
    {
        $to = $this->email;
        $subject = "Mail Confirmation";
        $message = "Your message has been sent.";
        $headers =
            [
                'From' => $from,
                'Reply-To' => $from,
                'X-Mailer' => 'PHP/' . phpversion()
            ];

        mail($to, $subject, $message, $headers);
    }
}

$formContent = json_decode(file_get_contents('php://input'), true);
$mailbox = "salomevauchier@laposte.net";

$message = new Message($formContent);
$messageSent = $message->send($mailbox);

print_r(json_encode((object)["messageSent" => $messageSent]));
