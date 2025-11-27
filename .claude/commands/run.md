---
description: Start the Blinko plugin development server and monitor its status
---

Start the Blinko plugin development server in the background and monitor its health. Follow these steps:

1. **Check for existing processes on port 8080:**
   - Use netstat or similar to find if port 8080 is already in use
   - If found, kill the existing process using taskkill (Windows) or kill (Linux/Mac)
   - Report to the user if you had to kill an existing process

2. **Start the development server:**
   - Run `bun run dev` in the background using the Bash tool with `run_in_background: true`
   - Set a reasonable timeout (e.g., 600000ms = 10 minutes)

3. **Monitor the server startup:**
   - Wait 3-5 seconds for initial startup
   - Use BashOutput to check the server output
   - Look for success indicators:
     - "WebSocket server running at ws://"
     - "Documentation server running at"
     - "built in" (Vite build completion)
   - Look for error indicators:
     - "EADDRINUSE" (port already in use)
     - "error:" or "Error:" messages
     - Exit codes or crashes

4. **Report status to the user:**
   - If successful:
     - Confirm server is running
     - Show the WebSocket URL (e.g., ws://192.168.0.154:8080)
     - Show the documentation URL (e.g., http://localhost:3000)
     - Provide the background shell ID for future monitoring
     - Explain how to connect the plugin to Blinko
   - If failed:
     - Explain what went wrong
     - Show relevant error messages
     - Suggest fixes (e.g., port conflicts, missing dependencies)

5. **Keep monitoring:**
   - Inform the user that the server is running in the background
   - Tell them they can check status anytime by asking you
   - Mention that file changes will trigger hot reloads automatically

**Important:** Always kill the shell if startup fails to prevent zombie processes.
