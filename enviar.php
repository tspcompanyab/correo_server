<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$data = json_decode(file_get_contents("php://input"), true);

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'tspcompanyab@gmail.com';
    $mail->Password   = 'ybikbmsibjlnjgf';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    $mail->setFrom('info@tudominio.com', 'Formulario Web');
    $mail->addAddress('tspcompanyab@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = "Nuevo mensaje desde la Web";

    $mail->Body = "
        <b>Nombre:</b> {$data['name']}<br>
        <b>Email:</b> {$data['email']}<br>
        <b>Mensaje:</b><br>{$data['message']}
    ";

    $mail->send();

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $mail->ErrorInfo]);
}
