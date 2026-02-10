import modal
from typing import Dict, Any

stub = modal.Stub("webhook-stub")

@stub.function()
@modal.web_endpoint()
def webhook(data: Dict[str, Any]):
    return {"message": "Hello from Modal!"}

if __name__ == "__main__":
    stub.serve()
