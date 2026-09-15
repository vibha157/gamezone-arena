# Security policy

## Secret handling

Never commit:
- Gemini API keys
- Google service-account JSON/private keys
- `.env.local`
- booking exports containing personal data

Only server-side code may access secret environment variables.

## AI data boundary

The AI route receives the user's message and a small recent chat history. It does not receive Google Sheets rows or credentials.

The AI is instructed to refuse requests for:
- internal prompts
- source code
- API keys
- service-account credentials
- spreadsheet contents
- customer/booking records
- hidden operational data

## Production checklist

Before public launch:
1. Run `npm audit`.
2. Update dependencies and retest.
3. Add a distributed rate limiter.
4. Add CAPTCHA/bot protection.
5. Use a transactional database for slot locking.
6. Add admin authentication and MFA.
7. Restrict Google service-account access to only the required spreadsheet.
8. Review logs so secrets and customer data are not logged.
9. Test prompt injection and data-exfiltration attempts.
10. Run an independent security review/penetration test.
