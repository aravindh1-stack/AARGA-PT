<?php

declare(strict_types=1);

require_once __DIR__ . '/db.php';

api_handle_cors();

try {
    $pdo = api_pdo();

    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    if ($method === 'GET') {
        $customersStmt = $pdo->query('SELECT id, name, dob, mobile, email, address, pan, smk FROM customers ORDER BY name ASC');
        $customers = $customersStmt->fetchAll();

        $policiesStmt = $pdo->query('SELECT customer_id, policy_uid AS id, type, policy_id AS policyId, company_name AS companyName, start_date AS startDate, end_date AS endDate FROM policies ORDER BY id ASC');
        $policies = $policiesStmt->fetchAll();

        $byCustomer = [];
        foreach ($policies as $p) {
            $cid = $p['customer_id'];
            unset($p['customer_id']);
            if (!isset($byCustomer[$cid])) {
                $byCustomer[$cid] = [];
            }
            $byCustomer[$cid][] = $p;
        }

        foreach ($customers as &$c) {
            $c['policies'] = $byCustomer[$c['id']] ?? [];
        }

        api_send_json(['ok' => true, 'customers' => $customers]);
    }

    if ($method === 'POST') {
        $body = api_read_json_body();
        $customer = $body['customer'] ?? null;

        if (!is_array($customer)) {
            api_send_error('Missing customer object', 400);
        }

        $id = (string)($customer['id'] ?? '');
        if ($id === '') {
            api_send_error('Customer id is required', 400);
        }

        $policies = $customer['policies'] ?? [];
        if (!is_array($policies)) {
            api_send_error('Customer policies must be an array', 400);
        }

        $pdo->beginTransaction();

        $upsert = $pdo->prepare(
            'INSERT INTO customers (id, name, dob, mobile, email, address, pan, smk)
             VALUES (:id, :name, :dob, :mobile, :email, :address, :pan, :smk)
             ON DUPLICATE KEY UPDATE
               name = VALUES(name),
               dob = VALUES(dob),
               mobile = VALUES(mobile),
               email = VALUES(email),
               address = VALUES(address),
               pan = VALUES(pan),
               smk = VALUES(smk)'
        );

        $upsert->execute([
            ':id' => $id,
            ':name' => (string)($customer['name'] ?? ''),
            ':dob' => (string)($customer['dob'] ?? ''),
            ':mobile' => (string)($customer['mobile'] ?? ''),
            ':email' => (string)($customer['email'] ?? ''),
            ':address' => (string)($customer['address'] ?? ''),
            ':pan' => (string)($customer['pan'] ?? ''),
            ':smk' => (string)($customer['smk'] ?? ''),
        ]);

        $pdo->prepare('DELETE FROM policies WHERE customer_id = :id')->execute([':id' => $id]);

        $insertPolicy = $pdo->prepare(
            'INSERT INTO policies (customer_id, policy_uid, type, policy_id, company_name, start_date, end_date)
             VALUES (:customer_id, :policy_uid, :type, :policy_id, :company_name, :start_date, :end_date)'
        );

        foreach ($policies as $p) {
            if (!is_array($p)) {
                continue;
            }
            $insertPolicy->execute([
                ':customer_id' => $id,
                ':policy_uid' => (string)($p['id'] ?? ''),
                ':type' => (string)($p['type'] ?? ''),
                ':policy_id' => (string)($p['policyId'] ?? ''),
                ':company_name' => (string)($p['companyName'] ?? ''),
                ':start_date' => (string)($p['startDate'] ?? ''),
                ':end_date' => (string)($p['endDate'] ?? ''),
            ]);
        }

        $pdo->commit();

        api_send_json(['ok' => true]);
    }

    if ($method === 'DELETE') {
        $id = (string)($_GET['id'] ?? '');
        if ($id === '') {
            api_send_error('Missing id parameter', 400);
        }

        $pdo->beginTransaction();
        $pdo->prepare('DELETE FROM policies WHERE customer_id = :id')->execute([':id' => $id]);
        $pdo->prepare('DELETE FROM customers WHERE id = :id')->execute([':id' => $id]);
        $pdo->commit();

        api_send_json(['ok' => true]);
    }

    api_send_error('Method not allowed', 405);
} catch (Throwable $e) {
    api_send_error('Server error', 500, ['detail' => $e->getMessage()]);
}
