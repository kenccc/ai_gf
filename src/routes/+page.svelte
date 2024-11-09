<script>
    export let data;
    let msg = "";
    data = data.data;

    // Display the conversation history
    $: conversation = data.conversation || [];
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet">
<div class="chat-container">
    <ul class="chat-messages">
        {#each conversation as message}
            <li class="message {message.role === 'user' ? 'user-message' : 'bot-message'}">
                <div class="message-content">
                    <strong>{message.role === 'user' ? 'You' : 'Gf'}:</strong> {message.text}
                </div>
            </li>
        {/each}
    </ul>

    <form method="POST" action="?/message" class="message-input-form">
        <input type="text" name="user_message" bind:value={msg} class="message-input" placeholder="Type a message...">
        <button type="submit" class="send-button">Send</button>
    </form>

    <div class="footer">
        <p>&copy; 2024 Dvoracek got rizz. All rights reserved.</p>
    </div>
</div>

<style>
    /* General Styles */


.chat-container {
    font-family: "Satisfy", cursive;
    max-width: 500px;
    width: 100%;
    margin: auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.chat-messages {
    list-style: none;
    margin: 0;
    padding: 20px;
    flex-grow: 1;
    overflow-y: auto;
}

.message {
    display: flex;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 20px;
    max-width: 75%;
    word-wrap: break-word;
}

.user-message {
    background-color: #dcf8c6;
    align-self: flex-end;
    text-align: right;
}

.bot-message {
    background-color: #e9e9eb;
    align-self: flex-start;
    text-align: left;
}

.message-content {
    max-width: 80%;
    word-wrap: break-word;
    padding: 10px;
}

.message-input-form {
    display: flex;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #ddd;
    justify-content: space-between;
}

.message-input {
    flex-grow: 1;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ddd;
    font-size: 14px;
    background-color: #f1f1f1;
}

.send-button {
    padding: 10px;
    margin-left: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 16px;
    cursor: pointer;
}

.send-button:hover {
    background-color: #0056b3;
}

/* Mobile Responsive */
@media (max-width: 600px) {
    .chat-container {
        border-radius: 0;
        height: 100%;
    }

    .chat-messages {
        padding: 10px;
    }

    .message {
        max-width: 90%;
    }

    .message-input-form {
        padding: 8px;
    }

    .message-input {
        font-size: 14px;
    }

    .send-button {
        padding: 8px;
        font-size: 14px;
    }
}

</style>