# Show sender email in contact messages

## Change
- Pass the visitor's email to EmailJS as `from_email` while preserving `reply_to`.
- Keep the current form design and sending behavior unchanged.

## Verification
- Confirm the page builds successfully and the form still submits with the expected EmailJS variables.
