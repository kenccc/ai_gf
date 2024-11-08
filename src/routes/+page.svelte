<script>
    export let data;
    let msg = "";
    data = data.data;

    // Display the conversation history
    $: conversation = data.conversation || [];
</script>

<ul>
    {#each conversation as message}
        <li><strong>{message.role}:</strong> {message.text}</li>
    {/each}
</ul>

<form method="POST" action="?/message">
    <input type="text" name="user_message" bind:value={msg}>
    <button type='submit'>Send</button>
</form>
