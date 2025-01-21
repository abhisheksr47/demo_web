<?php

header('Content-Type: application/json');   //Keep this to ensure browser Accepts JSON file as response

require "config.php";

// Get all tasks
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = mysqli_query($conn, "SELECT * FROM tasks ORDER BY id DESC");
    $tasks = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $tasks[] = $row;
    }
    echo json_encode($tasks);
}

// Add new task
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $title = mysqli_real_escape_string($conn, $data['title']);
    $description = mysqli_real_escape_string($conn, $data['description']);
    $status = mysqli_real_escape_string($conn, $data['status']);
    
    mysqli_query($conn, "INSERT INTO tasks (title, description, status) 
                        VALUES ('$title', '$description', '$status')");
    
    echo json_encode(['message' => 'Task added']);
}

// Delete task
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = (int)$_GET['id'];
    mysqli_query($conn, "DELETE FROM tasks WHERE id = $id");
    echo json_encode(['message' => 'Task deleted']);
}

mysqli_close($conn);
