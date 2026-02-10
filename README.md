# Project Name: itsmejessicajean

This project follows the architecture defined in `CLAUDE.md`.

## Structure

- **directives/**: Markdown Standard Operating Procedures (SOPs).
- **execution/**: Python scripts for deterministic execution.
- **.tmp/**: Temporary files (ignored by git).

## Setup

1.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Configure Environment**:
    Copy `.env.example` to `.env` and fill in your secrets.
    ```bash
    cp .env.example .env
    ```

3.  **Deploy Webhooks**:
    To deploy webhooks using Modal:
    ```bash
    modal deploy execution/modal_webhook.py
    ```

## Workflow

1.  Read a directive in `directives/`.
2.  Execute the corresponding script in `execution/`.
3.  If a script fails, fix it, then update the directive.
