<?php
session_start();

// Генерация каптчи, без контроля паралельно открытых страниц

$captcha = substr(md5(time()), 0, 5); // Эмуляция генерации каптчи :)

$_SESSION["captcha"] = $captcha; // Сохраняем каптчу в сессии, для использования в проверках


// Размер изображения каптчи 175х77

header("Content-type: image/png");
$im     = imagecreate(175, 77);
$bgcolor = imagecolorallocate($im, 250, 250, 250);
$textcolor = imagecolorallocate($im, 200, 200, 200);
$px     = (imagesx($im) - 7.5 * strlen($captcha)) / 2;
imagestring($im, 5, $px, 30, $captcha, $textcolor);
imagepng($im);
imagedestroy($im);