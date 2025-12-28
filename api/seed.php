<?php

declare(strict_types=1);

require_once __DIR__ . '/db.php';

api_handle_cors();

try {
    $pdo = api_pdo();

    $count = (int)$pdo->query('SELECT COUNT(*) AS c FROM customers')->fetch()['c'];
    if ($count > 0) {
        api_send_json(['ok' => true, 'seeded' => false, 'reason' => 'already_has_data']);
    }

    $now = new DateTimeImmutable('now');
    $end1 = $now->modify('+8 days')->format('Y-m-d');
    $end2 = $now->modify('+25 days')->format('Y-m-d');

    $pdo->beginTransaction();

    $pdo->prepare('INSERT INTO customers (id, name, dob, mobile, email, address, pan, smk) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        ->execute(['CUST-101', 'Sarah Connor', '1984-05-12', '555-0199', 'sarah.c@sky.net', '123 Resistance Way, LA', 'ABCDE1234F', 'Level 5']);

    $ins = $pdo->prepare('INSERT INTO policies (customer_id, policy_uid, type, policy_id, company_name, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $ins->execute(['CUST-101', 'p1', 'Health', 'HLTH-990', 'Cyberdyne Care', '2023-01-01', $end1]);
    $ins->execute(['CUST-101', 'p2', 'Car', 'CAR-442', 'Motor-Shield', '2023-05-01', $end2]);

    $pdo->commit();

    api_send_json(['ok' => true, 'seeded' => true]);
} catch (Throwable $e) {
    api_send_error('Server error', 500, ['detail' => $e->getMessage()]);
}
