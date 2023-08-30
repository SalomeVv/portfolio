<?php
header("Content-Type: application/json", true);

$formContent = json_decode(file_get_contents('php://input'), true);

$mailbox;

class Message
{
    public string $name;
    public string $email;
    public ?string $phone;
    public string $message;

    public function __construct($name, $email, $phone, $message)
    {
        $this->name = $name;
        $this->email = $email;
        $this->phone = !empty($phone) ? $phone : null;
        $this->message = $message;
    }
    public function sendMessage($to)
    {
        $subject = "Portfolio Contact Form";
        $addPhone= $this->phone ? "phone : ".$this->phone : "";
        $message = wordwrap($this->message, 70, "\r\n")."\r\n".$this->name."\r\n \r\n".$addPhone;
        $headers =
            [
                'From' => $this->email,
                'Reply-To' => $this->email,
                'X-Mailer' => 'PHP/' . phpversion()
            ];

        mail($to, $subject, $message, $headers);
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

print_r(file_get_contents('php://input'));
